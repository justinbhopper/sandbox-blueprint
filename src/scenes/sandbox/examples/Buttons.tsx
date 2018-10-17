import * as React from 'react';

import {
	Button,
	ButtonGroup,
	Intent,
	Label,
	Menu,
	MenuItem,
	Popover,
	Position
} from '@blueprintjs/core';

import Stack from 'common/components/Stack';
import Example from '../components/Example';
import IntentSelect from '../components/IntentSelect';

export interface IButtonsState {
	intent: Intent;
}

export class Buttons extends React.Component<{}, IButtonsState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			intent: Intent.NONE
		}
	}

	public render() {
		const { intent } = this.state;

		const moreOptionsMenu = (
			<Menu>
				<MenuItem text="Refresh" icon="refresh" />
				<MenuItem text="Add Comments" icon="annotation" />
				<MenuItem text="Clear Answers" icon="eraser" />
			</Menu>
		);

		return (
			<>
				<Stack position="middle">
					<Label>Color</Label>
					<IntentSelect intent={intent} onChange={this.handleIntentChange} />
				</Stack>
				<Example position="middle">
					<Label>Menu</Label>
					<Popover content={moreOptionsMenu} position={Position.BOTTOM_LEFT}>
						<Button icon="menu" minimal={true} intent={intent} />
					</Popover>
					<Popover content={moreOptionsMenu} position={Position.BOTTOM_LEFT}>
						<Button icon="menu" intent={intent} />
					</Popover>
				</Example>
				<Example>
					<ButtonGroup minimal={true}>
						<Button text="Add Template" intent={intent} />
						<Button text="Load Results" intent={intent} />
					</ButtonGroup>
				</Example>
				<Example>
					<ButtonGroup minimal={true}>
						<Button text="Add Template" icon="add" intent={intent} />
						<Button text="Load Results" icon="search" intent={intent} />
						<Popover content={moreOptionsMenu} position={Position.BOTTOM}>
							<Button text="More Options" icon="cog" rightIcon="caret-down" intent={intent} />
						</Popover>
					</ButtonGroup>
				</Example>
				<Example>
					<ButtonGroup>
						<Button text="Add Template" icon="add" intent={intent} />
						<Button text="Load Results" icon="search" intent={intent} />
						<Popover content={moreOptionsMenu} position={Position.BOTTOM}>
							<Button text="More Options" icon="cog" rightIcon="caret-down" intent={intent} />
						</Popover>
					</ButtonGroup>
				</Example>
				<Example vertical={false}>
					<Button text="Add Template" minimal={true} icon="add" intent={intent} />
					<Button text="Add Template" icon="add" intent={intent} />
					<Button text="Load Results" icon="search" intent={intent} />
					<Popover content={moreOptionsMenu} position={Position.BOTTOM}>
						<Button text="More Options" icon="cog" rightIcon="caret-down" intent={intent} />
					</Popover>
				</Example>
			</>
		);
	}

	private handleIntentChange = (intent: Intent) => this.setState({ intent });
}

export default Buttons;