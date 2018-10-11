import Stack from 'common/components/Stack';
import { css } from 'styled-components';

const ExampleCss = css`
	& + & {
		border-top: 1px solid #ddd;
	}
`

const Example = Stack.extend`
	padding: 10px 0;

	${ExampleCss}

	> .bp3-control {
		margin-top: 0;
		margin-bottom: 0;
	}
`

export default Example;