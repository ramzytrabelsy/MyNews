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

import commonStyles from './styles';

import { $login } from '../Auth/state';

const withStore = connect((state) => ({
  processing: state.Activity.processingByOperation[$login.OPERATION] || false,
}));

const propTypes = {
  ...PropTypes.withRouting,
  ...PropTypes.withState,
  processing: PropTypes.bool.isRequired,
};

const Wrapper = (C) => withStore(C);

const styles = StyleSheet.create({});

class LoginView extends Component {
  state = {
    username: '',
    password: '',
  };

  $password = React.createRef();

  hasValidInput() {
    return !!this.state.username && !!this.state.password;
  }

  login() {
    if (!this.hasValidInput()) {
      return;
    }

    const { dispatch } = this.props;

    dispatch($login(this.state.username, this.state.password)).catch((error) => Interaction.toast(Interaction.FAILURE, error.message));
  }

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Header noShadow style={commonStyles.header} />

        <Content padder contentContainerStyle={STYLE.flex_grow}>
          <LogoHeader style={commonStyles.logo} />

          <Form>
            <Item regular>
              <Input
                placeholder="Email"
                value={this.state.username}
                onChangeText={(username) => this.setState({ username })}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => this.$password.current.wrappedInstance.focus()}
                enablesReturnKeyAutomatically
                autoCapitalize="none"
              />
            </Item>

            <View style={STYLE.spacer} />

            <Item regular>
              <Input
                ref={this.$password}
                placeholder="Password"
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                returnKeyType="send"
                onSubmitEditing={() => this.login()}
                secureTextEntry
                enablesReturnKeyAutomatically
                blurOnSubmit
                autoCapitalize="none"
              />
            </Item>

            <View style={STYLE.spacer} />

            <Button
              block
              primary
              disabled={!this.hasValidInput() || this.props.processing}
              onPress={() => this.login()}
            >
              <Text>Log in</Text>
              {this.props.processing && <Spinner size="small" inverse />}
            </Button>
          </Form>

          <View style={STYLE.spacer} />

          <View style={STYLE.spacer} />

          <View style={STYLE.flex_row}>
            <Button block transparent dark style={STYLE.flex} onPress={() => navigation.navigate('/signup')}>
              <Text>Sign up</Text>
            </Button>

            <View style={STYLE.spacer} />

            <Button block transparent dark style={STYLE.flex} onPress={() => navigation.navigate('/password-reset')}>
              <Text>Recover</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

LoginView.propTypes = propTypes;

export default Wrapper(LoginView);
