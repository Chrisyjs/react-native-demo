import React from 'react';
import { View, Button, Text, BackHandler, SafeAreaView } from 'react-native';
import { withNavigation } from 'react-navigation'

class MyNavigationEvents extends React.Component {
  private didFocus: any = null
  private willBlur: any = null
  private back: any = null
  constructor(props: any) {
    super(props)
  }
  componentDidMount() {
    this.didFocus = this.props.navigation.addListener('didFocus', () => {
      this.props.onDidFocus && this.props.onDidFocus()
      this.props.hardwareBackPress && (this.back = BackHandler.addEventListener('hardwareBackPress', this.props.hardwareBackPress))
    })
    this.willBlur = this.props.navigation.addListener('willBlur', () => {
      this.props.onWillBlur && this.props.onWillBlur()
      this.back && this.back.remove()
    })
  }
  componentWillUnmount() {
    this.didFocus.remove()
    this.willBlur.remove()
    this.back && this.back.remove()
  }
  render() {
    return <>{ this.props.children }</>
  }
}
export default withNavigation(MyNavigationEvents)