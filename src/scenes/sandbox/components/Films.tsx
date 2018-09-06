import { MenuItem } from "@blueprintjs/core";
import { ItemPredicate, ItemRenderer } from "@blueprintjs/select";
import * as api from '@justinbhopper/cqrs-sandbox';
import * as React from "react";

import filmsService from '../../../api/films/service'

function createClient(): api.IFilmsClient {

	// TODO: express service is not working in react-script, 
	// so we will fake the calls by just providing a local service
	return filmsService();

	return new api.FilmsClient();
}

import { IAsyncStore } from "../../../common/components/AsyncStore";
import { highlightText } from '../../../common/utils/menus'

export const renderFilm: ItemRenderer<api.IFilm> = (film, { handleClick, modifiers, query }) => {
	if (!modifiers.matchesPredicate) {
		return null;
	}
	const text = `${film.rank}. ${film.title}`;
	return (
		<MenuItem
			active={modifiers.active}
			label={film.year.toString()}
			key={film.rank}
			onClick={handleClick}
			text={highlightText(text, query)}
		/>
	);
};

export const filterFilm: ItemPredicate<api.IFilm> = (query, film) => {
	return `${film.rank}. ${film.title.toLowerCase()} ${film.year}`.indexOf(query.toLowerCase()) >= 0;
};

export class FilmStore implements IAsyncStore<api.IFilm> {
	private filmsClient: api.IFilmsClient;

	constructor() {
		this.filmsClient = createClient();
	}

	public fetchAsync(): Promise<api.IFilm[]> {
		return this.filmsClient.getAll();
	}
}