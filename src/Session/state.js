import * as StateHelper from '../common/state.helper';

/**
 * Module name
 */

export const MODULE = 'Session';

/**
 * Initial state
 */

const defineInitialState = () => ({
  locale: 'en',
  messages: $setLanguage('en')
});

/**
 * Reset
 */

export const $setLanguage = language => {
  let messages = {};
  switch (language) {
    case 'fr':
      messages = Object.assign(messages, require(`../i18n/fr.json`));
      break;
    default:
    case 'en':
      messages = Object.assign(messages, require(`../i18n/en.json`));
      break;
  }
  return messages;
};



export const $reset = StateHelper.createSimpleOperation(MODULE, 'reset', () => $reset.action());

/**
 * Reducer
 */

export function reducer(state = defineInitialState(), action) {
  switch (action.type) {
    case $reset.ACTION:
      return defineInitialState();
    case $setLanguage.ACTION:
      return {
        locale: action.language,
        messages: $setLanguage(action.language)
      }
    default:
      return state;
  }
}
