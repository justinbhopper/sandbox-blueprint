import { assert } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';

import { PeopleSelector } from './PeopleSelector';
import { PeopleStore } from './PeopleStore';

describe("<PeopleSelector>", () => {
	it("React renders <PeopleSelector>", () => {
		const peopleStore = new PeopleStore();
		assert.doesNotThrow(() => mount(
			<PeopleSelector peopleStore={peopleStore} />
		));
	})

	it("allows overriding placeholder", () => {
		const peopleStore = new PeopleStore();
		const placeholder = "Test placeholder";
		const selector = mount(
			<PeopleSelector peopleStore={peopleStore} placeholder={placeholder} />
		)
		assert.equal((selector.find("input").getDOMNode() as HTMLInputElement).placeholder, placeholder);
	})
});