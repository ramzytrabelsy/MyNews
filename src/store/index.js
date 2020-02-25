/**
 * Store
 *
 * This module is for state store definition
 */

import {
  combineReducers, createStore, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import persistState, { mergePersistedState } from 'redux-localstorage';
import persistAdapter from 'redux-localstorage/lib/adapters/AsyncStorage';
import AsyncStorage from '@react-native-community/async-storage';

import $state from './state';

let $store;

export function getStore() {
  return $store;
}

export function setupStore() {
  /**
   * Check and validate state definition in development mode
   */

  if (process.env.NODE_ENV === 'development') {
    // const SKIP = ['MODULE', 'reducer', 'persister'];

    Object.entries($state).forEach(([module, state]) => {
      if (!state) {
        console.warn(`$state.${module}: invalid descriptor`);
        return;
      }
      if (!state.MODULE || state.MODULE !== module) {
        console.warn(`$state.${module}: missing or invalid 'MODULE'`);
      }
      if (!state.reducer || typeof state.reducer !== 'function') {
        console.warn(`$state.${module}: missing or invalid 'reducer'`);
      }
      if (state.persister && typeof state.persister === 'function') {
        console.info(`$state.${module}: found 'persister'`);
      }

      // console.info(
      //   `$state.${module}: found`,
      //   Object.keys(state)
      //     .filter((name) => SKIP.indexOf(name) === -1)
      //     .map((name) => name),
      // );
    });
  }

  /**
   * define root reducer
   */

  // let reducer = combineReducers({
  //   Activity: $state.Activity.reducer,
  //   Auth: $state.Auth.reducer,
  //   // ...
  // });

  let reducer = combineReducers(
    Object.entries($state).reduce((result, [name, substate]) => {
      return substate.reducer
        ? {
          ...result,
          [name]: substate.reducer,
        }
        : result;
    }, {}),
  );

  /**
   * support loading persisted partial initial state
   */

  function merge(target, source) {
    const result = { ...target };

    Object.entries(source).forEach(([key, value]) => {
      if (value && Object.prototype.toString.call(value) === '[object Object]' && result[key]) {
        result[key] = merge(result[key], value);
      } else {
        result[key] = value;
      }
    });

    return result;
  }

  reducer = compose(mergePersistedState(merge))(reducer);

  /**
   * define persistence
   */

  // const persistSelector = (state) => ({
  //   Auth: $state.Auth.persister(state.Auth),
  //   // ...
  // });

  const persistSelector = (state) => Object.entries($state).reduce((result, [name, substate]) => {
    return substate.persister
      ? {
        ...result,
        [name]: substate.persister(state[name]),
      }
      : result;
  }, {});

  const persistStorage = compose((storage) => {
    storage._put = storage.put;
    storage.put = function (key, state, callback) {
      storage._put(key, persistSelector(state), callback);
    };
    return storage;
  })(persistAdapter(AsyncStorage));

  const persistEnhancer = persistState(persistStorage, 'redux');

  /**
   * define enhancers
   */

  const enhancerMiddleware = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    enhancerMiddleware.push(createLogger());
  }

  const composeEnhancers = global && global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

  const enhancer = composeEnhancers(applyMiddleware(...enhancerMiddleware), persistEnhancer);

  /**
   * expose $state
   */

  if (process.env.NODE_ENV === 'development') {
    global.$state = $state;
  }

  /**
   * create store
   */

  $store = createStore(reducer, enhancer);

  /**
   * expose $store
   */

  if (process.env.NODE_ENV === 'development') {
    global.$store = $store;
  }

  return $store;
}
