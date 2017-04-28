import React, { Component } from 'react';
import ReactNative from 'react-native';
const {View,Text,ListView,StyleSheet,RefreshControl,DeviceEventEmitter} = ReactNative;
import NavigationBar from '../common/NavigationBar';
import HomePage from './HomePage';
import RepositoryDetail from './RepositoryDetail';
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
						return lan.checked?<PopularTab key={i} tabLabel={lan.name} {...this.props}/>:null;
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
			.fetchRepository(url)
			.then(result=> {
				let items = result && result.items? result.items : result?result:[]
				this.setState({
					dataSource:this.state.dataSource.cloneWithRows(items),
					isLoading: false
				});
				if (result && result.update_date && !this.dataRepository.checkedData(result.update_date)) {
					DeviceEventEmitter.emit('showToast','数据过时');
					return this.dataRepository.fetchNetRepository(url);
				}else{
					DeviceEventEmitter.emit('showToast','显示缓存数据');
				}
			})
			.then(items=>{
				if (!items || items.length===0) return;
				this.setState({
					dataSource:this.state.dataSource.cloneWithRows(items),
					isLoading: false
				});
				DeviceEventEmitter.emit('showToast','显示网络数据');
			})
			.catch(error=>{
				console.log(error);
				this.setState({
					isLoading:false
				});
			})
	}
	genUrl(key){
		return URL+key+QUERY_STR;
	}
	onSelect(item){
		this.props.navigator.push({
			component:RepositoryDetail,
			params:{
				item:item,
				...this.props
			}
		});
	}
	renderRow(data){
		return <RepositoryCell data={data} onSelect={()=>this.onSelect(data)} {...this.props}/>
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
