import * as React from 'react';

import {
	Callout,
	Intent,
} from '@blueprintjs/core';

export class CalloutsView extends React.Component {
	public render() {
		return (
			<>
				<Callout intent={Intent.NONE}>
					This is a basic callout.
				</Callout>
				<Callout icon="help">
					This is a helpful hint, just in case you don't know how to use the application yet.
				</Callout>
				<Callout icon="info-sign" title="Tip of the day">
					This is a helpful hint, just in case you don't know how to use the application yet.
				</Callout>
				<Callout icon="info-sign" intent={Intent.PRIMARY}>
					Don't forget to check the patient's pulse.
				</Callout>
				<Callout intent={Intent.DANGER}>
					There was an error processing your request.
				</Callout>
				<Callout icon="tick" intent={Intent.SUCCESS}>
					Medications were added to the patient's chart successfully.
				</Callout>
				<Callout icon="info-sign" intent={Intent.PRIMARY} title="Don't forget!">
					Don't forget to check the patient's pulse.
				</Callout>
				<Callout icon="warning-sign" intent={Intent.DANGER} title="Attention!">
					This is a message that you need to read carefully.
				</Callout>
				<Callout icon="warning-sign" intent={Intent.WARNING} title="Warning!">
					Please check that all data is entered correctly before continuing.
				</Callout>
				<Callout icon="tick" intent={Intent.SUCCESS} title="Medications Added">
					Medications were added to the patient's chart successfully.
				</Callout>
			</>
		);
	}
}