import { MenuItem } from "@blueprintjs/core";
import { ItemPredicate, ItemRenderer } from "@blueprintjs/select";
import * as React from "react";
import axios from '../utils/axios'
import { highlightText } from '../utils/menus'
import { IAsyncStore } from "./AsyncStore";

interface IUsersApi {
	'/api/users': {
		GET: {
			response: IUser[];
		}
	}
	'/api/users/:id': {
		GET: {
			params: {
				id: number;
			}
			response: IUser[];
		}
	}
}

const api = axios.create<IUsersApi>();

export interface IUser {
	id: number;
	username: string;
}

export const renderUser: ItemRenderer<IUser> = (user, { handleClick, modifiers, query }) => {
	if (!modifiers.matchesPredicate) {
		return null;
	}

	return (
		<MenuItem
			active={modifiers.active}
			key={user.id}
			onClick={handleClick}
			text={highlightText(user.username, query)}
		/>
	);
};

export const filterUser: ItemPredicate<IUser> = (query, film) => {
	return film.username.toLowerCase().indexOf(query.toLowerCase()) >= 0;
};

export class UserStore implements IAsyncStore<IUser> {
	public fetchAsync(): Promise<IUser[]> {
		return api.get('/api/users/:id', { id: 3 }).then(res => {
			return res.data;
		});
	}
}