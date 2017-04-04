import React, { Component } from 'react';
import ReactNative from 'react-native';
const {View,Text,Image,StyleSheet,TouchableOpacity} = ReactNative;
export default class ViewUtils {
	static getLeftButton(callback){
		return 	<TouchableOpacity
					style={styles.leftButton}
					onPress={callback}
				>
					<Image style={styles.back_pop} source={require('../../res/images/ic_arrow_back_white_36pt.png')}/>
				</TouchableOpacity>
	}
}

const styles = StyleSheet.create({
	leftButton:{
		padding: 8
	},
	back_pop: {
		width: 26,
		height: 26,
		tintColor: 'white'
	}
});