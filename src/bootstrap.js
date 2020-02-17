/**
 * App bootstrap
 */

import { getStore } from './store';

import * as FetchHelper from './common/fetch.helper';

import { AuthService } from './Auth/AuthService';

import * as Auth from './Auth/state';

import * as Shared from './Shared/state';

import * as Interaction from './Shared/Interaction';

export default async function bootstrap() {
  const { dispatch, getState } = getStore();

  await AuthService.initialize();

  if (!AuthService.isAuthenticated() && getState().Auth.authenticated) {
    dispatch(Auth.$reset());

    await dispatch(Shared.$closeSession());
  } else if (AuthService.isAuthenticated() && !getState().Auth.authenticated) {
    await AuthService.logout();
  }

  AuthService.events.on('login', () => {
    dispatch(Shared.$startSession()).catch((error) => Interaction.toast(Interaction.FAILURE, error.message));
  });

  AuthService.events.on('logout', () => {
    dispatch(Shared.$closeSession()).catch((error) => Interaction.toast(Interaction.FAILURE, error.message));
  });

  FetchHelper.events.on('failure', (error, response) => {
    if (AuthService.isAuthenticated() && response.status === 401) {
      dispatch(Auth.$logout());
    }
  });

  await dispatch(Shared.$appReady());

  if (AuthService.isAuthenticated()) {
    await dispatch(Shared.$startSession()).catch((error) => Interaction.toast(Interaction.FAILURE, error.message));
  }
}
