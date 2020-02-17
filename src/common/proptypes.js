import * as PropTypes from 'prop-types';

import { ViewPropTypes } from 'react-native';

export * from 'prop-types';

/**
 * General Purpose
 */

export const { style } = ViewPropTypes;

/**
 * Routing
 */

export const withRouting = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
    addListener: PropTypes.func,
    isFocused: PropTypes.func,
    // state: PropTypes.object,
    state: PropTypes.shape({
      routeName: PropTypes.string,
      key: PropTypes.string,
      params: PropTypes.object,
    }),
    setParams: PropTypes.func,
    getParam: PropTypes.func,
    dispatch: PropTypes.func,
    push: PropTypes.func,
    pop: PropTypes.func,
    popToTop: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};

/**
 * State Management
 */

export const withState = {
  dispatch: PropTypes.func.isRequired,
};

/**
 * Domain Entities
 */

export const User = PropTypes.shape({
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  picture_uri: PropTypes.string.isRequired,
});

export const Post = PropTypes.shape({
  id: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
});
