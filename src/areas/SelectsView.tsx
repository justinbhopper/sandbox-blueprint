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
	MenuItem,
	Switch,
	Tag
} from '@blueprintjs/core';

import { Omnibar, Select, Suggest } from '@blueprintjs/select'

import { AsyncSelect } from '../components/AsyncSelect';
import { FilmStore, filterFilm, IFilm, renderFilm, TOP_100_FILMS } from "../components/Films";

export interface ISelectViewState {
	animated: boolean;
	disabled: boolean;
	errored: boolean;
	film: IFilm;
	omnibarOpen: boolean;
}

@HotkeysTarget
export class SelectsView extends React.Component<{}, ISelectViewState> {
	public state: ISelectViewState = {
		animated: false,
		disabled: false,
		errored: false,
		film: TOP_100_FILMS[0],
		omnibarOpen: false
	};

	private filmStore = new FilmStore();

	private filmAsyncSelect: AsyncSelect<IFilm>;

	private refHandlers = {
		filmAsyncSelect: (ref: AsyncSelect<IFilm>) => {
			this.filmAsyncSelect = ref;
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
		const intent = errored ? Intent.DANGER : Intent.NONE;

		const FilmSelect = Select.ofType<IFilm>();
		const FilmSuggest = Suggest.ofType<IFilm>();
		const FilmOmnibar = Omnibar.ofType<IFilm>();
		const FilmAsyncSelect = AsyncSelect.ofType<IFilm>();

		const popoverProps: IPopoverProps = {
			minimal: !animated
		};

		const selectProps = {
			disabled,
			itemPredicate: filterFilm,
			itemRenderer: renderFilm,
			items: TOP_100_FILMS,
			noResults: <MenuItem icon="zoom-out" disabled={true} text="No results." />,
			onItemSelect: this.handleValueChange,
			popoverProps
		};

		const getFilmTitle = (f: IFilm): string => f.title;

		return (
			<>
				<FormGroup intent={intent} disabled={disabled}>
					<div className="example stack">
						<Switch label="Animated Popup" large={true} checked={animated} onClick={this.onAnimatedClick} />
						<Switch label="Invalidate All" large={true} checked={errored} onClick={this.onErrorAllClick} />
						<Switch label="Disable All" large={true} checked={disabled} onClick={this.onDisableAllClick} />
					</div>
					<div className="example stack">
						<FormGroup label="Normal Select">
							<FilmSelect {...selectProps} filterable={false}>
								<Button rightIcon="caret-down" text={film ? film.title : "(No selection)"} intent={intent} disabled={disabled} />
							</FilmSelect>
						</FormGroup>
						<FormGroup label="Selected Value" helperText="This shows how a hidden input could be updated if need-be.">
							<InputGroup value={film ? film.title : ""} intent={intent} disabled={disabled} />
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
						<FormGroup label="Asynchronous Suggest">
							<FilmAsyncSelect
								ref={this.refHandlers.filmAsyncSelect}
								disabled={disabled}
								fetchOnInitialize={false}
								itemPredicate={filterFilm}
								itemRenderer={renderFilm}
								onItemSelect={this.handleValueChange}
								store={this.filmStore}
							/>
						</FormGroup>
						<Button text="Load" onClick={this.onLoadAsyncItems} />
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
				</FormGroup>
			</>
		);
	}

	private handleValueChange = (film: IFilm) => this.setState({ film });

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

	private onLoadAsyncItems = () => {
		this.filmAsyncSelect.fetch();
	}

	private openOmnibar = () => this.setState({ omnibarOpen: true });

	private closeOmnibar = () => this.setState({ omnibarOpen: false });
}