import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import A1 from './src/pages/stackA/A1';
import A2 from './src/pages/stackA/A2';
import A3 from './src/pages/stackA/A3';
import B1 from './src/pages/stackB/B1';
import B2 from './src/pages/stackB/B2';
import Other from './src/pages/stackOther/Other';
import List from './src/pages/stackOther/List'
import TextInput from './src/pages/stackOther/TextInput'
import Calendar from './src/pages/stackOther/Calendar'
import Emotion from './src/pages/stackOther/Emotion/index'
import Emotion1 from './src/pages/stackOther/Emotion/emotion1'
import Emotion2 from './src/pages/stackOther/Emotion/emotion2'
import Claim from './src/pages/stackOther/Claim/index'
import LifeCycle from './src/pages/stackOther/LifeCycle/index'
import GetDerivedStateFromProps from './src/pages/stackOther/LifeCycle/getDerivedStateFromProps'
import GetSnapshotBeforeUpdate from './src/pages/stackOther/LifeCycle/getSnapshotBeforeUpdate'
import SetState from './src/pages/stackOther/LifeCycle/setState'
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import { Animated } from 'react-native';

const TransitionConfiguration = () => ({
  transitionSpec: {
    timing: Animated.timing,
  },
  screenInterpolator: (sceneProps: { scene: any; }) => {
    const { scene } = sceneProps;
    const { route } = scene;
    const params = route.params || {};
    const transition = params.transition || 'forHorizontal';
    return StackViewStyleInterpolator[transition](sceneProps);
  },
});
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    // headerBackTitle: null
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to StackOther"
          onPress={() => this.props.navigation.navigate('StackOther')}
        />
        <Button
          title="Go to StackA"
          onPress={() => this.props.navigation.navigate('StackA')}
        />
        <Button
          title="Go to StackB"
          onPress={() => this.props.navigation.navigate('StackB')}
        />
      </View>
    );
  }
}

const StackA = createStackNavigator(
  {
    A1: A1,
    A2: A2,
    A3: A3
  },
  {
    initialRouteName: 'A1',
    defaultNavigationOptions: {
      // headerTintColor: '#fff',
      headerStyle: {
        // backgroundColor: '#000',
      },
      transitionConfig: TransitionConfiguration,
    },
  }
);
const StackB = createStackNavigator(
  {
    B1: B1,
    B2: B2
  },
  {
    initialRouteName: 'B1',
    defaultNavigationOptions: {
      // headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: 'blue',
      },
    },
  }
);
const StackOther = createStackNavigator(
  {
    Other,
    List,
    TextInput,
    Calendar,
    Emotion,
    Emotion1,
    Emotion2,
    Claim,
    LifeCycle,
    GetDerivedStateFromProps,
    GetSnapshotBeforeUpdate,
    SetState,
  },
  {
    initialRouteName: 'Other',
    defaultNavigationOptions: {
      // headerTintColor: '#fff',
      headerStyle: {
        // backgroundColor: '#000',
      },
    },
  }
);

/* const AppNavigator = createSwitchNavigator({
  HomeScreen: HomeScreen,
  StackA: StackA,
  StackB: StackB,
  StackOther: StackOther
}) */
const AppNavigator = createStackNavigator({   // 一样跨栈的
  HomeScreen: HomeScreen,
  StackA: StackA,
  StackB: StackB,
  StackOther: StackOther
})

export default createAppContainer(AppNavigator);