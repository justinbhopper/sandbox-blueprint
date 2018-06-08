import * as React from 'react';

import {
	NonIdealState
} from '@blueprintjs/core';

export default function EmptyResults() {
	return (
		<NonIdealState
			visual="zoom-out"
			title="No search results"
			description={
				<>
					This is an example page showing an empty results message.<br />
					Try searching for something else.
				</>
			}
		/>
	);
};