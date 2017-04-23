import React, { Component } from 'react';
import ReactNative from 'react-native';
const {View,Text,ListView,StyleSheet,RefreshControl} = ReactNative;
import NavigationBar from '../common/NavigationBar';
import HomePage from './HomePage';
import DataRepository from '../expand/dao/DataRepository';
import RepositoryCell from '../common/RepositoryCell';
import LanguageDao,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
export default class PopularPage extends Component {
	constructor(props){
	    super(props);
	    this.languageDao=new LanguageDao(FLAG_LANGUAGE.flag_key);
	    this.state={
	    	languages:[]
	    }
	}
	componentDidMount(){
		this.loadData();
	}
	loadData(){
		this.languageDao.fetch()
			.then(result=>{
				this.setState({
					languages:result
				});
			})
			.catch(error=>{
				console.log(error);
			})
	}
	render() {
		let content = this.state.languages.length>0?
				<ScrollableTabView
					renderTabBar={()=><ScrollableTabBar/>}
					tabBarBackgroundColor='#2196f3'
					tabBarActiveTextColor='white'
					tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
					tabBarInactiveTextColor="mintcream"
				>
					{this.state.languages.map((result,i,arr)=>{
						let lan = arr[i];
						return lan.checked?<PopularTab key={i} tabLabel={lan.name}/>:null;
					})}
				</ScrollableTabView>:null;
		return <View style={styles.container}>
				<NavigationBar
					title={'最热'}
					statusBar={{
						backgroundColor: '#2196f3'
					}}
				/>
				{content}
			</View>
	}
}
class PopularTab extends Component {
	constructor(props){
	    super(props);
	    this.dataRepository=new DataRepository();
	    this.state={
	    	result:'',
	    	dataSource: new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2}),
	    	isLoading: false
	    }
	}
	componentDidMount(){
		this.loadData();
	}
	loadData(){
		this.setState({
			isLoading: true
		});
		let url = this.genUrl(this.props.tabLabel);
		this.dataRepository
			.fetchNetRepository(url)
			.then(result=> {
				this.setState({
					dataSource:this.state.dataSource.cloneWithRows(result.items),
					isLoading: false
				});
			})
			.catch(error=>{
				console.log(error);
			})
	}
	genUrl(key){
		return URL+key+QUERY_STR;
	}
	renderRow(data){
		return <RepositoryCell data={data}/>
	}
	render(){
		return <View style={{flex:1}}>
			<ListView
				dataSource={this.state.dataSource}
				renderRow={(data)=> this.renderRow(data)}
				refreshControl={
					<RefreshControl
						refreshing={this.state.isLoading}
						onRefresh={()=>this.loadData()}
						colors={['#2196f3']}
						tintColor={'#2196f3'}
						title={'Loading...'}
						titleColor={'#2196f3'}
					/>
				}
			/>
		</View>;
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
