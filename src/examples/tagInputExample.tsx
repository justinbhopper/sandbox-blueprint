import * as React from 'react';
import { connect } from 'react-redux'

import { Button, TagInput } from '@blueprintjs/core';

export interface ITagInputExampleProps {
	large?: boolean;
	values?: React.ReactNode[];
}

interface ITagInputExampleState {
	selectedPeople?: React.ReactNode[]
}

const mapStateToProps = (state: ITagInputExampleState) => {
	return {
		values: state.selectedPeople
	}
}

export class TagInputExample extends React.Component<ITagInputExampleProps, ITagInputExampleState> {
	public render() {
		const { large } = this.props;

		const values: React.ReactNode[] = this.props.values || [];

		const clearButton = (
			values.length > 0 
			? <Button icon="cross" minimal={true} onClick={this.handleClear} />
			: undefined
		);

		return (
			<TagInput
				large={large || false}
				leftIcon="person"
				placeholder="Search people..."
				addOnBlur={true}
				fill={false}
				onChange={this.handleChange}
				rightElement={clearButton}
				values={values} />
		);
	}

	private handleChange = (selectedPeople: React.ReactNode[]) => {
		this.setState({ selectedPeople });
	};
	
	private handleClear = () => this.handleChange([]);
}

export const ConnectedTagInputExample = connect(mapStateToProps)(TagInputExample)