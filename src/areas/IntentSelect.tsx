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
	onChange: React.FormEventHandler<HTMLSelectElement>;
}

export const IntentSelect: React.SFC<IIntentSelectProps> = props => (
	<div className={Classes.SELECT}>
		<select value={props.intent} onChange={props.onChange}>
			{INTENTS.map((opt, i) => (
				<option key={i} value={opt.value}>
					{opt.label}
				</option>
			))}
		</select>
	</div>
);