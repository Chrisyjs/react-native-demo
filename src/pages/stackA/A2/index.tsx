import React from 'react';
import { View, Button, Text, BackHandler, SafeAreaView } from 'react-native';
import { NavigationEvents } from 'react-navigation';

export default class A2 extends React.Component {
  componentDidMount() {
    console.log('A2 componentDidMount')
    /* this.didFocus = this.props.navigation.addListener('didFocus', () => {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
      console.log('didFocus', 'A2')
    })
    this.willBlur = this.props.navigation.addListener('willBlur', () => {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
      console.log('willBlur', 'A2')
    }) */
  }
  handleBackPress = () => {
    this.props.navigation.goBack();
    console.log('handleBackPress A2')
    return true;
  }
  didFocus = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    console.log('didFocus', 'A2')
  }
  willBlur = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    console.log('willBlur', 'A2')
  }
  componentWillUnmount() {
    console.log('A2 componentWillUnmount')
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }
  render() {
    return (
      <SafeAreaView >
        <NavigationEvents
          onWillBlur={this.willBlur}
          onDidFocus={this.didFocus}
        ></NavigationEvents>
        <Text>A2</Text>
        <Button title="Go to A3" onPress={() => this.props.navigation.navigate('A3')}></Button>
      </SafeAreaView>
    )
  }
}



