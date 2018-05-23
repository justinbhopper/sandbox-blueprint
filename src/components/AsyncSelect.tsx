import { 
	ItemListPredicate, 
	ItemListRenderer, 
	ItemPredicate, 
	ItemRenderer, 
	Select
} from "@blueprintjs/select";

import { Button } from "@blueprintjs/core";
import * as React from "react";
import { IAsyncStore } from "./AsyncStore";

export interface IAsyncSelectProps<T> {
	store: IAsyncStore<T>;
	fetchOnInitialize?: boolean;
	filterable?: boolean;
	disabled?: boolean;
	resetOnSelect?: boolean;
	resetOnClose?: boolean;
	onQueryChange?: (query: string) => void;
	itemListPredicate?: ItemListPredicate<T>;
	itemPredicate?: ItemPredicate<T>;
	itemRenderer: ItemRenderer<T>;
	itemListRenderer?: ItemListRenderer<T>;
	initialContent?: React.ReactNode | null;
	noResults?: React.ReactNode;
	onItemSelect: (item: T, event?: React.SyntheticEvent<HTMLElement>) => void;
}

export interface IAsyncSelectState<T> {
	items?: T[];
	loading: boolean;
}

export class AsyncSelect<T> extends React.PureComponent<IAsyncSelectProps<T>, IAsyncSelectState<T>> {
	public static ofType<T>() {
		return AsyncSelect as new (props: IAsyncSelectProps<T>) => AsyncSelect<T>;
	}

	public store: IAsyncStore<T>;
	
	constructor(props: IAsyncSelectProps<T>, context?: any) {
		super(props, context);

		this.state = {
			items: undefined,
			loading: false
		}

		this.store = props.store;

		if (props.fetchOnInitialize !== false) {
			this.fetch();
		}
	}

	public render() {
		const { items, loading } = this.state;

		if (loading) {
			return (
				<Button rightIcon="caret-down" text="Loading..." disabled={true} />
			);
		} else if (items !== undefined) {
			const TypedSelect = Select.ofType<T>();
			
			const selectProps = {
				...this.props,
				items
			};

			return (
				<TypedSelect {...selectProps}>
					<Button rightIcon="caret-down" text="Example" />
				</TypedSelect>
			);
		} else {
			return (
				<Button rightIcon="caret-down" text="" disabled={true} />
			);
		}
	}

	public fetch(): Promise<void> {
		this.setState({ loading: true });

		return this.store.fetch().then(items => {
			this.setState({ 
				items,
				loading: false
			})
		});
	}
}