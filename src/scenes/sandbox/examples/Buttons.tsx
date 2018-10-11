import * as React from 'react';

import {
	Button,
	ButtonGroup,
	Label,
	Menu,
	MenuItem,
	Popover,
	Position
} from '@blueprintjs/core';

import Example from '../components/Example';

export default function Buttons() {
	const moreOptionsMenu = (
		<Menu>
			<MenuItem text="Refresh" icon="refresh" />
			<MenuItem text="Add Comments" icon="annotation" />
			<MenuItem text="Clear Answers" icon="eraser" />
		</Menu>
	);

	return (
		<>
			<Example position="middle">
				<Label>Menu</Label>
				<Popover content={moreOptionsMenu} position={Position.BOTTOM_LEFT}>
					<Button icon="menu" minimal={true} />
				</Popover>
			</Example>
			<Example>
				<ButtonGroup minimal={true}>
					<Button text="Add Template" icon="add" />
					<Button text="Load Results" icon="search" />
					<Popover content={moreOptionsMenu} position={Position.BOTTOM}>
						<Button text="More Options" icon="cog" rightIcon="caret-down" />
					</Popover>
				</ButtonGroup>
			</Example>
			<Example>
				<ButtonGroup>
					<Button text="Add Template" icon="add" />
					<Button text="Load Results" icon="search" />
					<Popover content={moreOptionsMenu} position={Position.BOTTOM}>
						<Button text="More Options" icon="cog" rightIcon="caret-down" />
					</Popover>
				</ButtonGroup>
			</Example>
			<Example vertical={false}>
				<Button text="Add Template" icon="add" />
				<Button text="Load Results" icon="search" />
				<Popover content={moreOptionsMenu} position={Position.BOTTOM}>
					<Button text="More Options" icon="cog" rightIcon="caret-down" />
				</Popover>
			</Example>
		</>
	);
}