import React from 'react';
import { View, Button, Text } from 'react-native';

export default class A2 extends React.Component {
  componentDidMount() {
    console.log('A2 componentDidMount')
  }
  componentWillUnmount() {
    console.log('A2 componentWillUnmount')
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



