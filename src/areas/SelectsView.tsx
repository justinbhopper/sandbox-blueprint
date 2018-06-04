import * as React from 'react';

import {
	Button,
	FormGroup,
	Hotkey,
	Hotkeys,
	HotkeysTarget,
	InputGroup,
	Intent,
	IPopoverProps,
	Label,
	MenuItem,
	Switch,
	Tag
} from '@blueprintjs/core';

import { MultiSelect, Omnibar, Select, Suggest } from '@blueprintjs/select'

import { AsyncSelect } from '../components/AsyncSelect';
import { FilmStore, filterFilm, IFilm, renderFilm, TOP_100_FILMS } from "../components/Films";
import { filterUser, IUser, renderUser, UserStore } from "../components/Users";
import { IntentSelect } from './IntentSelect';

export interface ISelectViewState {
	animated: boolean;
	disabled: boolean;
	errored: boolean;
	film: IFilm;
	user?: IUser;
	intent: Intent;
	selectedFilms: IFilm[];
	omnibarOpen: boolean;
}

@HotkeysTarget
export class SelectsView extends React.Component<{}, ISelectViewState> {
	public state: ISelectViewState = {
		animated: false,
		disabled: false,
		errored: false,
		film: TOP_100_FILMS[0],
		intent: Intent.NONE,
		omnibarOpen: false,
		selectedFilms: [],
		user: undefined
	};

	private filmStore = new FilmStore();
	private userStore = new UserStore();

	private filmAsyncSelect: AsyncSelect<IFilm>;
	private userAsyncSelect: AsyncSelect<IUser>;

	private refHandlers = {
		filmAsyncSelect: (ref: AsyncSelect<IFilm>) => {
			this.filmAsyncSelect = ref;
		},
		userAsyncSelect: (ref: AsyncSelect<IUser>) => {
			this.userAsyncSelect = ref;
		}
	}

	public renderHotkeys() {
		return (
			<Hotkeys>
				<Hotkey
					allowInInput={true}
					global={true}
					combo="ctrl + k"
					label="Show Omnibar"
					preventDefault={true}
					onKeyDown={this.openOmnibar}
				/>
			</Hotkeys>
		);
	}
	
	public render() {
		const { animated, disabled, errored, film, omnibarOpen } = this.state;
		const intent = errored ? Intent.DANGER : this.state.intent;

		const FilmSelect = Select.ofType<IFilm>();
		const FilmMultiSelect = MultiSelect.ofType<IFilm>();
		const FilmSuggest = Suggest.ofType<IFilm>();
		const FilmOmnibar = Omnibar.ofType<IFilm>();
		const FilmAsyncSelect = AsyncSelect.ofType<IFilm>();
		const UserAsyncSelect = AsyncSelect.ofType<IUser>();

		const popoverProps: IPopoverProps = {
			minimal: !animated
		};

		const selectProps = {
			disabled,
			filterable: false,
			itemPredicate: filterFilm,
			itemRenderer: renderFilm,
			items: TOP_100_FILMS,
			noResults: <MenuItem icon="zoom-out" disabled={true} text="No results." />,
			onItemSelect: () => null,
			popoverProps
		};

		const getFilmTitle = (f?: IFilm): string => f ? f.title : "(No selection)";
		const getUsername = (u?: IUser): string => u ? u.username : "(No selection)";
		const filmTagRenderer = (f: IFilm) => f.title;

		return (
			<FormGroup intent={intent} disabled={disabled}>
				<div className="stack middle">
					<Switch label="Disable All" large={true} checked={disabled} onClick={this.onDisableAllClick} />
					<Switch label="Invalidate All" large={true} checked={errored} onClick={this.onErrorAllClick} />
					<Switch label="Animated Popup" large={true} checked={animated} onClick={this.onAnimatedClick} />
					<Label text="Color" inline={true}>
						<IntentSelect intent={this.state.intent} onChange={this.handleIntentChange} />
					</Label>
				</div>
				<div className="example stack">
					<FormGroup label="Normal Select">
						<FilmSelect 
							{...selectProps}
							onItemSelect={this.handleFilmChange}>
							<Button rightIcon="caret-down" text={film ? film.title : "(No selection)"} intent={intent} disabled={disabled} />
						</FilmSelect>
					</FormGroup>
					<FormGroup label="Selected Value" helperText="This shows how a hidden input could be updated if need-be.">
						<InputGroup value={film ? film.title : ""} intent={intent} readOnly={true} disabled={disabled} />
					</FormGroup>
				</div>
				<div className="example">
					<FormGroup label="Filterable Select">
						<FilmSelect {...selectProps} filterable={true}>
							<Button rightIcon="caret-down" text={film ? film.title : "(No selection)"} intent={intent} disabled={disabled} />
						</FilmSelect>
					</FormGroup>
				</div>
				<div className="example">
					<FormGroup label="Suggest (aka ComboBox)">
						<FilmSuggest {...selectProps} inputValueRenderer={getFilmTitle}>
							<Button rightIcon="caret-down" text={film ? film.title : "(No selection)"} intent={intent} disabled={disabled} />
						</FilmSuggest>
					</FormGroup>
				</div>
				<div className="example stack bottom">
					<FormGroup label="Asynchronous Select (Local)">
						<FilmAsyncSelect
							ref={this.refHandlers.filmAsyncSelect}
							disabled={disabled}
							intent={intent}
							fetchOnInitialize={false}
							itemPredicate={filterFilm}
							itemRenderer={renderFilm}
							buttonTextProvider={getFilmTitle}
							store={this.filmStore}
							popoverProps={popoverProps}
						/>
					</FormGroup>
					<Button text="Load" onClick={this.onLoadFilmItems} />
				</div>
				<div className="example stack bottom">
					<FormGroup label="Asynchronous Select (Server)">
						<UserAsyncSelect
							ref={this.refHandlers.userAsyncSelect}
							disabled={disabled}
							filterable={false}
							intent={intent}
							fetchOnInitialize={false}
							itemPredicate={filterUser}
							itemRenderer={renderUser}
							buttonTextProvider={getUsername}
							store={this.userStore}
							onItemSelect={this.handleUserChange}
							popoverProps={popoverProps}
						/>
					</FormGroup>
					<Button text="Load" onClick={this.onLoadUserItems} />
				</div>
				<div className="example">
					<FormGroup label="Omnibar" helperText={<>Alternatively, you can launch it using <Tag>ctrl</Tag> + <Tag>K</Tag></>}>
						<Button text="Launch Omnibar" onClick={this.onOpenOmnibarClick} intent={intent} disabled={disabled} />
						<FilmOmnibar 
							{...selectProps} 
							isOpen={omnibarOpen}
							resetOnSelect={true}
							inputProps={{ 
								onBlur: this.closeOmnibar,
								placeholder: "Search for movies..."
							}}
							onClose={this.closeOmnibar} />
					</FormGroup>
				</div>
				<div className="example">
					<FormGroup label="Multi Select">
						<FilmMultiSelect 
							{...selectProps}
							tagRenderer={filmTagRenderer}
							onItemSelect={this.handleFilmSelect}
							tagInputProps={{
								onRemove: this.handleFilmRemove
							}}
							selectedItems={this.state.selectedFilms} />
					</FormGroup>
				</div>
			</FormGroup>
		);
	}

	private handleIntentChange = (intent: Intent) => this.setState({ intent });

	private handleFilmChange = (film: IFilm) => {
		this.setState({ film });
	}

	private handleUserChange = (user: IUser) => {
		this.setState({ user });
	}

	private handleFilmSelect = (film: IFilm) => {
		this.setState({ selectedFilms: [...this.state.selectedFilms, film] });
	}

	private handleFilmRemove = (tag: string, index: number) => {
		this.setState({ selectedFilms: this.state.selectedFilms.filter((f, i) => i !== index) });
	}

	private onDisableAllClick = () => {
		this.setState({ disabled: !this.state.disabled });
	}

	private onErrorAllClick = () => {
		this.setState({ errored: !this.state.errored });
	}

	private onAnimatedClick = () => {
		this.setState({ animated: !this.state.animated });
	}

	private onOpenOmnibarClick = () => {
		this.setState({ omnibarOpen: true });
	}

	private onLoadFilmItems = () => {
		this.filmAsyncSelect.fetchAsync();
	}

	private onLoadUserItems = () => {
		this.userAsyncSelect.fetchAsync();
	}

	private openOmnibar = () => this.setState({ omnibarOpen: true });

	private closeOmnibar = () => this.setState({ omnibarOpen: false });
}