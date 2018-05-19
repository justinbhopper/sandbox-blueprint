import { ApplicationActions } from './application/actions';
import { FormExampleActions } from './application/formExample';

export type RootAction = ApplicationActions | FormExampleActions;