import * as StateHelper from '../common/state.helper';

/**
 * Module name
 */

export const MODULE = 'Session';

/**
 * Initial state
 */

const defineInitialState = () => ({});

/**
 * Reset
 */

export const $reset = StateHelper.createSimpleOperation(MODULE, 'reset', () => $reset.action());

/**
 * Reducer
 */

export function reducer(state = defineInitialState(), action) {
  switch (action.type) {
    case $reset.ACTION:
      return defineInitialState();
    default:
      return state;
  }
}
