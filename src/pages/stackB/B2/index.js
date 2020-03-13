import React from 'react';
import { View, Button, Text } from 'react-native';

export default class B2 extends React.Component {
  componentDidMount() {
    console.log('B2 componentDidMount')
  }
  componentWillUnmount() {
    console.log('B2 componentWillUnmount')
  }
  render() {
    return (
      <View>
        <Text>B2</Text>
        <Button title="Go to A1" onPress={() => this.props.navigation.navigate('A1')}></Button>
      </View>
    )
  }
}



