import { ActionType } from 'typesafe-actions';
import { ApplicationActions } from './application/actions';

export type ApplicationActions = ActionType<typeof ApplicationActions>;

export type RootAction = ApplicationActions;