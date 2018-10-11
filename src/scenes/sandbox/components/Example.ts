import Stack from 'common/components/Stack';

const Example: any = Stack.extend`
	padding: 10px 0;

	& + &${() => Example} {
		border-top: 1px solid #ddd;
	}

	> .bp3-control {
		margin-top: 0;
		margin-bottom: 0;
	}
`

export default Example;