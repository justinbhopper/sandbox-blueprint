import { connect } from 'react-redux'
import { IRootState } from '../redux';
import { FormExample1 } from './formExample1';

interface IStateFromProps {
	selectedPeople?: string[];
}

const mapStateToProps = (state: IRootState) => ({
	selectedPeople: state.formExample.selectedPeople
});

export const ConnectedFormExample1 = connect<IStateFromProps>(mapStateToProps)(FormExample1)