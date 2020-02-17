import * as Keychain from 'react-native-keychain';
import { AsyncStorage } from 'react-native';

import { EventEmitter } from '../common/events';

import { API_ENDPOINT } from '../common/config';
import * as FetchHelper from '../common/fetch.helper';

import { createLogger } from '../common/logger';

const Logger = createLogger('AuthService');

export const AuthServiceImpl = class AuthService {
  events = new EventEmitter();

  username = '';

  password = '';

  access_token = null;

  getAccessToken() {
    return this.access_token;
  }

  async _loadSession() {
    this.access_token = (await AsyncStorage.getItem('auth.access_token')) || null;
  }

  async _saveSession(access_token) {
    this.access_token = access_token || null;
    await AsyncStorage.setItem('auth.access_token', this.access_token);
  }

  async _clearSession() {
    this.access_token = null;
    await AsyncStorage.removeItem('auth.access_token');
  }

  async _loadCredentials() {
    const credentials = await Keychain.getGenericPassword();

    if (credentials) {
      this.username = credentials.username;
      this.password = credentials.password;
    }
  }

  async _saveCredentials(username, password) {
    this.username = username;
    this.password = password;
    await Keychain.setGenericPassword(username, password);
  }

  async _clearCredentials() {
    this.username = '';
    this.password = '';

    await Keychain.resetGenericPassword();
  }

  async initialize() {
    await this._loadSession();
    await this._loadCredentials();
  }

  hasCredentials() {
    return !!this.username && !!this.password;
  }

  isAuthenticated() {
    return !!this.access_token;
  }

  login(username, password) {
    return fetch(`${API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then(async ({ access_token, ...result }) => {
        await this._saveSession(access_token);
        await this._saveCredentials(username, password);
        await this.events.emitAsync('login');
        return result;
      });
  }

  async logout() {
    await this.events.emitAsync('logout');
    await this._clearSession();
    await this._clearCredentials();
  }

  signup(payload) {
    const { name, email, password } = payload;

    return fetch(`${API_ENDPOINT}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then(({ access_token, ...result }) => {
        this._saveSession(access_token);
        this._saveCredentials(email, password);
        return result;
      });
  }

  initiatePasswordReset(email) {
    return fetch(`${API_ENDPOINT}/auth/password-reset/initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    }).then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler);
  }
};

export const AuthService = new AuthServiceImpl();

if (process.env.NODE_ENV === 'development') {
  global.AuthService = AuthService;
}
