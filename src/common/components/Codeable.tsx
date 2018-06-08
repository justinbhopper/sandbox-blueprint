import * as React from 'react';

import {
	Icon,
	Popover,
	PopoverInteractionKind,
	Position
} from '@blueprintjs/core';

export interface ICodeableProps {
	description: string;
	system: string;
	code: string;
}

export const Codeable: React.SFC<ICodeableProps> = (props) => {
	const { description, system, code, ...popoverProps } = props;

	const content = (
		<div className="card codeable-info">
			<Icon icon="search-text" color="white" iconSize={30} />
			<div className="description">
				<span>{description}</span>
			</div>
			<div className="coding">
				<span className="system">{system}</span>
				<span className="code">{code}</span>
			</div>
		</div>
	);

	if (!popoverProps.children) {
		popoverProps.children = description;
	}

	return (
		<Popover 
			{...popoverProps}
			className="codeable-hoverable"
			popoverClassName="card"
			content={content}
			minimal={true} 
			hoverCloseDelay={150}
			openOnTargetFocus={false}
			targetElementTag="span"
			position={Position.BOTTOM_LEFT} 
			interactionKind={PopoverInteractionKind.HOVER_TARGET_ONLY} 
		/>
	);
};