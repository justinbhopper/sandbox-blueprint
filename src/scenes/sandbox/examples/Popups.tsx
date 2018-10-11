import * as React from 'react';

import { 
	Alert,
	Button,
	Callout,
	FormGroup,
	Icon,
	InputGroup,
	Intent,
	Label,
	Position,
	Tooltip
} from '@blueprintjs/core';

import { Codeable } from '../../../common/components/Codeable';
import { Hint } from '../../../common/components/Hint';
import Example from '../components/Example';
import { IntentSelect } from '../components/IntentSelect';

interface IPopupsState {
	isAlertOpen: boolean;
	intent: Intent;
}

export class Popups extends React.Component<{}, IPopupsState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			intent: Intent.NONE,
			isAlertOpen: false
		};
	}

	public render() {
		return (
			<>
				<Callout>
					Hover over items to display the popups.  Some popups are custom styled, and some are using Balloon.css.
				</Callout>
				<Example>
					<>Patient is suffering from </>
					<Codeable description="Chronic Depression" system="ICD-10" code="90233-11" />.
				</Example>
				<Example>
					<>Patient is suffering from </>
					<Codeable description="Chronic Depression" system="ICD-10" code="90233-11">
						depression
					</Codeable>.
				</Example>
				<Example>
					<>Patient is suffering from </>
					<span data-balloon="This is a tip using Balloon.css!" data-balloon-pos="down">
						depression
					</span>.
				</Example>
				<Example>
					<>Patient is suffering from depression. </>
					<span data-balloon="This is a tip using Balloon.css!" data-balloon-pos="down">
						<Icon title="" color="#5d49c8" icon="help" iconSize={14} />
					</span>
				</Example>
				<Example>
					<>Patient is suffering from </>
					<Tooltip content="This is a tip using Blueprint!" position={Position.TOP} openOnTargetFocus={false}>
						depression
					</Tooltip>.
				</Example>
				<Example>
					<FormGroup label="Last Name" labelFor="lastName" labelInfo="(required)"
						helperText={<>Patient's family name. <Hint text="Input the patient's family name, also known as their sirname or last name." /></>}>
						<InputGroup id="lastName" />
					</FormGroup>
				</Example>
				<Example position="middle">
					<Button text="Show Alert" onClick={this.showAlert} />
					<Label>Color</Label>
					<IntentSelect intent={this.state.intent} onChange={this.onIntentSelect} />
					<Alert
						confirmButtonText="Okay"
						isOpen={this.state.isAlertOpen}
						icon="error"
						intent={this.state.intent}
						transitionDuration={100}
						onConfirm={this.hideAlert}>
						This is a simple alert dialog.
					</Alert>
				</Example>
			</>
		);
	}

	private onIntentSelect = (intent: Intent) => {
		this.setState({ intent });
	}

	private showAlert = () => {
		this.setState({ isAlertOpen: true });
	}

	private hideAlert = () => {
		this.setState({ isAlertOpen: false });
	}
};

export default Popups;