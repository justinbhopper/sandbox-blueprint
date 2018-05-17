import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { ApplicationActions, IApplicationState } from '../redux/application';
import { ITagInputExampleProps, TagInputExample } from './tagInputExample';

const mapStateToProps = (state: IApplicationState, ownProps: ITagInputExampleProps): ITagInputExampleProps => ({
	...ownProps,
	selectedPeople: state.selectedPeople
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: ITagInputExampleProps): ITagInputExampleProps => ({
	...ownProps,
	onPeopleSelected:  (selectedPeople: string[]) => dispatch(ApplicationActions.setSelectedPeople(selectedPeople))
});

export const ConnectedTagInputExample = connect(
	mapStateToProps,
	mapDispatchToProps
)(TagInputExample)