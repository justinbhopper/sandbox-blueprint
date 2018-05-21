import * as React from 'react';

import { observer } from 'mobx-react';
import { PeopleSelector } from './PeopleSelector'
import { PeopleStore } from './PeopleStore';

import {
	Button,
	Callout,
	FormGroup,
	InputGroup,
	Intent,
	Switch,
	Tag
} from '@blueprintjs/core';

interface IFormFieldsViewState {
	disabled: boolean;
}

@observer
export class FormFieldsView extends React.Component<{}, IFormFieldsViewState> {
	public store: PeopleStore;

	constructor(props: any) {
		super(props);
		this.store = new PeopleStore();

		this.state = {
			disabled: false
		};
	}

	public render() {
		let peopleMessage: JSX.Element = <></>;
		if (this.store.count >= 4) {
			peopleMessage = <Callout intent={Intent.DANGER}>Maximum of 4 people allowed.</Callout>;
		} else if (this.store.count >= 3) {
			peopleMessage = <Callout intent={Intent.WARNING}>Don't add too many people.</Callout>;
		}

		return (
			<>
				<FormGroup disabled={this.state.disabled}>
					<Switch checked={this.state.disabled} onClick={this.onDisableAllClick}>Disable All</Switch>
					<div className="app-row">
						<InputGroup disabled={this.state.disabled} />
					</div>
					<div className="app-row">
						<div>
							<FormGroup label="First Name" labelFor="input2" requiredLabel={true}>
								<InputGroup id="input2" disabled={this.state.disabled} />
							</FormGroup>
						</div>
					</div>
					<div className="app-row">
						<InputGroup disabled={this.state.disabled} />
						<Button text="Search" intent={Intent.PRIMARY} disabled={this.state.disabled} className="pad-left" />
					</div>
					<div className="app-row">
						<InputGroup rightElement={<Button text="Search" intent={Intent.PRIMARY} disabled={this.state.disabled} />} disabled={this.state.disabled} />
					</div>
					<div className="app-row">
						<FormGroup label="Search" labelFor="search4">
							<InputGroup id="search4" type="search" leftIcon="search" disabled={this.state.disabled} />
						</FormGroup>
					</div>
					<div className="app-row">
						<FormGroup helperText="Maximum of 4 allowed.  Each name must be unique." intent={this.store.count > 3 ? Intent.DANGER : Intent.NONE}>
							<div className="app-row">
								<PeopleSelector large={false} store={this.store} />
								<Tag>{this.store.count} people selected</Tag>
								{peopleMessage}
							</div>
						</FormGroup>
					</div>
				</FormGroup>
			</>
		);
	}

	private onDisableAllClick = () => {
		this.setState({ disabled: !this.state.disabled });
	}
}