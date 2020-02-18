import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
} from 'react-native'
import {
  Container, Header, Left, Body, Title, Right, Content, Text, Icon,
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
          <View style={styles.container}>
            <ScrollView>
              <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
                <Image style={styles.productImg} source={{ uri: item.urlToImage }} />
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.price}>{item.author}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>

            </ScrollView>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  productImg: {
    width: 300,
    height: 300,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: 'bold'
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: "green",
    fontWeight: 'bold'
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    color: "#696969",
  },
  star: {
    width: 40,
    height: 40,
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginHorizontal: 3
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: '#778899',
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20
  },
  contentColors: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20
  },
  contentSize: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20
  },
  separator: {
    height: 2,
    backgroundColor: "#eeeeee",
    marginTop: 20,
    marginHorizontal: 30
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  addToCarContainer: {
    marginHorizontal: 30
  }
});

AboutView.propTypes = propTypes;

export default Wrapper(AboutView);
