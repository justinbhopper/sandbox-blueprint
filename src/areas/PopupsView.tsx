import * as React from 'react';

import { 
	Callout,
	FormGroup,
	Icon,
	InputGroup
} from '@blueprintjs/core';

import { Codeable } from 'components/Codeable';
import { Hint } from 'components/Hint';

export class PopupsView extends React.Component {
	public render() {
		return (
			<>
				<Callout>
					Hover over items to display the popups.
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
					<span data-balloon="This is a tip!" data-balloon-pos="down">
						depression
					</span>.
				</div>
				<div className="example">
					<>Patient is suffering from depression. </>
					<span data-balloon="This is a tip!" data-balloon-pos="down">
						<Icon title="" color="#5d49c8" icon="help" iconSize={14} />
					</span>
				</div>
				<div className="example stack">
					<FormGroup label="Last Name" labelFor="lastName" requiredLabel={true} 
						helperText={<>Patient's family name. <Hint text="Input the patient's family name, also known as their sirname or last name." /></>}>
						<InputGroup id="lastName" />
					</FormGroup>
				</div>
			</>
		);
	}
}