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

// Promise implementation
const $fetchPostsPromise = StateHelper.createAsyncOperation(MODULE, 'fetchPosts', () => {
  return (dispatch) => {
    Activity.processing(MODULE, $fetchPostsPromise.NAME);
    dispatch($fetchPostsPromise.request());

    return fetch(`${API_ENDPOINT}/client/post`, {
      headers: {
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
      },
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch($fetchPostsPromise.success(result)))
      .catch((error) => dispatch($fetchPostsPromise.failure(error)))
      .finally(() => Activity.done(MODULE, $fetchPostsPromise.NAME));
  };
});

// async/await implementation
export const $fetchPosts = StateHelper.createAsyncOperation(MODULE, 'fetchPosts', () => {
  return async (dispatch) => {
    Activity.processing(MODULE, $fetchPosts.NAME);
    dispatch($fetchPosts.request());

    try {
      const response = await fetch(`${API_ENDPOINT}/v2/everything?q=bitcoin&from=2020-01-17&sortBy=publishedAt&apiKey=${API_KEY}`);
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
 * Create post
 */

export const $createPost = StateHelper.createAsyncOperation(MODULE, 'createPost', (data) => {
  return (dispatch) => {
    Activity.processing(MODULE, $createPost.NAME);
    dispatch($createPost.request());

    return fetch(`${API_ENDPOINT}/client/post/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
      }),
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch($createPost.success(result)))
      .catch((error) => dispatch($createPost.failure(error)))
      .finally(() => Activity.done(MODULE, $createPost.NAME));
  };
});

/**
 * Update post
 */

export const $updatePost = StateHelper.createAsyncOperation(MODULE, 'updatePost', (postId, data) => {
  return (dispatch) => {
    Activity.processing(MODULE, $updatePost.NAME);
    dispatch($updatePost.request());

    return fetch(`${API_ENDPOINT}/client/post/${postId}/edit`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
      }),
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch($updatePost.success(result)))
      .catch((error) => dispatch($updatePost.failure(error)))
      .finally(() => Activity.done(MODULE, $updatePost.NAME));
  };
});

/**
 * Remove post
 */

export const $removePost = StateHelper.createAsyncOperation(MODULE, 'removePost', (postId) => {
  return (dispatch) => {
    Activity.processing(MODULE, $removePost.NAME);
    dispatch($removePost.request());

    return fetch(`${API_ENDPOINT}/client/post/${postId}/delete`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
      },
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then(() => dispatch($fetchPosts()))
      .catch((error) => dispatch($removePost.failure(error)))
      .finally(() => Activity.done(MODULE, $removePost.NAME));
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
    case $createPost.SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.data],
      };
    case $updatePost.SUCCESS:
      return {
        ...state,
        posts: state.posts.map((item) => (action.data.id === item.id ? action.data : item)),
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
