import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
  Container, Header, Left, Body, Title, Right, Content, Text, Icon, Button,
} from 'native-base';

import * as PropTypes from '../common/proptypes';

import { STYLE } from '../common/styles';

import { RELEASE_VERSION } from '../common/config';

const withStore = connect((state) => ({}));

const propTypes = {
  ...PropTypes.withRouting,
  ...PropTypes.withState,
};

const Wrapper = (C) => withStore(C);

class AboutView extends Component {
  state = {};


  render() {
    const { item } = this.props.navigation.state.params;

    return (
      <Container>
        <Header>
          <Left>
          </Left>
          <Body>
    <Title>Details</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
    <Text>{item.title}</Text>
        </Content>
      </Container>
    );
  }
}

AboutView.propTypes = propTypes;

export default Wrapper(AboutView);
