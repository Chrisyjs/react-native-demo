import React from 'react';
import { View, Button, Text } from 'react-native';

export default class A3 extends React.Component {
  componentDidMount() {
    console.log('A3 componentDidMount')
  }
  componentWillUnmount() {
    console.log('A3 componentWillUnmount')
  }
  render() {
    return (
      <View>
        <Text>A3</Text>
        <Button title="Navigte to A1" onPress={() => this.props.navigation.navigate('A1')}></Button>
        <Button title="Replace to A1" onPress={() => this.props.navigation.replace('A1')}></Button>
        <Button title="PopToTop to A1" onPress={() => this.props.navigation.popToTop()}></Button>
      </View>
    )
  }
}



