import { Button, TagInput } from '@blueprintjs/core';
import { observer } from 'mobx-react'
import * as React from 'react';
import { PeopleStore } from './PeopleStore';

export interface IPeopleSelectorProps {
	large: boolean;
	store: PeopleStore;
}

@observer
export class PeopleSelector extends React.Component<IPeopleSelectorProps> {
	public render() {
		const { large, store } = this.props;

		const clearButton = (
			store.count > 0 
			? <Button icon="cross" minimal={true} onClick={this.handleClear} />
			: undefined
		);

		return (
			<TagInput
				large={large}
				leftIcon="person"
				placeholder="Search people..."
				addOnBlur={true}
				fill={false}
				onAdd={this.handleAdd}
				onRemove={this.handleRemove}
				rightElement={clearButton}
				values={store.people} />
		);
	}

	private handleAdd = (people: string[]) => {
		this.props.store.addMany(people);
	}

	private handleRemove= (person: string) => {
		this.props.store.remove(person);
	}
	
	private handleClear= () => {
		this.props.store.update([]);
	}
}