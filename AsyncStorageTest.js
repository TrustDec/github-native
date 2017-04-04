import React, { Component } from 'react';
import ReactNative from 'react-native';
const {View,Text,StyleSheet,TextInput,AsyncStorage} = ReactNative;
import Girl from './Girl';
import NavigationBar from './js/common/NavigationBar';
import Toast,{DURATION} from 'react-native-easy-toast';
const KEY = 'text';
export default class AsyncStorageTest extends Component {
  constructor(props){
    super(props);
  }
  onSave(){
    AsyncStorage.setItem(KEY,this.text,(error)=>{
      if (!error) {
        this.toast.show('保存成功',DURATION.LENGTH_LONG);
      }else{
        this.toast.show('保存失败',DURATION.LENGTH_LONG);
      }
    });
  }
  onRemove(){
     AsyncStorage.removeItem(KEY,(error)=>{
      if (!error) {
        this.toast.show('移除成功',DURATION.LENGTH_LONG);
      }else{
        this.toast.show('移除失败',DURATION.LENGTH_LONG);
      }
     });
  }
  onFetch(){
    AsyncStorage.getItem(KEY,(error,result)=>{
      if (!error) {
        if (result !== '' && result !== null) {
          this.toast.show(`取出的内容为:${result}`,DURATION.LENGTH_LONG);
        }else{
          this.toast.show('取出内容不存在',DURATION.LENGTH_LONG);
        }
      }else{
        this.toast.show('取出失败',DURATION.LENGTH_LONG);
      }
    });
  }
  render() {
  	return(
  		<View style={styles.container}>
  			<NavigationBar 
  				title={"AsyncStorage的使用"}
  				statusBar={{ backgroundColor: '#2196f3'}}
  				style={{ backgroundColor: '#2196f3' }}
  			/>
        <TextInput
          style={{borderWidth: 1,height: 40,margin:5}}
          underlineColorAndroid={'transparent'}
          onChangeText={text=>this.text=text}
        />
        <View style={{flexDirection: 'row'}}>
    			<Text style={styles.text}
            onPress={()=>this.onSave()}>保存</Text>
          <Text style={styles.text}
            onPress={()=>this.onRemove()}>移除</Text>
          <Text style={styles.text}
            onPress={()=>this.onFetch()}>取出</Text>
        </View>
        <Toast ref={Toast=>this.toast=Toast}/>
  		</View>
  	);
  }
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	text: {
		fontSize: 20,
    margin:5
	}
});