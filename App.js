import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import List from './src/pages/list'
import MultiSelectList from './src/pages/flatList'
import TextInput from './src/pages/textInput'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerBackTitle: null
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details', {
            itemId: 86
          })}
        />
        <Button
          title="Go to List"
          onPress={() => this.props.navigation.navigate('list', {
            itemId: 86
          })}
        />
        <Button
          title="Go to TextInput"
          onPress={() => this.props.navigation.navigate('TextInput')}
        />
        
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Detail',
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>
          itemId: {navigation.getParam('itemId', 'NO-ID')}
        </Text>
        <Button
          title="Go to other"
          onPress={() => this.props.navigation.replace('other')}
        />
        <Button
          title="GoBack"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

class otherScreen extends React.Component {
  static navigationOptions = {
    title: 'otherScreen',
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>otherScreen</Text>
        <Text>
          itemId: {navigation.getParam('itemId', 'NO-ID')}
        </Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Button
          title="GoBack"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
const switchA = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: DetailsScreen,
    other: otherScreen,
    list: {
      screen: List,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    TextInput: TextInput
    // FLatList: MultiSelectList
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      // headerTintColor: '#fff',
      headerStyle: {
        // backgroundColor: '#000',
      },
      // tabBarLabel: 'Home!',
      // gesturesEnabled: false
    },
  }
);

const AppNavigator = createSwitchNavigator({
  switchA: switchA
})

export default createAppContainer(AppNavigator);