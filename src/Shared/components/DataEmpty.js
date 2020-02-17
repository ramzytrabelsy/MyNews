import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from 'native-base';

import * as PropTypes from '../../common/proptypes';

import { COLOR, STYLE } from '../../common/styles';

const styles = StyleSheet.create({
  icon_container: {
    padding: 32,
    borderRadius: 100,
    backgroundColor: COLOR.white,
  },
  icon_content: {
    fontSize: 72,
    color: COLOR.text_muted,
  },
  message_container: {
    padding: 32,
  },
  message_content: {
    fontSize: 18,
    color: COLOR.text_muted,
  },
});

const DataEmpty = ({ icon, message, children }) => (
  <View style={[STYLE.flex, STYLE.flex_center, STYLE.background]}>
    {!!icon && (
      <View style={styles.icon_container}>
        <Icon name={icon} style={styles.icon_content} />
      </View>
    )}

    {!!message && (
      <View style={styles.message_container}>
        <Text style={styles.message_content}>{message}</Text>
      </View>
    )}

    {children}
  </View>
);

DataEmpty.propTypes = {
  icon: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  children: PropTypes.node,
};

DataEmpty.defaultProps = {
  children: null,
};

export { DataEmpty };
