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
        <Button title="Go to A1" onPress={() => this.props.navigation.navigate('A1')}></Button>
      </View>
    )
  }
}



