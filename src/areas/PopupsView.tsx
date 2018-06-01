import * as React from 'react';

import {
	Icon,
	Popover,
	PopoverInteractionKind,
	Position
} from '@blueprintjs/core';

export class PopupsView extends React.Component {
	public render() {
		const content = (
			<div className="card codeable-info">
				<Icon icon="search-text" color="rgb(100, 100, 100)" iconSize={30} />
				<div className="description">
					<span>Chronic Depression</span>
				</div>
				<div className="coding">
					<span className="system">ICD-10</span>
					<span className="code">90211-23</span>
				</div>
			</div>
		);

		return (
			<>
				<div className="example stack vertical">
					<Popover content={content} minimal={true} position={Position.BOTTOM_LEFT} interactionKind={PopoverInteractionKind.CLICK}>
						Hover over me
					</Popover>
				</div>
			</>
		);
	}
}