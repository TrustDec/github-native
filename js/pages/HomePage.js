import React, { Component } from 'react';
import ReactNative from 'react-native';
const {StyleSheet,Text,View,Image,AsyncStorage,DeviceEventEmitter} = ReactNative;
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage';
import AsyncStorageTest from '../../AsyncStorageTest';
import TrendingPage from './TrendingPage';
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
  _renderTab(Component,selectTab,title,renderIcon){
    return  <TabNavigator.Item
            selected={this.state.selectedTab === selectTab}
            selectedTitleStyle={{color:'#2196f3'}}
            title={title}
            renderIcon={() => <Image style={styles.image} source={renderIcon} />}
            renderSelectedIcon={() => <Image style={[styles.image,{tintColor: '#2196f3'}]} source={renderIcon}/>}
            onPress={() => this.setState({ selectedTab: selectTab })}>
            <Component {...this.props}/>
          </TabNavigator.Item>
  }
  render() {
    AsyncStorage.clear(error=>{});
    return (
      <View style={styles.container}>
        <TabNavigator>         
          {this._renderTab(PopularPage,'tb_polular',"最热",require('../../res/images/ic_polular.png'))}
          {this._renderTab(TrendingPage,'tb_trending',"趋势",require('../../res/images/ic_trending.png'))}
          {this._renderTab(WebViewTest,'tb_favorite',"收藏",require('../../res/images/ic_favorite.png'))}
          {this._renderTab(MyPage,'tb_my',"我的",require('../../res/images/ic_my.png'))}
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
