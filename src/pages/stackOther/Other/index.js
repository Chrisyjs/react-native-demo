import React from 'react';
import { View, Button, Text } from 'react-native';

export default class Other extends React.Component {
  componentDidMount() {
    console.log('Other componentDidMount')
  }
  componentWillUnmount() {
    console.log('Other componentWillUnmount')
  }
  render() {
    return (
      <View>
        <Text>Other</Text>
        <Button title="Go to List" onPress={() => this.props.navigation.navigate('List')}></Button>
        <Button title="Go to TextInput" onPress={() => this.props.navigation.navigate('TextInput')}></Button>
        <Button title="Go to Calendar" onPress={() => this.props.navigation.navigate('Calendar')}></Button>
        <Button title="Go to Emotion" onPress={() => this.props.navigation.navigate('Emotion')}></Button>
        <Button title="Go to LifeCycle" onPress={() => this.props.navigation.navigate('LifeCycle')}></Button>
        <Button title="Go to Claim" onPress={() => this.props.navigation.navigate('Claim')}></Button>
      </View>
    )
  }
}



