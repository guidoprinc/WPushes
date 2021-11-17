import { createReducer } from 'redux-recompose';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import { AuthState } from '@interfaces/reduxInterfaces';

import { actions } from './actions';

const initialState = {
  initialLoading: true
};

const reducerDescription = {
  [actions.AUTH_INIT]: (state: ImmutableObject<AuthState>) => state.merge({ initialLoading: false })
};

export default createReducer(Immutable(initialState), reducerDescription);
