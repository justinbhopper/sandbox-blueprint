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

import { IFilm } from '@justinbhopper/cqrs-sandbox';
import Stack from 'common/components/Stack';
import { AsyncSelect } from '../../../common/components/AsyncSelect';
import { CancelToken } from '../../../common/components/CancelToken';
import Example from '../components/Example';
import { FilmStore, filterFilm, renderFilm } from "../components/Films";
import { IntentSelect } from '../components/IntentSelect';

export interface ISelectsState {
	animated: boolean;
	disabled: boolean;
	errored: boolean;
	film?: IFilm;
	allFilms: IFilm[];
	intent: Intent;
	selectedFilms: IFilm[];
	omnibarOpen: boolean;
}

@HotkeysTarget
export class Selects extends React.Component<{}, ISelectsState> {
	private filmStore = new FilmStore();
	private filmAsyncSelect: AsyncSelect<IFilm>;
	private cancelSource = CancelToken.source();

	private refHandlers = {
		filmAsyncSelect: (ref: AsyncSelect<IFilm>) => {
			this.filmAsyncSelect = ref;
		}
	}

	constructor(props: {}) {
		super(props);

		this.state = {
			animated: false,
			disabled: false,
			errored: false,
			film: undefined,
			allFilms: [],
			intent: Intent.NONE,
			omnibarOpen: false,
			selectedFilms: []
		}
	}

	public async componentDidMount() {
		const allFilms = await this.filmStore.fetchAsync();
		
		this.setState({ 
			allFilms,
			film: allFilms[0]
		});
	}

	public componentWillUnmount() {
		this.cancelSource.cancel('Unmounting');
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

		const popoverProps: IPopoverProps = {
			minimal: !animated
		};

		const selectProps = {
			disabled,
			filterable: false,
			itemPredicate: filterFilm,
			itemRenderer: renderFilm,
			items: this.state.allFilms,
			noResults: <MenuItem icon="zoom-out" disabled={true} text="No results." />,
			onItemSelect: () => null,
			popoverProps
		};

		const getFilmTitle = (f?: IFilm): string => f ? f.title : "(No selection)";
		const filmTagRenderer = (f: IFilm) => f.title;

		return (
			<FormGroup intent={intent} disabled={disabled}>
				<Stack position="middle">
					<Switch label="Disable All" large={true} checked={disabled} onChange={this.onDisableAllChange} />
					<Switch label="Invalidate All" large={true} checked={errored} onChange={this.onErrorAllChange} />
					<Switch label="Animated Popup" large={true} checked={animated} onChange={this.onAnimatedChange} />
					<Label>Color</Label>
					<IntentSelect intent={this.state.intent} onChange={this.handleIntentChange} />
				</Stack>
				<Example>
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
				</Example>
				<Example>
					<FormGroup label="Filterable Select">
						<FilmSelect {...selectProps} filterable={true}>
							<Button rightIcon="caret-down" text={film ? film.title : "(No selection)"} intent={intent} disabled={disabled} />
						</FilmSelect>
					</FormGroup>
				</Example>
				<Example>
					<FormGroup label="Suggest (aka ComboBox)">
						<FilmSuggest {...selectProps} inputValueRenderer={getFilmTitle}>
							<Button rightIcon="caret-down" text={film ? film.title : "(No selection)"} intent={intent} disabled={disabled} />
						</FilmSuggest>
					</FormGroup>
				</Example>
				<Example position="bottom">
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
				</Example>
				<Example>
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
				</Example>
				<Example>
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
				</Example>
			</FormGroup>
		);
	}

	private handleIntentChange = (intent: Intent) => this.setState({ intent });

	private handleFilmChange = (film: IFilm) => {
		this.setState({ film });
	}

	private handleFilmSelect = (film: IFilm) => {
		this.setState({ selectedFilms: [...this.state.selectedFilms, film] });
	}

	private handleFilmRemove = (tag: string, index: number) => {
		this.setState({ selectedFilms: this.state.selectedFilms.filter((f, i) => i !== index) });
	}

	private onDisableAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ disabled: event.target.checked });
	}

	private onErrorAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ errored: event.target.checked });
	}

	private onAnimatedChange =(event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ animated: event.target.checked });
	}

	private onOpenOmnibarClick = () => {
		this.setState({ omnibarOpen: true });
	}

	private onLoadFilmItems = () => {
		this.filmAsyncSelect.fetchAsync(this.cancelSource.token);
	}

	private openOmnibar = () => this.setState({ omnibarOpen: true });

	private closeOmnibar = () => this.setState({ omnibarOpen: false });
}

export default Selects;