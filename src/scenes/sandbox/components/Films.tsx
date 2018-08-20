import { MenuItem } from "@blueprintjs/core";
import { ItemPredicate, ItemRenderer } from "@blueprintjs/select";
import * as React from "react";

import FilmsApiClient from "../../../api/films/client";
import IFilmsApiClient from "../../../api/films/IFilmsApiClient";
import { IAsyncStore } from "../../../common/components/AsyncStore";
import axios from "../../../common/utils/axios";
import { highlightText } from '../../../common/utils/menus'
import { IFilm } from "../../../schemas";

export const renderFilm: ItemRenderer<IFilm> = (film, { handleClick, modifiers, query }) => {
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

export const filterFilm: ItemPredicate<IFilm> = (query, film) => {
	return `${film.rank}. ${film.title.toLowerCase()} ${film.year}`.indexOf(query.toLowerCase()) >= 0;
};

export class FilmStore implements IAsyncStore<IFilm> {
	private filmsClient: IFilmsApiClient;

	constructor() {
		this.filmsClient = FilmsApiClient(axios);
	}

	public fetchAsync(): Promise<IFilm[]> {
		return this.filmsClient.getAll();
	}
}