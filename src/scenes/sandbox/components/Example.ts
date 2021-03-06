import Stack, { IStackProps } from '../../../common/components/Stack';
import styled, { css } from 'styled-components';

const inlineCss = css`
	display: block;
`

export interface IExampleProps extends IStackProps {
	inline?: boolean;
}

const Example = styled(Stack)<IExampleProps>`
	padding: 10px 0;

	& + & {
		border-top: 1px solid #ddd;
	}

	${(props: IExampleProps) => props.inline ? inlineCss : ''}

	> .bp3-control {
		margin-top: 0;
		margin-bottom: 0;
	}
`

export default Example;