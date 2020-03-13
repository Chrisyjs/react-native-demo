import React from 'react';
import { View, Button, Text } from 'react-native';

export default class B1 extends React.Component {
  componentDidMount() {
    console.log('B1 componentDidMount')
  }
  componentWillUnmount() {
    console.log('B1 componentWillUnmount')
  }
  render() {
    return (
      <View>
        <Text>B1</Text>
        <Button title="Go to B2" onPress={() => this.props.navigation.navigate('B2')}></Button>
      </View>
    )
  }
}



