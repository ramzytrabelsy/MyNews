import React, { Component } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import * as PropTypes from './common/proptypes';

import * as Logger from './common/logger';

import { COLOR } from './common/styles';

import LandingView from './Entrance/LandingView';
import Entrance from './Entrance';
import Session from './Session';

import { $keyboardVisible } from './Shared/state';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background,
  },
});

const withStore = connect((state) => ({
  appReady: state.Shared.appReady,
  appInSession: state.Shared.appInSession,
  authenticated: state.Auth.authenticated,
}));

const propTypes = {
  ...PropTypes.withState,
  appReady: PropTypes.bool.isRequired,
  appInSession: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const Wrapper = (C) => withStore(C);

class App extends Component<{}> {
  componentDidMount() {
    if (SplashScreen) {
      SplashScreen.hide();
    }

    this.keyboardDidShowHandler = Keyboard.addListener('keyboardDidShow', () => this.props.dispatch($keyboardVisible(true)));
    this.keyboardDidHideHandler = Keyboard.addListener('keyboardDidHide', () => this.props.dispatch($keyboardVisible(false)));
  }

  componentWillUnmount() {
    this.keyboardDidShowHandler.remove();
    this.keyboardDidHideHandler.remove();
  }

  componentDidCatch(error, info) {
    Logger.error(error, info);
  }

  render() {
    const { appReady, appInSession, authenticated } = this.props;

    if (!appReady || (authenticated && !appInSession)) {
      return <Session />;
    }

    return <View style={styles.container}>{authenticated ? <Session /> : <Session />}</View>;
  }
}

App.propTypes = propTypes;

export default Wrapper(App);
