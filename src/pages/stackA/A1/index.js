import React from 'react';
import { View, Button, Text, BackHandler } from 'react-native';

export default class A1 extends React.Component {
  componentDidMount() {
    console.log('A1 componentDidMount')
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    this.didFocus = this.props.navigation.addListener('didFocus', () => {
      // console.log('didFocus')
    })
    this.willBlur = this.props.navigation.addListener('willBlur', () => {
      // console.log('willBlur')
    })
  }
  handleBackPress = () => {
    // this.props.navigation.goBack();
    // return true;
  }
  componentWillUnmount() {
    console.log('A1 componentWillUnmount')
    this.didFocus && this.didFocus.remove();
    this.willBlur && this.willBlur.remove();
    BackHandler.removeEventListener(this.handleBackPress)
  }
  render() {
    return (
      <View>
        <Text>A1</Text>
        <Button title="Go to A2" onPress={() => this.props.navigation.navigate('A2')}></Button>
        <Button title="Go to B2" onPress={() => this.props.navigation.navigate('B2')}></Button>
      </View>
    )
  }
}



