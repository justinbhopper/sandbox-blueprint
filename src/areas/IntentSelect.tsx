import { Classes, Intent } from "@blueprintjs/core";
import * as React from "react";

const INTENTS = [
	{ label: "None", value: Intent.NONE },
	{ label: "Primary", value: Intent.PRIMARY },
	{ label: "Success", value: Intent.SUCCESS },
	{ label: "Warning", value: Intent.WARNING },
	{ label: "Danger", value: Intent.DANGER },
];

export interface IIntentSelectProps {
	inline?: boolean;
	intent: Intent;
	onChange: (intent: Intent) => void;
}

export class IntentSelect extends React.PureComponent<IIntentSelectProps> {
	public render() {
		return (
			<div className={Classes.SELECT}>
				<select value={this.props.intent} onChange={this.handleIntentChange}>
					{INTENTS.map((opt, i) => (
						<option key={i} value={opt.value}>
							{opt.label}
						</option>
					))}
				</select>
			</div>
		);
	}

	private handleIntentChange = (event: React.FormEvent<HTMLSelectElement>) => this.props.onChange((event.target as HTMLInputElement).value as Intent);
}