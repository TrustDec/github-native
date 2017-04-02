import React, { Component } from 'react';
import ReactNative from 'react-native';
const {View,Text,StyleSheet} = ReactNative;
import NavigationBar from '../common/NavigationBar';
import HomePage from './HomePage';
export default class WelcomePage extends Component {
	constructor(props){
	    super(props);
	}
	componentDidMount(){
		setTimeout(()=>{
			this.timer=this.props.navigator.resetTo({
				component: HomePage
			})
		},2000);
	}
	componentWillUmount(){
		this.timer&&clearTimeout(this.timer)
	}
	render() {
		return <View style={styles.container}>
			<NavigationBar
				title={'欢迎'}
			/>
			<Text style={styles.text}>欢迎</Text>
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
