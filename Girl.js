import React, { Component } from 'react';
import ReactNative from 'react-native';

const {View,Text,Image,StyleSheet,TouchableOpacity} = ReactNative;

import NavigationBar from './js/common/NavigationBar';

export default class Girl extends Component {
  constructor(props){
    super(props);
    this.state={
      word: ''
    }
  }
  renderButton(image) {
    return <TouchableOpacity
      onPress={()=>{
        this.props.navigator.pop()
      }}
      >
      <Image style={styles.back_pop} source={image}/>
    </TouchableOpacity>
  }
  render() {
  	return(
  		<View style={styles.container}>
        <NavigationBar
          title={ 'Girl' }
          style={{ backgroundColor: '#ee6363' }}
          leftButton={this.renderButton(require('./res/images/ic_arrow_back_white_36pt.png'))}
          rightButton={this.renderButton(require('./res/images/ic_star.png'))}
        />
        <Text style={styles.text}>I am Girl</Text>
        <Text style={styles.text}>我收到了男孩送的:{this.props.word}</Text>
        <Text style={styles.text}
          onPress={()=>{
            this.props.onCallBack('一盒巧克力');
            this.props.navigator.pop();
          }}
        >
        回赠巧克力
        </Text>
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
		fontSize: 18,
	},
  back_pop: {
    width: 22,
    height: 22,
    margin: 5
  }
});