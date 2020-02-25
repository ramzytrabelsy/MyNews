import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
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

  createPost() {
    const { dispatch } = this.props;
    const { text } = this.state;
    dispatch($createPost({ title: text }));
    this.setState({ text: '' });
  }

  render() {
    const { processing, posts, dispatch } = this.props;
    const { text } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              {processing ? <Spinner size="small" inverse /> : <Icon name="menu" />}
            </Button>
          </Left>
          <Body>
            <Title>Posts</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Item>
            <Input placeholder="Add post" value={text} onChangeText={(value) => this.setState({ text: value })} />
            <Button disabled={processing} onPress={() => this.createPost()}>
              <Text>save</Text>
            </Button>
          </Item>
          {/* {posts && (
            <Card>
              {posts.map((item) => (
                <CardItem key={item.id} button bordered>
                  <Left>
                    <CheckBox
                      checked={item.done}
                      color={COLOR.primary}
                      style={styles.checkbox}
                      onPress={() => dispatch($updatePost(item.id, { done: !item.done }))}
                    />
                    <Text style={{ textDecorationLine: item.done ? 'line-through' : 'none' }}>{item.title}</Text>
                  </Left>

                  <Right>
                    <Button transparent large><Icon name="create" /></Button>
                    <Button transparent large onPress={() => dispatch($removePost(item.id))}><Icon name="trash" /></Button>
                  </Right>
                </CardItem>
              ))}
            </Card>
          )} */}

          <FlatList
            contentContainerStyle={[STYLE.flex_grow, STYLE.padder]}
            // ListEmptyComponent={<DataEmpty icon="history" message="Aucune course passée" />}
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CardItem key={item.id} button bordered>
                <Left>
                  <CheckBox
                    checked={item.done}
                    color={COLOR.primary}
                    style={styles.checkbox}
                    onPress={() => dispatch($updatePost(item.id, { done: !item.done }))}
                  />
                  <Text style={{ textDecorationLine: item.done ? 'line-through' : 'none' }}>{item.title}</Text>
                </Left>

                <Right>
                  <View style={STYLE.flex_row}>
                    <Button transparent style={styles.button}>
                      <Icon name="create" />
                    </Button>
                    <Button transparent style={styles.button} onPress={() => dispatch($removePost(item.id))}>
                      <Icon name="trash" />
                    </Button>
                  </View>
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
