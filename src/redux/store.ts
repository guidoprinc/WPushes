import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { fetchMiddleware, configureMergeState } from 'redux-recompose';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import {
  seamlessImmutableReconciler,
  seamlessImmutableTransformCreator
} from 'redux-persist-seamless-immutable';
import { ImmutableObject } from 'seamless-immutable';
import { State } from '@interfaces/reduxInterfaces';

import auth from './auth/reducer';

const transformerConfig = {
  whitelistPerReducer: {
    // TODO: Complete with reducers, for example
    // auth: ['currentUser']
  }
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // TODO: Complete with reducers, for example
  // whitelist: ['auth']
  whitelist: [],
  stateReconciler: seamlessImmutableReconciler,
  transforms: [seamlessImmutableTransformCreator(transformerConfig)]
};

configureMergeState((state: ImmutableObject<State>, diff: State) => state.merge(diff));

const reducers = combineReducers({
  auth
});

const persistedReducer = persistReducer(persistConfig, reducers);

const middlewares = [];
const enhancers = [];

/* ------------- Thunk Middleware ------------- */
middlewares.push(thunk);

/* ------------- Redux-Recompose Middleware ------------- */
middlewares.push(fetchMiddleware);

/* ------------- Assemble Middleware ------------- */
enhancers.push(applyMiddleware(...middlewares));

// In DEV mode, we'll create the store through Reactotron
const store = createStore(persistedReducer, compose(...enhancers));

export default store;
