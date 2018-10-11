import styled, { css } from 'styled-components'

type Position = 'top' | 'middle' | 'bottom';

export interface IStackProps {
	vertical?: boolean;
	position?: Position;
	centered?: boolean;
	spacing?: number;
}

function getAlignItems(position?: Position) {
	switch (position) {
		case 'top': return 'flex-start';
		case 'middle': return 'center';
		case 'bottom': return 'flex-end';
		default: return 'start';
	}
}

const spacingHorizontal = css<IStackProps>`
	> * + * { 
		margin-left: ${props => props.spacing || 8}px; 
	}
`

const spacingVertical = css<IStackProps>`
	> * + * {
		margin-top: ${props => props.spacing || 8}px; 
	}
`

const justifyCenter = css`
	justify-content: center;
`

const Stack = styled.div<IStackProps>`
	display: flex;
	flex-direction: ${ props => props.vertical ? 'column' : 'row' };
	flex-wrap: nowrap;
	align-items: ${ props => getAlignItems(props.position) };

	${ props => props.centered ? justifyCenter : '' }
	${ props => props.vertical ? spacingVertical : spacingHorizontal }

	.fill {
		flex-grow: 1;
		flex-shrink: 1;
	}

	> .bp3-label {
		margin-bottom: 0;
	}
`

export default Stack;