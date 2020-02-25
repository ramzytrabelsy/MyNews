import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Content,
  Spinner,
  Text,
  Icon,
  Label,
  Button,
  Card,
  CardItem,
  Thumbnail,
} from 'native-base';

import * as PropTypes from '../common/proptypes';

import { COLOR, STYLE } from '../common/styles';

import * as Interaction from '../Shared/Interaction';

import { $fetchProfile } from '../Auth/state';

const withStore = connect((state) => ({
  processing: state.Activity.processing,
  user: state.Auth.user,
}));

const propTypes = {
  ...PropTypes.withRouting,
  ...PropTypes.withState,
  processing: PropTypes.bool.isRequired,
  user: PropTypes.User.isRequired,
};

const Wrapper = (C) => withStore(C);

const styles = StyleSheet.create({
  header: {
    height: 200,
    paddingTop: 6,
  },
  fontSize: {
    fontSize: 16,
  },
  user_name: {
    marginTop: 10,
    color: COLOR.inverse,
  },
  card: {
    marginLeft: 36,
    marginRight: 36,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
});

class ProfileView extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch($fetchProfile()).catch((error) => Interaction.toast(Interaction.FAILURE, error.message));
  }

  render() {
    const { user, processing } = this.props;

    return (
      <Container>
        <Header span style={styles.header}>
          <View style={[STYLE.fit, STYLE.flex_center]}>
            <View
              style={{
                alignItems: 'center',
                padding: 8,
              }}
            >
              <Thumbnail large resizeMode="cover" source={{ uri: user.picture_uri }} />
              <Text style={styles.user_name}>{user.name}</Text>
            </View>
          </View>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              {processing ? <Spinner size="small" inverse /> : <Icon name="menu" />}
            </Button>
          </Left>
          <Body />
          <Right />
        </Header>

        <Content>
          <View style={[STYLE.flex, STYLE.flex_row, STYLE.flex_center]}>
            <Card transparent style={styles.card}>
              <CardItem>
                <Body>
                  <Label style={styles.fontSize}>Email</Label>
                  <Text style={styles.fontSize}>{user.email}</Text>
                </Body>
                {/* {user.emailVerified ? (
                <Icon name="ios-checkmark-circle-outline" style={{ color: COLOR.success }} />
              ) : (
                <Icon name="ios-checkmark-circle-outline" style={{ color: 'gray' }} />
              )} */}
              </CardItem>
            </Card>
          </View>
        </Content>
      </Container>
    );
  }
}

ProfileView.propTypes = propTypes;

export default Wrapper(ProfileView);
