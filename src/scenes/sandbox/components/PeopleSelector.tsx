import { Button, Intent, TagInput } from '@blueprintjs/core';
import { observer } from 'mobx-react'
import * as React from 'react';
import { PeopleStore } from './PeopleStore';

export interface IPeopleSelectorProps {
	peopleStore: PeopleStore;
	large?: boolean;
	disabled?: boolean;
	minimal?: boolean;
	intent?: Intent;
}

@observer
export class PeopleSelector extends React.Component<IPeopleSelectorProps> {
	public render() {
		const { peopleStore, intent, minimal, ...tagInputProps } = this.props;

		const clearButton = (
			peopleStore.count > 0 
			? <Button icon="cross" minimal={true} disabled={tagInputProps.disabled} onClick={this.handleClear} />
			: undefined
		);

		const tagProps = {
			intent,
			minimal
		};

		return (
			<TagInput
				{...tagInputProps}
				tagProps={tagProps}
				leftIcon="person"
				placeholder="Search people..."
				addOnBlur={true}
				fill={false}
				onAdd={this.handleAdd}
				onRemove={this.handleRemove}
				rightElement={clearButton}
				values={peopleStore.getAll()} />
		);
	}

	private handleAdd = (people: string[]) => {
		this.props.peopleStore.addMany(people);
	}

	private handleRemove= (person: string) => {
		this.props.peopleStore.remove(person);
	}
	
	private handleClear= () => {
		this.props.peopleStore.update([]);
	}
}