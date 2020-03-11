import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  findNodeHandle,
  KeyboardAvoidingView,
  View,
  Image,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import KeyboardSpacer from 'react-native-keyboard-spacer';
export default class KeyboardAvoidingViewDemo extends Component {
  state = {
    behavior: 'padding',
    value: ''
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1, paddingBottom: 20}}>
        <ScrollView style={{flex: 1}}>
          <View style={[styles.container]}>
            <View style={{paddingTop: 400}}>
              <Text>文本占位1</Text> 
            </View>
            <TextInput
              underlineColorAndroid={'#ffffff'}
              multiline={true}
              placeholder="这里是一个简单的输入框"
              style={styles.textInput} />
          </View>
          <View style={[styles.container]}>
            <View style={{paddingTop: 400}}>
              <Text>文本占位2</Text> 
            </View>
            <TextInput
              underlineColorAndroid={'#ffffff'}
              multiline={true}
              placeholder="这里是一个简单的输入框"
              style={styles.textInput} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  /* render() {
    return (
      // <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
              <TextInput
                underlineColorAndroid={'#ffffff'}
                placeholder="这里是一个简单的输入框"
                style={styles.textInput} />
          </KeyboardAvoidingView>
        </View>
      // </ScrollView>
    );
  } */
  _scrollToInput = (reactNode: any) => {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.props.scrollToFocusedInput(reactNode)
  }
  /* render() {
    return (
      <KeyboardAwareScrollView
        innerRef={ref => {
          this.scroll = ref
        }}>
        <View style={{paddingTop: 500}}>
          <TextInput
            value={this.state.value}
            placeholder="这里是一个简单的输入框"
            onChangeText={(val) => this.setState({value: val})}
            style={styles.textInput}
            onFocus={(event: Event) => {
              // `bind` the function if you're using ES6 classes
              this._scrollToInput(findNodeHandle(event.target))
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    )
  } */
  // render() {
  //   return (
  //     <SafeAreaView style={[{flex: 1}]}>
  //       {/* Some random image to show scaling */}
  //       <Image source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579189770053&di=0326b806b7e5bdc98226e45a5ee6b818&imgtype=0&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fd3%2F1704%2Fdb%2F34de73c353d44db5.jpg_480x360x95_a79b1843.jpg', static: true}}
  //                style={{flex: 1}}/>

  //       {/* The text input to put on top of the keyboard */}
  //       <TextInput style={{left: 0, right: 0, height: 100, borderColor: 'blue', borderWidth: 1}}
  //             placeholder={'Enter your text!'}/>

  //       {/* The view that will animate to match the keyboards height */}
  //       <KeyboardSpacer/>
  //     </SafeAreaView>
  //   );
  // }
}
const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor:'white',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    height: 140,
    paddingHorizontal: 10,
  },
});
// AppRegistry.registerComponent('KeyboardAvoidingViewDemo', () => KeyboardAvoidingViewDemo);