import React, { Component } from 'react';
import ReactNative from 'react-native';

const {View,Text,Image,ListView,RefreshControl,StyleSheet,TouchableOpacity} = ReactNative;
import Toast, {DURATION} from 'react-native-easy-toast';

import NavigationBar from './js/common/NavigationBar';
import data from './list.json';

export default class ListViewTest extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});
    this.state={
      word: '',
      dataSource: ds.cloneWithRows(data.result),
      isLoading:true
    }
    this.onLoad();
  }
  renderRow(item){
    return <View style={styles.row}>
      <TouchableOpacity
        onPress={()=>{
          this.toast.show('你单击了:'+item.fullName,DURATION.LENGTH_LONG)
        }}
      >
        <Text style={styles.tips}>{item.email}</Text>
        <Text style={styles.tips}>{item.fullName}</Text>
      </TouchableOpacity>
    </View>
  }
  renderSeparator(sectionID, rowID, adjacentRowHighlighted){
    return <View style={styles.line} key={rowID}></View>
  }
  renderFooter(){
    return <Image style={{width:400,height:100}} source={{uri:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491764240&di=18e15e27e8211aeaffd30d9b1d35a1e3&imgtype=jpg&er=1&src=http%3A%2F%2Fi.k1982.com%2Fdesign_img%2Fid17%2F200982521183050177807.jpg'}}/>
  }
  onLoad(){
    setTimeout(()=>{
      this.setState({
        isLoading: false
      });
    },2000);
  }
  render() {
  	return(
  		<View style={styles.container}>
        <NavigationBar
          title={ 'ListViewTest' }
          statusBar={{
            backgroundColor: 'gray'
          }}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(item)=> this.renderRow(item)}
          renderSeparator={(sectionID, rowID, adjacentRowHighlighted)=>this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
          renderFooter={()=>this.renderFooter()}
          refreshControl={<RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={()=>this.onLoad()}
          />}

        />
        <Toast ref={toast=>this.toast=toast}/>
  		</View>
  	);
  }
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
    backgroundColor: '#fff',
	},
  tips: {
    fontSize: 18,
  },
  row: {
    height: 50
  },
  line:{
    height:1,
    backgroundColor: 'black'
  }
});