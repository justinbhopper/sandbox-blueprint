import * as React from 'react';

import {
	Button,
	ButtonGroup,
	Menu,
	MenuItem,
	Popover,
	Position
} from '@blueprintjs/core';

export class ButtonsView extends React.Component {
	public render() {
		const moreOptionsMenu = (
			<Menu>
				<MenuItem text="Refresh" icon="refresh" />
				<MenuItem text="Add Comments" icon="annotation" />
				<MenuItem text="Clear Answers" icon="eraser" />
			</Menu>
		);

		return (
			<>
				<div className="app-row">
					Menu: 
					<Popover content={moreOptionsMenu} position={Position.BOTTOM_LEFT}>
						<Button icon="menu" minimal={true} />
					</Popover>
				</div>
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
					<ButtonGroup>
						<Button text="Add Template" icon="add" />
						<Button text="Load Results" icon="search" />
						<Popover content={moreOptionsMenu} position={Position.BOTTOM}>
							<Button text="More Options" icon="cog" rightIcon="caret-down" />
						</Popover>
					</ButtonGroup>
				</div>
				<div className="app-row">
					<Button text="Add Template" icon="add" />
					<Button text="Load Results" icon="search" className="pad-left" />
					<Popover content={moreOptionsMenu} position={Position.BOTTOM}>
						<Button text="More Options" icon="cog" rightIcon="caret-down" className="pad-left" />
					</Popover>
				</div>
			</>
		);
	}
}