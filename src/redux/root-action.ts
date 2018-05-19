import { ActionType } from 'typesafe-actions';
import { applicationActions } from './application/actions';

export type ApplicationActions = ActionType<typeof applicationActions>;

export type RootAction = ApplicationActions;