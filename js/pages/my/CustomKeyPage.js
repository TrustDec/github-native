import React, { Component } from 'react';
import ReactNative from 'react-native';
import CheckBox from 'react-native-check-box'
const {View,Text,Image,TouchableOpacity,ScrollView,StyleSheet} = ReactNative;
import NavigationBar from '../../common/NavigationBar';
import ViewUtils from '../../util/ViewUtils';
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
export default class CustomKeyPage extends Component {
	constructor(props){
	    super(props);
	    this.LanguageDao=new LanguageDao(FLAG_LANGUAGE.flag_key);
	    this.state={
	    	dataArray:[]
	    }
	}
	componentDidMount(){
		this.loadData();
	}
	loadData(){
		this.LanguageDao.fetch()
			.then(result=>{
				this.setState({
					dataArray:result
				});
			})
			.catch(error=>{
				console.log(error);
			})
	}
	onSave(){
		this.props.navigator.pop();
	}
	renderView(){
		if(!this.state.dataArray || this.state.dataArray.length === 0) return null;
		let len = this.state.dataArray.length;
		let views =[];1
		for (let i = 0,l=len-2;i<l; i+=2) {
			views.push(
				<View key={i}>
					<View style={styles.item}>
						{this.renderCheckBox(this.state.dataArray[i])}
						{this.renderCheckBox(this.state.dataArray[i+1])}
					</View>
					<View style={styles.line}></View>
				</View>
			);
		}
		views.push(
				<View key={len-1}>
					<View style={styles.item}>
						{len%2===0?<Text>{this.renderCheckBox(this.state.dataArray[len-2])}</Text>:null}
						<Text>{this.renderCheckBox(this.state.dataArray[len-1])}</Text>
					</View>
					<View style={styles.line}></View>
				</View>
			);
		return views;
	}
	onClick(data){

	}
	renderCheckBox(data){
		let leftText =data.name;
			return (
				<Text>{leftText}</Text>
			);
	}
	render() {
		let rightButton =<TouchableOpacity
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
				rightButton={rightButton}
			/>
			<ScrollView>
				{this.renderView()}
			</ScrollView>
		</View>
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	tips:{
		fontSize: 29,
	},
	text: {
		fontSize: 20,
	},
	title: {
		color:'white',
		fontSize: 20
	},
	line: {
		height:1,
		backgroundColor:"black"
	},
	item:{
		flexDirection:'row',
		alignItems:'center'
	}
});
