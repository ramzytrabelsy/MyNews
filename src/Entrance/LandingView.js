import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Container, Header, Content, Spinner,
} from 'native-base';

import { STYLE } from '../common/styles';

import { LogoHeader } from './LogoHeader';

const styles = StyleSheet.create({
  header: {
    height: 0,
  },
  spinner: {
    margin: 16,
  },
  logoStyle: {
    margin: 0,
    marginBottom: 24,
  },
});

const LandingView = () => (
  <Container>
    <Header noShadow transparent style={styles.header} />

    <Content scrollEnabled={false} contentContainerStyle={STYLE.flex_grow}>
      <LogoHeader style={STYLE.flex} logoStyle={styles.logoStyle} />

      <View style={STYLE.fit}>
        <View style={STYLE.flex} />
        <View style={[STYLE.flex, STYLE.flex_center]}>
          <Spinner size="large" style={styles.spinner} />
        </View>
      </View>
    </Content>
  </Container>
);

export default LandingView;
