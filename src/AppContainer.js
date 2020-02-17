import React from 'react';

import { Provider as StateProvider } from 'react-redux';

import { Root as NativeBaseRoot, StyleProvider, getTheme } from 'native-base';

import { THEME } from './common/styles';

import App from './App';

import { getStore } from './store';

const AppContainer = () => (
  <StateProvider store={getStore()}>
    <NativeBaseRoot>
      <StyleProvider style={getTheme(THEME)}>
        <App />
      </StyleProvider>
    </NativeBaseRoot>
  </StateProvider>
);

export default AppContainer;
