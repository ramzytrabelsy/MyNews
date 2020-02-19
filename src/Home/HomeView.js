import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, ScrollView, RefreshControl } from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  Spinner,
  Text,
  Icon,
  Button,
  CardItem,
  CheckBox,
  Input,
  Item,
  Card
} from 'native-base';

import { FlatList } from 'react-native-gesture-handler';
import * as PropTypes from '../common/proptypes';

import { COLOR, STYLE } from '../common/styles';

import * as Interaction from '../Shared/Interaction';

import { $fetchPosts } from './state';

const withStore = connect((state) => ({
  processing: state.Activity.processingByOperation[$fetchPosts.OPERATION] || false,
  posts: state.Home.posts,
}));

const propTypes = {
  ...PropTypes.withRouting,
  ...PropTypes.withState,
  processing: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.Post.isRequired).isRequired,
};

const Wrapper = (C) => withStore(C);

const styles = StyleSheet.create({
  checkbox: {
    marginLeft: 0,
    marginRight: 16,
  },
  button: {
    marginHorizontal: 12,
  },
});

class HomeView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: props.processing,
      text: '',
      posts_items: props.posts
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch($fetchPosts()).catch((error) => Interaction.toast(Interaction.FAILURE, error.message));
  }

  _searchPost(text) {
    const { posts } = this.props;
    //passing the inserted text in textinput
    const newData = posts.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    console.log("jdhjdjdjdjjdjdjdjdjdj");
    console.log(newData);
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      posts_items: newData,
      text: text,
    });
  }

  _refresh() {
    const { processing, posts, dispatch } = this.props;
    this.setState({
      refreshing: processing
    }, () => {
      dispatch($fetchPosts()).catch((error) => Interaction.toast(Interaction.FAILURE, error.message));
    })

  }


  render() {
    const { processing, posts, dispatch } = this.props;
    const { text , posts_items } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            {processing ? <Spinner size="small" inverse /> : null}
          </Left>
          <Body>
            <Title>Articles</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Item>
            <Input placeholder="Search " value={text} onChangeText={(text) => this._searchPost(text)} />
          </Item>

          <FlatList
            contentContainerStyle={[STYLE.flex_grow, STYLE.padder]}
            data={posts_items}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => (

              <CardItem key={index} button bordered onPress={() => this.props.navigation.navigate('/about', { item: item })}>
                <Left>
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={{ uri: item.urlToImage }}
                  />
                  <Text>{item.title}</Text>
                </Left>

                <Right>
                </Right>
              </CardItem>
            )}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this._refresh()}
              />
            }
          />
        </Content>
      </Container>
    );
  }
}

HomeView.propTypes = propTypes;

export default Wrapper(HomeView);
