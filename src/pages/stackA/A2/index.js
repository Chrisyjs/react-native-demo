import React from 'react';
import { View, Button, Text, BackHandler } from 'react-native';

export default class A2 extends React.Component {
  componentDidMount() {
    console.log('A2 componentDidMount')
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    this.didFocus = this.props.navigation.addListener('didFocus', () => {
      console.log('didFocus')
    })
    this.willBlur = this.props.navigation.addListener('willBlur', () => {
      console.log('willBlur')
    })
  }
  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  }
  componentWillUnmount() {
    console.log('A2 componentWillUnmount')
    this.didFocus && this.didFocus.remove();
    this.willBlur && this.willBlur.remove();
    BackHandler.removeEventListener(this.handleBackPress)
  }
  render() {
    return (
      <View>
        <Text>A2</Text>
        <Button title="Go to A3" onPress={() => this.props.navigation.navigate('A3')}></Button>
      </View>
    )
  }
}



