import { connect } from 'react-redux'
import { IRootState } from '../redux';
import { formExampleActions } from '../redux/application/formExample';
import { TagInputExample } from './tagInputExample';

interface IStateFromProps {
	selectedPeople?: string[];
}

interface IDispatchProps {
	onPeopleSelected?: (selectedPeople: string[]) => void;
}

interface IOwnProps {
	large: boolean;
}

const mapStateToProps = (state: IRootState, ownProps: IOwnProps) => ({
	large: ownProps.large,
	selectedPeople: state.formExample.selectedPeople
});

export const ConnectedTagInputExample = connect<IStateFromProps, IDispatchProps, IOwnProps>(mapStateToProps, {
	onPeopleSelected: formExampleActions.setSelectedPeople
})(TagInputExample)