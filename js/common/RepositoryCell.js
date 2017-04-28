import React, { Component } from 'react';
import ReactNative from 'react-native';
const {View,Text,Image,TextInput,StyleSheet,TouchableOpacity} = ReactNative;

export default class RepositoryCell extends Component {
	constructor(props){
	    super(props);
	}
	render(){
		const {full_name,description,owner,stargazers_count} = this.props.data;
		return <TouchableOpacity 
		onPress={this.props.onSelect}
		style={styles.container}>
			<View style={styles.cell_container}>
				<Text style={styles.title}>{full_name}</Text>
				<Text style={styles.description}>{description}</Text>
				<View style={{flexDirection:'row',justifyContent:'space-between'}}>
					<View style={{flexDirection:'row',alignItems: 'center'}}>
						<Text>Author:</Text>
						<Image
							style={{height:22,width:22}}
							source={{uri:owner.avatar_url}}
						/>
					</View>
					<View style={{flexDirection:'row',alignItems: 'center'}}>
						<Text>Starts:</Text>
						<Text>{stargazers_count}</Text>
					</View>
					<Image style={{width: 22,height: 22}} source={require('../../res/images/ic_star.png')}/>
				</View>
			</View>
		</TouchableOpacity>
	}
}
const styles = StyleSheet.create({
	container:{
		flex: 1
	},
	title: {
		fontSize: 16,
		marginBottom: 2,
		color: '#212121'
	},
	description: {
		fontSize: 14,
		color:'#757575',
		marginBottom: 2,
		borderRadius: 2
	},
	cell_container: {
		margin:10,
		backgroundColor: 'white',
		padding:10,
		marginLeft: 5,
		marginRight: 5,
		marginVertical: 3,
		borderColor: '#ddd',
		borderWidth: 0.5,
		shadowColor: 'gray',
		shadowOffset: {width:0.5,height:0.5},
		shadowOpacity: 0.4,
		shadowRadius: 1,
		elevation: 2
	}
});