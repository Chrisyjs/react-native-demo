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
  selection: {
    start: number,
    end: number
  }
}

export default class index extends Component<Props, States> {
  private currentTextInput: any;
  private emotion: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      value1: '',
      value2: '',
      selection: {
        start: 0,
        end: 0
      }
    }
  }
  componentDidMount() {
  }
  /* 
    输入字符文本改变回调
   */
  private onChangeText = (val: string, type: string) => {
    const { start } = this.state.selection;
    const t1 = this.state[type][start - 1];
    const t0 = this.state[type][start - 4];
    // 删除的时候表情处理
    if (t1 === ']' && t0 === '[' && val.length < this.state[type].length) {
      this.setState({
        [type]: this.state[type].slice(0, start - 4) + this.state[type].slice(start)
      })
    } else {
      this.setState({
        [type]: val
      })
    }
  }
  /* 
    添加表情回调
   */
  private addIcon = (name: string) => {
    const { start, end } = this.state.selection;
    //  console.log(start)
    const key = TextInputMap[this.currentTextInput];
    let temp = this.state[key];
    temp = this.insertValue(temp, start, name);
    this.setState({
      [key]: temp,
      selection: {
        start: start + name.length,
        end: start + name.length
      }
    })
  }
  /* 
    设置焦点
   */
  private setFocus = () => {
    this[this.currentTextInput] && this[this.currentTextInput].focus();
  }
  /* 
    获取焦点回调
   */
  private onFocus = (event: object, input: string) => {
    // console.log(event)
    this.emotion && this.emotion.setKeyboardType('keyboard')
    this.currentTextInput = input;
  }
  /* 
    点击空白处
   */
  private onPressBlank = () => {
    // console.log(123)
    Keyboard.dismiss();
    this.emotion && this.emotion.setKeyboardType('')
  }
  /* 
    输入字符改变回调
   */
  /* private onChange = (event, key) => {
    const { eventCount, target, text } = event.nativeEvent;
    console.log(event.nativeEvent)
  } */
  /* 
    光标移动回调
   */
  private onSelectionChange = (event) => {
    // console.log(event.nativeEvent.selection)
    let { selection } = event.nativeEvent;
    // const l = this.state[TextInputMap[this.currentTextInput]].length;
    // if (selection.start > l - 1) {
    //   selection.start = l - 1;
    //   selection.end = l - 1;
    // }

    this.setState({
      selection,
    })
  }
  /* 
    插入字符串
   */
  private insertValue = (formerValue, index, value) => {
    return formerValue.slice(0, index) + value + formerValue.slice(index);
  }
  /* 
    按下按键
   */
  /* private onKeyPress = (event, value) => {
    const { key } = event.nativeEvent;
    const { start } = this.state.selection;
    const t1 = this.state[value][start - 1];
    const t0 = this.state[value][start - 4];
    console.log(t1, t0)
    console.log( this.state[value].slice(0, start - 4) + this.state[value].slice(start) )
    if (key === 'Backspace' && t1 === ']' && t0 === '[') {
      // this.setState({
      //   [value]: 
      // })
    }
  } */
  public render() {
    const { value1, value2, selection } = this.state;
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={[{flex: 1, ...css.bgColor('#fff')}]}>
            <ScrollView style={[{paddingHorizontal: 10, paddingTop: 10, flex: 1}]}>
              <TextInput 
                // selectTextOnFocus={true}
                // selectionColor={'red'}
                // selection={this.selection}
                // contextMenuHidden={true}
                onSelectionChange={this.onSelectionChange}
                ref={(ref) => this.textInput1 = ref} 
                style={[{...css.border(), height: 200, ...css.padding(10), textAlignVertical: 'top'}]} 
                onFocus={(ev) => this.onFocus(ev, 'textInput1')} 
                onChangeText={(val) => this.onChangeText(val, 'value1')} 
                // onChange={(event) => this.onChange(event, 'value1')}
                // onKeyPress={(event) => this.onKeyPress(event, 'value1')}
                value={value1}
                multiline={true}
              ></TextInput>
              <TextInput 
                onSelectionChange={this.onSelectionChange}
                ref={(ref) => this.textInput2 = ref} 
                style={[{...css.border(), height: 200, ...css.padding(10), textAlignVertical: 'top'}]} 
                onFocus={(ev) => this.onFocus(ev, 'textInput2')} 
                onChangeText={(val) => this.onChangeText(val, 'value2')} 
                // onChange={(event) => this.onChange(event, 'vlaue2')}
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
