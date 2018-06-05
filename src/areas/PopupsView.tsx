import * as React from 'react';

import { 
	Alert,
	Button,
	Callout,
	FormGroup,
	Icon,
	InputGroup,
	Intent,
	Position,
	Tooltip
} from '@blueprintjs/core';

import { Codeable } from 'components/Codeable';
import { Hint } from 'components/Hint';

interface IPopupsViewState {
	isAlertOpen: boolean;
}

export class PopupsView extends React.Component<{}, IPopupsViewState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			isAlertOpen: false
		};
	}

	public render() {
		return (
			<>
				<Callout>
					Hover over items to display the popups.  Some popups are custom styled, and some are using Balloon.css.
				</Callout>
				<div className="example">
					<>Patient is suffering from </>
					<Codeable description="Chronic Depression" system="ICD-10" code="90233-11" />.
				</div>
				<div className="example">
					<>Patient is suffering from </>
					<Codeable description="Chronic Depression" system="ICD-10" code="90233-11">
						depression
					</Codeable>.
				</div>
				<div className="example">
					<>Patient is suffering from </>
					<span data-balloon="This is a tip using Balloon.css!" data-balloon-pos="down">
						depression
					</span>.
				</div>
				<div className="example">
					<>Patient is suffering from depression. </>
					<span data-balloon="This is a tip using Balloon.css!" data-balloon-pos="down">
						<Icon title="" color="#5d49c8" icon="help" iconSize={14} />
					</span>
				</div>
				<div className="example">
					<>Patient is suffering from </>
					<Tooltip content="This is a tip using Blueprint!" position={Position.TOP} openOnTargetFocus={false}>
						depression
					</Tooltip>.
				</div>
				<div className="example stack">
					<FormGroup label="Last Name" labelFor="lastName" requiredLabel={true} 
						helperText={<>Patient's family name. <Hint text="Input the patient's family name, also known as their sirname or last name." /></>}>
						<InputGroup id="lastName" />
					</FormGroup>
				</div>
				<div className="example">
					<Button text="Show Alert" onClick={this.showAlert} />
					<Alert
						confirmButtonText="Okay"
						isOpen={this.state.isAlertOpen}
						icon="error"
						intent={Intent.PRIMARY}
						transitionDuration={100}
						onConfirm={this.hideAlert}>
						This is a simple alert dialog.
					</Alert>
				</div>
			</>
		);
	}

	private showAlert = () => {
		this.setState({ isAlertOpen: true });
	}

	private hideAlert = () => {
		this.setState({ isAlertOpen: false });
	}
};

export default PopupsView;