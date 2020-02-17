import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import {
  Container, Header, Content, Button, Spinner, Input, Item, Text, Form,
} from 'native-base';

import * as PropTypes from '../common/proptypes';

import { STYLE } from '../common/styles';

import { LogoHeader } from './LogoHeader';

import * as Interaction from '../Shared/Interaction';

import { $initiatePasswordReset } from '../Auth/state';

const withStore = connect((state) => ({
  processing: state.Activity.processingByOperation[$initiatePasswordReset.OPERATION] || false,
}));

const propTypes = {
  ...PropTypes.withState,
  processing: PropTypes.bool.isRequired,
};

const Wrapper = (C) => withStore(C);

const styles = StyleSheet.create({
  header: {
    height: 0,
  },
  header_logo: {
    flex: 1,
    minHeight: 'auto',
  },
});

class PasswordResetView extends Component {
  state = {
    email: '',
  };

  hasValidInput() {
    return !!this.state.email;
  }

  initiatePasswordReset() {
    if (!this.hasValidInput()) {
      return null;
    }

    const { dispatch } = this.props;

    return dispatch($initiatePasswordReset(this.state.email)).catch((error) => Interaction.toast(Interaction.FAILURE, error.message));
  }

  render() {
    return (
      <Container>
        <Header noShadow style={styles.header} />

        <Content padder contentContainerStyle={STYLE.flex_grow}>
          <LogoHeader style={styles.header_logo} />

          <Form>
            <Item regular>
              <Input
                placeholder="Email"
                keyboardType="email-address"
                value={this.state.email}
                autoCapitalize="none"
                returnKeyType="send"
                enablesReturnKeyAutomatically
                onChangeText={(email) => this.setState({ email })}
                onSubmitEditing={() => this.initiatePasswordReset()}
              />
            </Item>

            <View style={STYLE.spacer} />

            <Button
              block
              primary
              disabled={!this.hasValidInput() || this.props.processing}
              onPress={() => this.initiatePasswordReset()}
            >
              <Text>Recover my Account</Text>
              {this.props.processing && <Spinner size="small" inverse />}
            </Button>
          </Form>

          <View style={STYLE.spacer} />

          <View style={STYLE.spacer} />

          <View style={STYLE.flex_row}>
            <Button block transparent dark style={STYLE.flex} onPress={() => this.props.navigation.navigate('/login')}>
              <Text>Log in</Text>
            </Button>

            <View style={STYLE.spacer} />

            <Button block transparent dark style={STYLE.flex} onPress={() => this.props.navigation.navigate('/signup')}>
              <Text>Sign up</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

PasswordResetView.propTypes = propTypes;

export default Wrapper(PasswordResetView);
