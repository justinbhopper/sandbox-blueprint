import { action, computed, observable } from 'mobx'

export class PeopleStore {
	@observable
	private data: string[] = [];

	public get people(): string[] {
		return this.data;
	}

	@computed
	public get count(): number {
		return this.people.length;
	}

	@action
	public add(person: string): void {
		this.people.push(person);
		this.data = this.people.sort();
	}

	@action
	public addMany(people: string[]): void {
		people.forEach(this.add, this);
	}

	@action
	public remove(person: string): void {
		const index = this.people.indexOf(person);
		if (index !== -1)
		{
			this.people.splice(index, 1);
		}
	}

	@action
	public removeMany(people: string[]): void {
		people.forEach(this.remove, this);
	}

	@action
	public update(people: string[]): void {
		this.removeMany(this.people);
		this.addMany(people);
	}
}