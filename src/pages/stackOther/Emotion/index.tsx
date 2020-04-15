import React from 'react';
import { View, Button, Text } from 'react-native';


export default class Other extends React.Component {
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <View>
        <Text>Emotion</Text>
        <Button title="Go to emotion1" onPress={() => this.props.navigation.navigate('Emotion1')}></Button>
        <Button title="Go to emotion2" onPress={() => this.props.navigation.navigate('Emotion2')}></Button>
      </View>
    )
  }
}



