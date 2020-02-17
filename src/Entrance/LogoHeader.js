import React from 'react';

import { View, Image, StyleSheet } from 'react-native';

import { STYLE } from '../common/styles';

import * as PropTypes from '../common/proptypes';

const styles = StyleSheet.create({
  content: {
    ...STYLE.fit,
    ...STYLE.flex_center,
    overflow: 'hidden',
  },
  logo: {
    margin: 24,
    width: 140,
    height: 140,
  },
});

const LogoHeader = ({ style, logoStyle }) => (
  <View style={style}>
    <View style={styles.content}>
      <Image source={{ uri: 'logo' }} _resizeMode="contain" style={[styles.logo, logoStyle]} />
    </View>
  </View>
);

LogoHeader.propTypes = {
  style: PropTypes.style,
  logoStyle: PropTypes.style,
};

LogoHeader.defaultProps = {
  style: {},
  logoStyle: {},
};

export { LogoHeader };
