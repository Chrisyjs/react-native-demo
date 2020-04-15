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
        <Text>LifeCycle</Text>
        <Button title="Go to getDerivedStateFromProps" onPress={() => this.props.navigation.navigate('GetDerivedStateFromProps')}></Button>
        <Button title="Go to getSnapshotBeforeUpdate" onPress={() => this.props.navigation.navigate('GetSnapshotBeforeUpdate')}></Button>
      </View>
    )
  }
}



