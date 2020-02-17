import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import {
  Container, Content, Header, Left, Body, Title, Right, Icon, Button, Text,
} from 'native-base';

import * as PropTypes from '../common/proptypes';

const withStore = connect((state) => state);

const propTypes = {
  ...PropTypes.withState,
};

const Wrapper = (C) => withStore(C);

const styles = StyleSheet.create({
  xxx: {
    fontFamily: 'monospace',
    fontSize: 10,
  },
});
class DebugView extends Component {
  state = {};

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>DEBUG</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Text style={styles.xxx}>{JSON.stringify(this.props, null, 2)}</Text>
        </Content>
      </Container>
    );
  }
}

DebugView.propTypes = propTypes;

export default Wrapper(DebugView);
