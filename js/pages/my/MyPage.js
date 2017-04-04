import React, { Component } from 'react';
import ReactNative from 'react-native';
const {View,Text,StyleSheet} = ReactNative;
import NavigationBar from '../../common/NavigationBar';
import HomePage from '../HomePage';
import CustomKeyPage from './CustomKeyPage';
export default class MyPage extends Component {
	constructor(props){
	    super(props);
	}
	render() {
		return <View style={styles.container}>
			<NavigationBar
				title={'我的'}
			/>
			<Text 
				style={styles.text}
				onPress={()=>{
					this.props.navigator.push({
						component:CustomKeyPage,
						params: {...this.props}
					});
				}}
			>自定义标签页</Text>
		</View>
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
