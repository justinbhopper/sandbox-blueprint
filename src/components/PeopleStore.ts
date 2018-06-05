import { List } from 'immutable'

import { action, computed, observable } from 'mobx'

export class PeopleStore {
	@observable
	private data = List<string>();

	public getAll(): string[] {
		return this.data.toArray();
	}

	@computed
	public get count(): number {
		return this.data.size;
	}

	@action
	public add(person: string): void {
		if (this.data.includes(person)) {
			return;
		}
		
		this.data = this.data.push(person).sort().toList();
	}

	@action
	public addMany(people: string[]): void {
		people.forEach(this.add, this);
	}

	@action
	public remove(person: string): void {
		const index = this.data.indexOf(person);
		if (index !== -1) {
			this.data = this.data.splice(index, 1).toList();
		}
	}

	@action
	public removeMany(people: string[]): void {
		people.forEach(this.remove, this);
	}

	@action
	public update(people: string[]): void {
		this.data = List<string>(people.sort());
	}
}