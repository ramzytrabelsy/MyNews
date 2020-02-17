import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import {
  Container, Content, Text, List, ListItem, Icon, Thumbnail, Left, Body,
} from 'native-base';

import * as PropTypes from '../common/proptypes';

import * as Interaction from '../Shared/Interaction';

import { COLOR } from '../common/styles';

import { $logout } from '../Auth/state';

const styles = StyleSheet.create({
  itemIcon: {
    fontSize: 24,
    marginLeft: 10,
  },
});

const withStore = connect((state) => ({
  user: state.Auth.user,
}));

const propTypes = {
  ...PropTypes.withState,
  //user: PropTypes.User.isRequired,
};

const Wrapper = (C) => withStore(C);

class NavigationMenu extends Component {
  state = {};

  logout() {
    const { dispatch } = this.props;

    dispatch($logout())
      .then(() => Interaction.toast(Interaction.SUCCESS, 'Goodbye!'))
      .catch((error) => Interaction.toast(Interaction.FAILURE, error.message));
  }

  render() {
    const user = this.props.user || {};
    const path = this.props.navigation.state.routes[this.props.navigation.state.index].routeName;
    return (
      <Container>
        <Content>
          <List>
            <ListItem avatar selected={path === '/profile'} onPress={() => this.props.navigation.navigate('/profile')}>
              <Left>
                <Thumbnail circle small source={{ uri: user.picture_uri }} />
              </Left>
              <Body>
                <Text>{user.name}</Text>
              </Body>
            </ListItem>
            <ListItem icon selected={path === '/home'} onPress={() => this.props.navigation.navigate('/home')}>
              <Left>
                <Icon name="home" style={styles.itemIcon} />
              </Left>
              <Body>
                <Text>Home</Text>
              </Body>
            </ListItem>
            <ListItem icon selected={path === '/about'} onPress={() => this.props.navigation.navigate('/about')}>
              <Left>
                <Icon name="information-circle" style={styles.itemIcon} />
              </Left>
              <Body>
                <Text>About</Text>
              </Body>
            </ListItem>
            <ListItem icon onPress={() => this.logout()}>
              <Left>
                <Icon name="log-out" style={styles.itemIcon} />
              </Left>
              <Body>
                <Text>Logout</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

NavigationMenu.propTypes = propTypes;

export default Wrapper(NavigationMenu);
