import { connect } from 'react-redux'
import { IRootState } from '../redux';
import { formExampleActions, IFormExampleState } from '../redux/application/formExample';
import { TagInputExample } from './tagInputExample';

interface IDispatchProps {
	onPeopleSelected?: (selectedPeople: string[]) => void;
}

interface IOwnProps {
	large: boolean;
}

const mapStateToProps = (state: IRootState, ownProps: IOwnProps) => ({
	large: ownProps.large,
	selectedPeople: state.formExample.selectedPeople || []
});

export const ConnectedTagInputExample = connect<IFormExampleState, IDispatchProps, IOwnProps>(mapStateToProps, {
	onPeopleSelected: formExampleActions.setSelectedPeople
})(TagInputExample)