import React from 'react';
import { View, Button, Text } from 'react-native';

export default class A1 extends React.Component {
  componentDidMount() {
    console.log('A1 componentDidMount')
  }
  componentWillUnmount() {
    console.log('A1 componentWillUnmount')
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



