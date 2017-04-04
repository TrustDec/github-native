import React, { Component } from 'react';
import ReactNative from 'react-native';
const {View,Text,TouchableOpacity,ScrollView,StyleSheet} = ReactNative;
import NavigationBar from '../../common/NavigationBar';
import ViewUtils from '../../util/ViewUtils';
export default class CustomKeyPage extends Component {
	constructor(props){
	    super(props);
	}
	onSave(){
		this.props.navigator.pop();
	}
	render() {
		let righButton =<TouchableOpacity
			onPress={()=>this.onSave()}
		>
			<View style={{margin:10}}>
				<Text style={styles.title}>保存</Text>
			</View>
		</TouchableOpacity>
		return <View style={styles.container}>
			<NavigationBar
				title={'自定义标签'}
				style={{backgroundColor: '#6495ED'}}
				leftButton={ViewUtils.getLeftButton(()=>this.onSave())}
				righButton={righButton}
			/>
			<ScrollView>
				
			</ScrollView>
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
	},
	title: {
		color:'white',
		fontSize: 20
	}
});
