import React, { Component } from 'react';
import ReactNative from 'react-native';
const {View,Text,TextInput,StyleSheet} = ReactNative;
import NavigationBar from '../common/NavigationBar';
import HomePage from './HomePage';
import DataRepository from '../expand/dao/DataRepository';
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
export default class PopularPage extends Component {
	constructor(props){
	    super(props);
	    this.dataRepository=new DataRepository();
	    this.state={
	    	result:''
	    }
	}
	onLoad(){
		let url = this.genUrl(this.text);
		this.dataRepository.fetchNetRepository(url)
			.then(result=> {
				this.setState({
					result:JSON.stringify(result)
				});
			})
			.catch(error=>{
				this.setState({
					result:JSON.stringify(error)
				});
			})
	}
	genUrl(key){
		return URL+key+QUERY_STR;
	}
	render() {
		return (
			<View style={styles.container}>
				<NavigationBar
					title={'最热'}
				/>
				<Text 
					onPress={()=>{
						this.onLoad()
					}}
				style={styles.text}>获取数据</Text>
				<TextInput 
					style={{height: 40,borderWidth: 1}}
					underlineColorAndroid={'transparent'}
					onChangeText={text => this.text=text}
				/>
				<Text style={{height:500}}>{this.state.result}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	text: {
		fontSize: 20,
	}
});
