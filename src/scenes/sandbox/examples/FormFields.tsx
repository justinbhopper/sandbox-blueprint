import * as React from 'react';

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

	constructor(props: any) {
		super(props);
		this.store = new PeopleStore();

		this.state = {
			disabled: false,
			errored: false,
			searching: false,
		};
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
			? <Spinner small={true} intent={Intent.PRIMARY} />
			: <Button text="Search" intent={this.state.errored ? Intent.DANGER : Intent.PRIMARY} disabled={this.state.disabled} onClick={this.onSearchClick} />
		);

		return (
			<FormGroup intent={intent} disabled={this.state.disabled}>
				<div className="stack">
					<Switch label="Disable All" large={true} checked={this.state.disabled} onClick={this.onDisableAllClick} />
					<Switch label="Invalidate All" large={true} checked={this.state.errored} onClick={this.onErrorAllClick} />
				</div>
				<div className="example stack">
					<InputGroup defaultValue="some value" intent={intent} disabled={this.state.disabled} />
				</div>
				<div className="example stack">
					<FormGroup label="First Name" labelFor="firstName">
						<InputGroup id="firstName" intent={intent} disabled={this.state.disabled} />
					</FormGroup>
					<FormGroup label="Last Name" labelFor="lastName" requiredLabel={true} helperText="Patient's family name.">
						<InputGroup id="lastName" intent={intent} disabled={this.state.disabled} />
					</FormGroup>
				</div>
				<div className="example stack">
					<InputGroup intent={intent} disabled={this.state.disabled} />
					<Button text="Search" intent={this.state.errored ? Intent.DANGER : Intent.PRIMARY} disabled={this.state.disabled} className="pad-left" />
				</div>
				<div className="example stack">
					<FormGroup helperText="Try out the search button.">
						<InputGroup rightElement={searchButton} intent={intent} disabled={this.state.disabled} />
					</FormGroup>
				</div>
				<div className="example stack">
					<FormGroup label="Search" labelFor="search4" helperText={<>Fields can have rounded borders, which helps give<br />focus amongst other fields.</>}>
						<InputGroup id="search4" type="search" leftIcon="search" intent={intent} disabled={this.state.disabled} />
					</FormGroup>
				</div>
				<div className="example stack">
					<FormGroup helperText="Maximum of 4 allowed.  Each name must be unique." intent={this.store.count > 3 ? Intent.DANGER : intent}>
						<div className="stack vertical">
							<div className="stack middle">
								<PeopleSelector intent={intent} disabled={this.state.disabled} peopleStore={this.store} />
								<Tag intent={intent}>{this.store.count} people selected</Tag>
							</div>
							{peopleMessage}
						</div>
					</FormGroup>
				</div>
				<div className="example stack">
					<FormGroup label="Large input">
						<InputGroup large={true} defaultValue="some value" intent={intent} disabled={this.state.disabled} />
					</FormGroup>
				</div>
			</FormGroup>
		);
	}

	private onDisableAllClick = () => {
		this.setState({ disabled: !this.state.disabled });
	}

	private onErrorAllClick = () => {
		this.setState({ errored: !this.state.errored });
	}

	private onSearchClick = () => {
		this.setState({ searching: true });

		setTimeout(this.onSearchComplete, 2000);
	}

	private onSearchComplete = () => {
		this.setState({ searching: false });
	}
}

export default FormFields;