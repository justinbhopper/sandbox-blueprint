import {
	Icon,
	Intent,
	Popover,
	PopoverInteractionKind,
	Position
} from '@blueprintjs/core';

import * as React from 'react';

export interface IHintProps {
	text: string;
	iconSize?: number;
}

export const Hint: React.SFC<IHintProps> = (props) => {
{
		const { iconSize, text, ...popoverProps } = props;

		return (
			<Popover 
				{...popoverProps}
				targetClassName="hint"
				popoverClassName="hint"
				targetElementTag="span"
				content={text}
				hoverCloseDelay={150}
				position={Position.BOTTOM_LEFT} 
				interactionKind={PopoverInteractionKind.HOVER_TARGET_ONLY}>
				<Icon title="" intent={Intent.PRIMARY} icon="help" iconSize={iconSize || 14} />
			</Popover>
		);
	}
};