import React, { Component } from 'react';
import ReactNative from 'react-native';

const {View,Text,Image,StyleSheet,TouchableOpacity} = ReactNative;

import NavigationBar from './NavigationBar';
import HttpUtils from './HttpUtils';
export default class FetchTest extends Component {
  constructor(props){
    super(props);
    this.state={
      result: ''
    }
  }
  onLoad(url){
    // fetch(url)
    //   .then(response=>response.json())
    //   .then(result=>{
    //     this.setState({
    //       result: JSON.stringify(result)
    //     })
    //   })
    //   .catch(error=>{
    //     this.setState({
    //       result: JSON.stringify(result)
    //     })
    //   })
    HttpUtils.get(url)
      .then(result=>{
        this.setState({
         result: JSON.stringify(result)
        })
      })
      .catch(error=>{
        this.setState({
          result: JSON.stringify(result)
        })
      })
  }
  onSubmit(url,data){
    /*fetch(url,{
      method: 'POST',
      header: {
        'Accept':'application/json',
        'Comtent-Type':'application/json'
      },
      body:JSON.stringify(data)
    })
      .then(response=>response.json())
      .then(result=>{
        this.setState({
          result: JSON.stringify(result)
        })
      })
      .catch(error=>{
        this.setState({
          result: JSON.stringify(result)
        })
      })*/
    HttpUtils.post(url,data)
      .then(result=>{
        this.setState({
         result: JSON.stringify(result)
        })
      })
      .catch(error=>{
        this.setState({
          result: JSON.stringify(result)
        })
      })
  }
  render() {
  	return(
  		<View style={styles.container}>
        <NavigationBar
          title={ 'Fetch的使用' }
        />
        <Text style={styles.text} onPress={()=>{
          this.onLoad('http://rap.taobao.org/mockjsdata/16463/test')
        }}>获取数据</Text>
        <Text style={styles.text} onPress={()=>{
          this.onSubmit('http://rap.taobao.org/mockjsdata/16463/submit',{userName:'小米',password:'123456'})
        }}>提交数据</Text>
        <Text>返回结果:{this.state.result}</Text>
  		</View>
  	);
  }
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
    backgroundColor: '#fff',
	},
	text: {
		fontSize: 18,
	}
});