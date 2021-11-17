import { createTypes } from 'redux-recompose';

export const actions = createTypes(['AUTH_INIT'], '@@AUTH');

export const actionCreators = {
  init: () => ({ type: actions.AUTH_INIT })
};
