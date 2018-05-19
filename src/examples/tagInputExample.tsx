import { Button, TagInput } from '@blueprintjs/core';
import * as React from 'react';

export interface ITagInputExampleProps {
	large: boolean;
	onPeopleSelected?: (selectedPeople: string[]) => void;
}

export interface ITagInputExampleState {
	selectedPeople?: string[];
}

export class TagInputExample extends React.Component<ITagInputExampleProps, ITagInputExampleState> {
	public state: ITagInputExampleState = {
		selectedPeople: []
	}

	public render() {
		const { large } = this.props;

		const values: string[] = this.state.selectedPeople || [];

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

	private handleChange = (selectedPeople: string[]) => {
		this.setState({ selectedPeople });

		if (this.props.onPeopleSelected)
		{
			this.props.onPeopleSelected(selectedPeople);
		}
	}
	
	private handleClear = () => this.handleChange([])
}