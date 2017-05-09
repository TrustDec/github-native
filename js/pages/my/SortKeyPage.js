import React, { Component } from 'react';
import ReactNative from 'react-native';
const {View,Text,StyleSheet} = ReactNative;
import NavigationBar from '../../common/NavigationBar';
import LanguageDao,{ FLAG_LANGUAGE } from '../../expand/dao/LanguageDao';
import ArrayUtils from '../../util/ArrayUtils';
import SortableListView from 'react-native-sortable-listview';
export default class SortKeyPage extends Component {
	constructor(props){
		super(props);
		this.dataArray=[];
		this.sortResultArray=[];
		this.originalCheckedArray=[];
		this.state = {
			checkedArray: []
		}
	}
	componentDidMount(){
		this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
		this.loadData();
	}
	loadData(){
		this.languageDao.fetch()
			.then(result=>{
				console.log(result);
				this.getCheckedItems(result)
			})
			.catch(error=>{
				console.log(error)
			})
	}
	getCheckedItems(result){
		this.dataArray = result;
		let checkedArray = [];
		for (let i = 0,len=result.length; i < len; i++) {
			let data = result[i];
			if (data.checked) checkedArray.push(data)
		}
		this.setState({
			checkedArray:checkedArray,
		});
		this.originalCheckedArray = ArrayUtils.clone(checkedArray);
	}
	render(){
		console.log(this.state.checkedArray);
		return(
			<View style={{flex:1}}>
				<NavigationBar title={"我的"}/>
				<SortableListView
					style={{flex:1}}
					data={this.state.checkedArray}
					order={Object.keys(this.state.checkedArray)}
					onRowMoved={e=>{
						order.splice(e.to,0,this.state.checkedArray.splice(e.from,1)[0]);
						this.forceUpdate();
					}}
					renderRow={row => <SortCell data={row}/> }
				/>
			</View>
		);
	}
}
class SortCell extends Component{
	render(){
		return(
			<View>
				<Text>{this.props.data.name}</Text>
			</View>
		);
	}
}