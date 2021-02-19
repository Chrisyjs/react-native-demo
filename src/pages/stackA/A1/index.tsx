import React from 'react';
import { View, Button, Text, BackHandler, SafeAreaView } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import MyNavigationEvents from 'src/components/myNavigationEvents'

export default class A1 extends React.Component {
  componentDidMount() {
    console.log('A1 componentDidMount')
  }
  handleBackPress = () => {
    console.log('handleBackPress')
  }
  didFocus = () => {
    console.log('didFocus', 'A1')
  }
  willBlur = () => {
    console.log('willBlur', 'A1')
  }
  componentWillUnmount() {
    console.log('A1 componentWillUnmount')
  }
  render() {
    return (
      <SafeAreaView>
        {/* <NavigationEvents
          onWillBlur={this.willBlur}
          onDidFocus={this.didFocus}
        > */}
        <MyNavigationEvents
          onDidFocus={this.didFocus}
          onWillBlur={this.willBlur}
          hardwareBackPress={this.handleBackPress}
        >
          <Text>A1</Text>
          <Button title="Go to A2" onPress={() => this.props.navigation.navigate('A2')}></Button>
          <Button title="Go to B2" onPress={() => this.props.navigation.navigate('B2')}></Button>
        </MyNavigationEvents>
        {/* </NavigationEvents> */}
      </SafeAreaView>
    )
  }
}



