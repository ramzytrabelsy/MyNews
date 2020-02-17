import './polyfill';

import './events';

import * as Logger from './logger';

import * as CONFIG from './config';

import $intl from './intl';

if (process.env.NODE_ENV === 'development') {
  global.Logger = Logger;
  global.CONFIG = CONFIG;
  global.$intl = $intl;
}

/**
 * Setup Logger
 */

const PREFIX = 'HelloWorld';

Logger.setup(PREFIX);

if (process.env.NODE_ENV === 'development') {
  Logger.enable(`${PREFIX}*`);
}
