import { connect } from 'react-redux'
import { IRootState } from '../redux';
import { applicationActions } from '../redux/application';
import { ITagInputExampleProps, TagInputExample } from './tagInputExample';

interface IStateFromProps {
	selectedPeople?: string[];
}

interface IDispatchFromProps {
	onPeopleSelected?: (selectedPeople: string[]) => void;
}

const mapStateToProps = (state: IRootState, ownProps: ITagInputExampleProps) => ({
	large: ownProps.large,
	selectedPeople: state.application.selectedPeople
});

export const ConnectedTagInputExample = connect<IStateFromProps, IDispatchFromProps>(mapStateToProps, {
	onPeopleSelected: applicationActions.setSelectedPeople
})(TagInputExample)