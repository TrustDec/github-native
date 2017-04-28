import React, { Component } from 'react';
import ReactNative from 'react-native';
const {StyleSheet,Text,View,Image,AsyncStorage,DeviceEventEmitter} = ReactNative;
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage';
import AsyncStorageTest from '../../AsyncStorageTest';
import Toast,{DURATION} from 'react-native-easy-toast';
import MyPage from './my/MyPage';
import WebViewTest from  '../../WebViewTest';
export default class HomePage extends Component {
  constructor(props){
    super(props);
    this.state={
      selectedTab: 'tb_polular'
    }
  }
  componentDidMount(){
    this.listener = DeviceEventEmitter.addListener('showToast',(text)=>{
      this.toast.show(text,DURATION.LENGTH_LONG)
    });
  }
  componentWillUnmount(){
    this.listener&&this.listener.remove();
  }
  render() {
    AsyncStorage.clear(error=>{});
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_polular'}
            selectedTitleStyle={{color:'#2196f3'}}
            title="最热"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image,{tintColor: '#2196f3'}]} source={require('../../res/images/ic_polular.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_polular' })}>
            <PopularPage {...this.props}/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_trending'}
            selectedTitleStyle={{color:'red'}}
            title="趋势"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image,{tintColor: 'red'}]} source={require('../../res/images/ic_trending.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
            <AsyncStorageTest/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_favorite'}
            selectedTitleStyle={{color:'green'}}
            title="收藏"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image,{tintColor: 'green'}]} source={require('../../res/images/ic_polular.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
            <WebViewTest/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_my'}
            selectedTitleStyle={{color:'red'}}
            title="我的"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image,{tintColor: 'red'}]} source={require('../../res/images/ic_trending.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_my' })}>
            <MyPage {...this.props}/>
          </TabNavigator.Item>
        </TabNavigator>
        <Toast ref={toast=>this.toast=toast}/> 
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
