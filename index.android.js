/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Boy from './Boy';
import ListViewTest from './ListViewTest';
export default class GithubNative extends Component {
  constructor(props){
    super(props);
    this.state={
      selectedTab: 'tb_polular'
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {/*<TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_polular'}
            selectedTitleStyle={{color:'green'}}
            title="最热"
            renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_polular.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image,{tintColor: 'green'}]} source={require('./res/images/ic_polular.png')} />}
            badgeText="1"
            onPress={() => this.setState({ selectedTab: 'tb_polular' })}>
            <View style={styles.page1}></View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_trending'}
            selectedTitleStyle={{color:'red'}}
            title="趋势"
            renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_trending.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image,{tintColor: 'red'}]} source={require('./res/images/ic_trending.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
            <View style={styles.page2}></View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_favorite'}
            selectedTitleStyle={{color:'green'}}
            title="收藏"
            renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_polular.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image,{tintColor: 'green'}]} source={require('./res/images/ic_polular.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
            <View style={styles.page1}></View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_my'}
            selectedTitleStyle={{color:'red'}}
            title="我的"
            renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_trending.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image,{tintColor: 'red'}]} source={require('./res/images/ic_trending.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_my' })}>
            <View style={styles.page2}></View>
          </TabNavigator.Item></TabNavigator>
        <Navigator
          initialRoute={{
            component: Boy
          }}
          renderScene={(route, navigator) => {
            let Component = route.component;
            return <Component navigator={navigator} {...route.params}/>
          }}>
        </Navigator>*/}
        <ListViewTest/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff'
  },
  page1: {
    flex: 1,
    backgroundColor: 'green'
  },
  page2: {
    flex: 1,
    backgroundColor: 'red'
  },
  image: {
    width: 22,
    height: 22,
  }
});

AppRegistry.registerComponent('GithubNative', () => GithubNative);
