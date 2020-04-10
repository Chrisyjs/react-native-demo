import React, { Component } from 'react'
import { 
  Text, 
  StyleSheet, 
  View, 
  TextInput, 
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  SafeAreaView,
  ScrollView, 
  Dimensions,
  Platform
} from 'react-native'
import Emotion from './components/emotion';
import css from 'src/libs/mixins/common'
const DWidth = Dimensions.get('window').width;
interface Props {

}
const TextInputMap = {
  textInput1: 'value1',
  textInput2: 'value2'
}
interface States {
  value1: string,
  value2: string,
}

export default class index extends Component<Props, States> {
  private currentTextInput: string = '';
  constructor(props: Props) {
    super(props);
    this.state = {
      value1: '',
      value2: '',
    }
  }
  componentDidMount() {
  }
  private onChangeText = (val: string, type: string) => {
    this.setState({
      [type]: val
    })
  }
  private addIcon = (name: string) => {
    let temp = TextInputMap[this.currentTextInput];
    this.state[temp] += name;
    this.setState({
      [temp]: this.state[temp]
    })
  }
  private setFocus = () => {
    this[this.currentTextInput] && this[this.currentTextInput].focus();
  }
  private onFocus = (event: object, input: string) => {
    // console.log(event)
    this.emotion && this.emotion.setKeyboardType('keyboard')
    this.currentTextInput = input;
  }
  // private onPressBlank = () => {
  //   // console.log(123)
  //   Keyboard.dismiss();
  //   this.emotion && this.emotion.setKeyboardType('')
  // }
  public render() {
    const { value1, value2 } = this.state;
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={[{flex: 1, ...css.bgColor('#fff')}]}>
            <ScrollView style={[{paddingHorizontal: 10, paddingTop: 10, flex: 1}]}>
              <TextInput 
                ref={(ref) => this.textInput1 = ref} 
                style={[{...css.border(), height: 200, ...css.padding(10), textAlignVertical: 'top'}]} 
                onFocus={(ev) => this.onFocus(ev, 'textInput1')} 
                onChangeText={(val) => this.onChangeText(val, 'value1')} 
                value={value1}
                multiline={true}
              ></TextInput>
              <TextInput 
                ref={(ref) => this.textInput2 = ref} 
                style={[{...css.border(), height: 200, ...css.padding(10), textAlignVertical: 'top'}]} 
                onFocus={(ev) => this.onFocus(ev, 'textInput2')} 
                onChangeText={(val) => this.onChangeText(val, 'value2')} 
                value={value2}
                multiline={true}
              ></TextInput>
              <TouchableWithoutFeedback onPress={this.onPressBlank}>
                <View style={[{...css.border(), height: 300, ...css.bgColor('#ccc')}]}></View>
              </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>
        <Emotion focusCallback={this.setFocus} addIconCallback={this.addIcon} onRef={(ref) => this.emotion = ref}></Emotion>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  emoticonBtn: {
    position: 'absolute',
    right: 0,
    zIndex: 100,
    ...css.padding(10)
  },
  emotionWrap: {
    // ...css.bgColor('#FFF'),
    ...css.bgColor('red'),
    // position: 'absolute',
    // bottom: 0
  }
})
