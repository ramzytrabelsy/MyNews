import { StyleSheet, Platform, TextInput } from 'react-native';

// import NativeBaseTheme from '../../native-base-theme/variables/platform';
import NativeBaseTheme from 'native-base/src/theme/variables/material';

// import { CustomIcon } from '../Shared/components/CustomIcon';

/**
 * Fonts
 * inspect using https://opentype.js.org/font-inspector.html
 * make sure file name matches full name
 */

// const FONT_REGULAR = 'CustomFont-Regular';
// const FONT_LIGHT = 'CustomFont-Light';
// const FONT_BOLD = 'CustomFont-Bold';

/**
 * Colors
 */

export const COLOR = {
  debug: 'rgba(0,0,0,0.1)',

  background: '#F0F1F6',

  primary: '#607D8B',
  primaryDark: '#455A64',
  accent: '#FFC107',
  inverse: '#FAFAFA',

  success: '#2ECC71',
  error: '#E74C3C',
  info: '#3498DB',
  warning: '#F1C40F',
  off: '#999999',

  text: '#040404',
  textSecondary: '#333333',

  textInverse: '#FAFAFA',
  textSecondaryInverse: '#CCCCCC',

  white: '#FFFFFF',
  black: '#000000',
};

/**
 * React Native Customization
 */

// const Text_render = Text.prototype.render;
// const Text_style = { fontFamily: FONT_REGULAR };
// Text.prototype.render = function (...args) {
//   const origin = Text_render.call(this, ...args);
//   return cloneElement(origin, {
//     style: [Text_style, origin.props.style],
//   });
// };

// TextInput.defaultProps.fontFamily = FONT_REGULAR;
TextInput.defaultProps.selectionColor = COLOR.primary;

/**
 * NativeBase Customization
 *
 * Refer to following links for variables names:
 *   * https://docs.nativebase.io/docs/ThemeVariables.html
 *   * https://github.com/GeekyAnts/NativeBase/blob/master/src/theme/variables/platform.js
 */

Object.assign(NativeBaseTheme, {
  brandPrimary: COLOR.primary,

  // fontFamily: FONT_REGULAR,
  // btnFontFamily: FONT_REGULAR,
  // titleFontfamily: FONT_REGULAR,

  textColor: COLOR.text,
  inverseTextColor: COLOR.textInverse,

  containerBgColor: COLOR.background,
  tabBgColor: COLOR.background,

  // Icon

  // iconFamily: 'MaterialIcons',

  // Toolbar

  toolbarDefaultBg: COLOR.primary,

  iosStatusbar: 'light-content',

  // Footer

  footerDefaultBg: COLOR.black,

  // Tab

  tabDefaultBg: COLOR.primary,
  topTabBarTextColor: COLOR.text,

  // List

  listBorderColor: 'transparent',

  // Spinner

  defaultSpinnerColor: COLOR.primary,
  inverseSpinnerColor: COLOR.inverse,

  // ...

  listItemSelected: COLOR.primaryDark,
});

export const THEME = {
  ...NativeBaseTheme,

  // getters override...

  statusBarColor: COLOR.primaryDark,
};

/**
 * Custom Icons
 */

// CustomIcon.defaultProps.size = Platform.OS === 'ios' ? 35 : 30;
// CustomIcon.defaultProps.color = COLOR.primary;

/**
 * Common Styles
 */

export const STYLE = StyleSheet.create({
  debug: {
    backgroundColor: COLOR.debug,
  },

  // Layout

  fit: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  flex: {
    flex: 1,
  },

  flex_grow: {
    flexGrow: 1,
  },

  flex_row: {
    flexDirection: 'row',
  },

  flex_center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  padder: {
    padding: 12,
  },

  spacer: {
    margin: 6,
  },

  // Margin & Padding

  margin_4: {
    margin: 4,
  },

  margin_8: {
    margin: 8,
  },

  margin_12: {
    margin: 12,
  },

  margin_16: {
    margin: 16,
  },

  padding_4: {
    padding: 4,
  },

  padding_8: {
    padding: 8,
  },

  padding_12: {
    padding: 12,
  },

  padding_16: {
    padding: 16,
  },

  // Color

  background: {
    backgroundColor: COLOR.background,
  },

  background_white: {
    backgroundColor: COLOR.white,
  },

  background_translucent_dark: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },

  // Text

  text: {
    color: COLOR.text,
  },

  textSecondary: {
    color: COLOR.textSecondary,
  },

  textInverse: {
    color: COLOR.textInverse,
  },

  // textRegular: {
  //   fontFamily: FONT_REGULAR,
  // },

  // textLight: {
  //   fontFamily: FONT_LIGHT,
  // },

  // textBold: {
  //   fontFamily: FONT_BOLD,
  // },

  // ...
});
