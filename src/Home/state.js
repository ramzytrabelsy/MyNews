import { API_ENDPOINT , API_KEY } from '../common/config';

import * as FetchHelper from '../common/fetch.helper';
import * as StateHelper from '../common/state.helper';

import { AuthService } from '../Auth/AuthService';

import * as Activity from '../Shared/Activity';

/**
 * Module name
 */

export const MODULE = 'Home';

/**
 * Initial state
 */

const defineInitialState = () => ({
  posts: [],
});

/**
 * Reset
 */

export const $reset = StateHelper.createSimpleOperation(MODULE, 'reset', () => $reset.action());

/**
 * Fetch posts
 */

// async/await implementation
export const $fetchPosts = StateHelper.createAsyncOperation(MODULE, 'fetchPosts', () => {
  return async (dispatch) => {
    Activity.processing(MODULE, $fetchPosts.NAME);
    dispatch($fetchPosts.request());

    try {
      const response = await fetch(`${API_ENDPOINT}/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`);
      const result = await FetchHelper.ResponseHandler(response);
      
      return dispatch($fetchPosts.success({ data: result.articles }));

    } catch (_error) {
      const error = FetchHelper.ErrorValueHandler(_error);
      return dispatch($fetchPosts.failure(error));
    } finally {
      Activity.done(MODULE, $fetchPosts.NAME);
    }
  };
});

/**
 * Reducer
 */

export function reducer(state = defineInitialState(), action) {
  switch (action.type) {
    case $reset.ACTION:
      return defineInitialState();
    case $fetchPosts.REQUEST:
      return {
        ...state,
        posts: null,
      };
    case $fetchPosts.SUCCESS:
      return {
        ...state,
        posts: action.data,
      };
    case $fetchPosts.FAILURE:
      return {
        ...state,
        posts: null,
      };
    default:
      return state;
  }
}

/**
 * Persister
 */

export function persister({ posts }) {
  return {
    posts,
  };
}
