import {
	Button,
	Callout,
	FormGroup,
	InputGroup,
	Intent,
	Spinner,
	Switch,
	Tag
} from '@blueprintjs/core';
import { observer } from 'mobx-react';
import * as React from 'react';

import Stack from '../../../common/components/Stack';
import { CancelToken, ignoreCancel } from '../../../common/components/CancelToken';
import { delay } from '../../../common/utils/promises'
import Example from '../components/Example';
import { PeopleSelector } from '../components/PeopleSelector'
import { PeopleStore } from '../components/PeopleStore';

interface IFormFieldsState {
	disabled: boolean;
	errored: boolean;
	searching: boolean;
}

@observer
export class FormFields extends React.Component<{}, IFormFieldsState> {
	public store: PeopleStore;
	private cancelSource = CancelToken.source();

	constructor(props: any) {
		super(props);
		this.store = new PeopleStore();

		this.state = {
			disabled: false,
			errored: false,
			searching: false,
		};
	}

	public componentWillUnmount() {
		this.cancelSource.cancel('Unmounting');
	}

	public render() {
		const intent = this.state.errored ? Intent.DANGER : Intent.NONE;
		
		let peopleMessage = <></>;
		if (this.store.count >= 4) {
			peopleMessage = <Callout intent={Intent.DANGER}>Maximum of 4 people allowed.</Callout>;
		} else if (this.store.count >= 3) {
			peopleMessage = <Callout intent={Intent.WARNING}>Don't add too many people.</Callout>;
		}

		const searchButton = (
			this.state.searching 
			? <Spinner size={16} intent={Intent.PRIMARY} />
			: <Button text="Search" intent={this.state.errored ? Intent.DANGER : Intent.PRIMARY} disabled={this.state.disabled} onClick={this.onSearchClick} />
		);
		
		return (
			<FormGroup intent={intent} disabled={this.state.disabled}>
				<Stack>
					<Switch label="Disable All" large={true} checked={this.state.disabled} onChange={this.onDisableAllChange} />
					<Switch label="Invalidate All" large={true} checked={this.state.errored} onChange={this.onErrorAllChange} />
				</Stack>
				<Example>
					<InputGroup defaultValue="some value" intent={intent} disabled={this.state.disabled} />
				</Example>
				<Example>
					<FormGroup label="First Name" labelFor="firstName">
						<InputGroup id="firstName" intent={intent} disabled={this.state.disabled} />
					</FormGroup>
					<FormGroup label="Last Name" labelFor="lastName" labelInfo="(required)" helperText="Patient's family name.">
						<InputGroup id="lastName" intent={intent} disabled={this.state.disabled} />
					</FormGroup>
				</Example>
				<Example>
					<InputGroup intent={intent} disabled={this.state.disabled} />
					<Button text="Search" intent={this.state.errored ? Intent.DANGER : Intent.PRIMARY} disabled={this.state.disabled} className="pad-left" />
				</Example>
				<Example>
					<FormGroup helperText="Try out the search button.">
						<InputGroup rightElement={searchButton} intent={intent} disabled={this.state.disabled} />
					</FormGroup>
				</Example>
				<Example>
					<FormGroup label="Search" labelFor="search4" helperText={<>Fields can have rounded borders, which helps give<br />focus amongst other fields.</>}>
						<InputGroup id="search4" type="search" leftIcon="search" intent={intent} disabled={this.state.disabled} />
					</FormGroup>
				</Example>
				<Example>
					<FormGroup helperText="Maximum of 4 allowed.  Each name must be unique." intent={this.store.count > 3 ? Intent.DANGER : intent}>
						<Stack vertical={true}>
							<Stack position="middle">
								<PeopleSelector intent={intent} disabled={this.state.disabled} peopleStore={this.store} />
								<Tag intent={intent}>{this.store.count} people selected</Tag>
							</Stack>
							{peopleMessage}
						</Stack>
					</FormGroup>
				</Example>
				<Example>
					<FormGroup label="Large input">
						<InputGroup large={true} defaultValue="some value" intent={intent} disabled={this.state.disabled} />
					</FormGroup>
				</Example>
			</FormGroup>
		);
	}

	private onDisableAllChange = (event: React.FormEvent<HTMLInputElement>) => {
		this.setState({ disabled: event.currentTarget.checked });
	}

	private onErrorAllChange = (event: React.FormEvent<HTMLInputElement>) => {
		this.setState({ errored: event.currentTarget.checked });
	}

	@ignoreCancel
	private onSearchClick = async() => {
		this.setState({ searching: true });

		await this.fakeCallAsync(this.cancelSource.token);
	
		this.setState({ searching: false });
	}

	private fakeCallAsync = async(cancelToken: CancelToken) => {
		await delay(1500);
		
		cancelToken.throwIfRequested();
	}
}

export default FormFields;