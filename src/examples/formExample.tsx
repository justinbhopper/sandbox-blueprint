import * as React from 'react';

import { observer } from 'mobx-react';
import { Notification } from '../common/notifications'
import { PeopleStore } from './PeopleStore';
import { TagInputExample } from './tagInputExample'

import {
	Button,
	ButtonGroup,
	Callout,
	Card,
	Classes,
	Elevation,
	FormGroup,
	InputGroup,
	Intent,
	Menu,
	MenuItem,
	Popover,
	Position,
	Switch,
	Tag
} from '@blueprintjs/core';

let notificationCount = 0;

@observer
export class FormExample extends React.Component {
	public store: PeopleStore;

	constructor(props: any) {
		super(props);
		this.store = new PeopleStore();
	}

	public render() {
		const moreOptionsMenu = (
			<Menu>
				<MenuItem text="Refresh" icon="refresh" />
				<MenuItem text="Add Comments" icon="annotation" />
				<MenuItem text="Clear Answers" icon="eraser" />
			</Menu>
		);

		const peopleWarning = (
			<Callout intent={Intent.WARNING}>
				Don't add too many people.
			</Callout>	
		);

		const peopleError = (
			<Callout intent={Intent.DANGER}>
				Maximum of 4 people allowed.
			</Callout>	
		);

		return (
			<>
				<div className="app-row">
					<ButtonGroup minimal={true}>
						<Button text="Add Template" icon="add" />
						<Button text="Load Results" icon="search" />
						<Popover content={moreOptionsMenu} position={Position.BOTTOM}>
							<Button text="More Options" icon="cog" rightIcon="caret-down" />
						</Popover>
					</ButtonGroup>
				</div>
				<div className="app-row">
					<Popover content={moreOptionsMenu} position={Position.BOTTOM_LEFT}>
						<Button icon="menu" minimal={true} />
					</Popover>
				</div>
				<Callout icon="info-sign" intent={Intent.PRIMARY} title="Don't forget!">
					Don't forget to check the patient's pulse.
				</Callout>
				<Callout intent={Intent.DANGER}>
					Danger
				</Callout>
				<div className="app-row">
					<ul className={Classes.BREADCRUMBS}>
						<li><a href="#" className={Classes.BREADCRUMB}>Search Templates</a></li>
						<li><span className={Classes.BREADCRUMB_CURRENT}>Enter Details</span></li>
						<li><a href="#" className={Classes.BREADCRUMB +" "+ Classes.DISABLED}>Add Answer Sets</a></li>
					</ul>
					<Callout intent={Intent.NONE}>
						These breadcrumbs suck.
					</Callout>
				</div>
				<FormGroup>
					<div className="app-row">
						<Button icon="notifications" onClick={this.showNotification}>Show Notification</Button>
						<Button icon="refresh" minimal={true}>Click me</Button>
					</div>
					<div className="app-row">
						<InputGroup type="search" leftIcon="search" />
					</div>
					<div className="app-row">
						<Switch label="Is Active" />
					</div>
				</FormGroup>
				<div className="app-row">
					<Card elevation={Elevation.TWO}>
						<FormGroup helperText="Maximum of 4 allowed." intent={this.store.count > 3 ? Intent.DANGER : Intent.NONE}>
							<div className="app-row">
								<TagInputExample large={false} store={this.store} />
								<Tag>{this.store.count} people selected</Tag>
							</div>
							{this.store.count > 2 ? (this.store.count > 3 ? peopleError : peopleWarning) : null}
						</FormGroup>
					</Card>
				</div>
				<div className="app-row">
					<h2><span className="pt-skeleton">Header Here</span></h2>
					<p className="pt-skeleton">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tristique facilisis commodo. Curabitur vel fermentum turpis.
						Donec tempor risus a magna tincidunt, in congue libero bibendum. Sed eget pretium velit. Curabitur et convallis arcu.
						Praesent blandit leo at justo maximus lacinia. Quisque finibus dapibus volutpat. Vestibulum id feugiat turpis, eu convallis diam.
					</p>
					<p className="pt-skeleton">
						Nunc ultrices accumsan enim nec tempor. Curabitur enim dolor, aliquam non quam ac, pretium tincidunt tortor. Proin congue viverra
						gravida. Duis posuere, risus id pretium facilisis, sem augue pharetra ante, nec pulvinar leo nibh nec justo. Curabitur et tempus odio.
						Donec vel tincidunt ante. Nam pharetra vestibulum metus, at vulputate sem sagittis id. Fusce tempus suscipit velit et varius. Sed porta
						gravida blandit. Proin mollis venenatis turpis bibendum condimentum.
					</p>
					<br />
					<p className="pt-skeleton">
						Vestibulum maximus ante ac molestie eleifend. Donec ac sem sit amet sem sagittis porta ut sit amet augue. Praesent vestibulum turpis
						ac iaculis auctor. Vivamus sit amet eleifend lacus. In vehicula felis ac leo tristique hendrerit.
					</p>
					<p className="pt-skeleton">
						Ut vel urna cursus, semper augue id,
						sagittis nisl. Nulla luctus quam quam, nec viverra dolor commodo eget. Fusce eget convallis diam. Nunc commodo, ex id lacinia fringilla,
						tortor augue condimentum mauris, ac aliquet est sem quis ipsum. Nam semper eros vitae augue volutpat, et eleifend sapien pellentesque.
					</p>
				</div>
			</>
		);
	}

	private showNotification = () => {
		Notification.show({ 
			action: {
				text: "Retry"
			},
			icon: "warning-sign",
			intent: notificationCount % 2 === 0 ? Intent.DANGER : Intent.NONE,
			message: (
				<>
					This is notification {notificationCount++}
				</>
			)
		})
	}
}