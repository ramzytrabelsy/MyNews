import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image } from 'react-native';
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

import {
  $fetchPosts, $updatePost, $removePost, $createPost,
} from './state';

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
  state = {
    text: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch($fetchPosts()).catch((error) => Interaction.toast(Interaction.FAILURE, error.message));
  }

  /* createPost() {
    const { dispatch } = this.props;
    const { text } = this.state;
    dispatch($createPost({ title: text }));
    this.setState({ text: '' });
  } */

  searchPost(value) {
    const { dispatch } = this.props;
    const { text } = this.state;

    this.setState({ text: value });

    console.log(text)
  }

  render() {
    const { processing, posts, dispatch } = this.props;
    const { text } = this.state;
    return (
      <Container>
        <Header>
          <Left>
              {processing ? <Spinner size="small" inverse /> : null }
          </Left>
          <Body>
            <Title>Articles</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Item>
            <Input placeholder="Search " value={text} onChangeText={(value) => this.searchPost(value)} />
          </Item>

          <FlatList
            contentContainerStyle={[STYLE.flex_grow, STYLE.padder]}
            data={posts}
            keyExtractor={(item,index ) => index}
            renderItem={({ item , index }) => (

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
          />
        </Content>
      </Container>
    );
  }
}

HomeView.propTypes = propTypes;

export default Wrapper(HomeView);
