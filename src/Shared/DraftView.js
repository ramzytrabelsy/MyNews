/* eslint-disable react/prop-types */

import React, { Component } from 'react';

import {
  Container, Header, Content, Left, Body, Title, Right, Icon, Button, Text,
} from 'native-base';

import { STYLE } from '../common/styles';

import * as Interaction from './Interaction';

class DraftView extends Component {
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
            <Title>DRAFT</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Button block dark onPress={() => Interaction.toast(Interaction.SUCCESS, 'Toast')}>
            <Text>toast</Text>
          </Button>
          <Button block dark onPress={() => Interaction.status(Interaction.SUCCESS, 'Status')}>
            <Text>status</Text>
          </Button>
          <Button
            block
            dark
            onPress={() => Interaction.alert('Title', 'Alert').then((r) => Interaction.toast(Interaction.INFO, r))}
          >
            <Text>alert</Text>
          </Button>
          <Button
            block
            dark
            onPress={() => Interaction.confirm('Title', 'Confirmation').then((r) => Interaction.toast(Interaction.INFO, r))
            }
          >
            <Text>confirm</Text>
          </Button>
          <Button
            block
            dark
            onPress={() => Interaction.confirmWithNeutral('Title', 'confirmWithNeutral').then((r) => Interaction.toast(Interaction.INFO, r))
            }
          >
            <Text>confirmWithNeutral</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default DraftView;
