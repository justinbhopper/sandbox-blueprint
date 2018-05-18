import { connect } from 'react-redux'
import { IRootState } from '../redux';
import { ApplicationActions } from '../redux/application';
import { TagInputExample } from './tagInputExample';

const mapStateToProps = (state: IRootState) => ({
	selectedPeople: state.application.selectedPeople
});

export const ConnectedTagInputExample = connect(mapStateToProps, {
	onPeopleSelected: ApplicationActions.setSelectedPeople
})(TagInputExample)