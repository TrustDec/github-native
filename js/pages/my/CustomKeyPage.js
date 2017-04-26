import React, { Component } from 'react';
import ReactNative from 'react-native';
import CheckBox from 'react-native-check-box'
const {Alert,View,Text,Image,TouchableOpacity,ScrollView,StyleSheet} = ReactNative;
import NavigationBar from '../../common/NavigationBar';
import ViewUtils from '../../util/ViewUtils';
import ArrayUtils from '../../util/ArrayUtils';
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
export default class CustomKeyPage extends Component {
	constructor(props){
	    super(props);
	    this.LanguageDao=new LanguageDao(FLAG_LANGUAGE.flag_key);
		this.isRemoveKey=this.props.isRemoveKey?true:false;
	    this.chanageValues=[];
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
		if (this.chanageValues.length===0) {
			this.props.navigator.pop();
			return;			
		}
		for (let i = 0,l=this.chanageValues.length; i < l; i++) {
			ArrayUtils.remove(this.state.dataArray,this.chanageValues[i]);
		}
		this.LanguageDao.save(this.state.dataArray);
		this.props.navigator.pop();
	}
	renderView(){
		if(!this.state.dataArray || this.state.dataArray.length === 0) return null;
		let len = this.state.dataArray.length;
		let views =[];
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
						{this.renderCheckBox(this.state.dataArray[len-1])}
					</View>
					<View style={styles.line}></View>
				</View>
			);
		return views;
	}
	onClick(data){
		if(!this.isRemoveKey) data.checked=!data.checked;
		ArrayUtils.updateArray(this.chanageValues,data);
	}
	renderCheckBox(data){
		let leftText =data.name;
		let isChecked = this.isRemoveKey ? false : data.checked;
		return(
			<CheckBox
				style={{flex:1,padding:10}}
				onClick={()=>this.onClick(data)}
				leftText={leftText}
				isChecked={isChecked}
				checkedImage={<Image style={{tintColor:'#6495ED'}}
					source={require("./img/ic_check_box.png")}/>}
				unCheckedImage={<Image style={{tintColor:'#6495ED'}}
					source={require("./img/ic_check_box_outline_blank.png")}/>}
			/>
		);
	}
	onBack=()=>{
		if (this.chanageValues.length===0) {
			this.props.navigator.pop();
			return
		}
		Alert.alert(
			'提示',
			'要保存修改吗?',
			[
				{text:'不保存',onPress:()=>{
					this.props.navigator.pop();
				},style:'cancel'},
				{text:'保存',onPress:()=>{this.onSave()}}
			]
		);
	}
	render() {
		let title = this.isRemoveKey?'标签删除':'自定义标签';
		let rightButtonTitle = this.isRemoveKey?'移除':'保存';
		let rightButton =<TouchableOpacity
			onPress={()=>this.onSave()}
		>
			<View style={{margin:10}}>
				<Text style={styles.title}>{rightButtonTitle}</Text>
			</View>
		</TouchableOpacity>
		return <View style={styles.container}>
			<NavigationBar
				title={title}
				style={{backgroundColor: '#6495ED'}}
				leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
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
		height:StyleSheet.hairlineWidth,
		backgroundColor:"darkgray"
	},
	item:{
		flexDirection:'row',
		alignItems:'center'
	}
});
