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
import Emotion from './emotionIcon';
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
  keyboardHeight: number,
  keyboardType: 'keyboard' | 'emotionBoard' | ''
}

export default class index extends Component<Props, States> {
  private keyboardDidShow: object = {};
  private keyboardDidHide: object = {};
  private currentTextInput: string = '';
  constructor(props: Props) {
    super(props);
    this.state = {
      value1: '',
      value2: '',
      keyboardHeight: 0,
      keyboardType: ''
    }
  }
  componentDidMount() {
    this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShowCallback);
    this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', this.keyboardDidHideCallback);
  }
  private keyboardDidShowCallback = (e) => {
    // console.log(e.endCoordinates.height)
    this.setState({
      keyboardType: 'keyboard',
      keyboardHeight: e.endCoordinates.height 
    })
  }
  private keyboardDidHideCallback = (e) => {
    const { keyboardType } = this.state;
    keyboardType === 'keyboard' &&
    this.setState({
      keyboardType: ''
    })
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
  private iconPress = () => {
    const { keyboardType } = this.state;
    if (keyboardType === 'keyboard') {
      keyboardType === 'keyboard' && Keyboard.dismiss();
      setTimeout(() => {  // 防止键盘收起过程中高度变化，导致闪烁
        this.setState({
          keyboardType: 'emotionBoard'
        })
      }, 50)
    } else {
      this.setState({
        keyboardType: 'keyboard'
      }, () => {
        this[this.currentTextInput] && this[this.currentTextInput].focus();
      })
    }
    
  }
  private onFocus = (event: object, input: string) => {
    // console.log(event)
    this.setState({  // 需要在这里设置，不要在 keyboardDidShow 里设置，会闪烁
      keyboardType: 'keyboard'
    })
    this.currentTextInput = input;
  }
  private onPressBlank = () => {
    // console.log(123)
    Keyboard.dismiss();
    this.setState({
      keyboardType: ''
    })
  }
  public render() {
    const { value1, value2, keyboardHeight, keyboardType } = this.state;
    const bottom = Platform.OS === "ios" ? keyboardHeight : 0
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={[{flex: 1, ...css.bgColor('yellow')}]}>
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
                <View style={[{...css.border(), height: 300, ...css.bgColor('blue')}]}></View>
              </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>
        {
          keyboardType === 'keyboard' &&
            <>
              <TouchableOpacity style={[styles.emoticonBtn, {bottom: bottom, ...css.bgColor('red')}]} onPress={this.iconPress}>
                <Image source={require('src/assents/icon/icon-emoticon.png')} />
              </TouchableOpacity> 
            </>
        }
        {/* ios 键盘不占空间 */}
        {
          keyboardType === 'keyboard' && Platform.OS === 'ios' &&
            <View style={[{height: keyboardHeight, width: DWidth, backgroundColor: 'transparent'}]}></View>
        }
        {
          keyboardType === 'emotionBoard' && 
          <>
            <TouchableOpacity style={[styles.emoticonBtn, {bottom: keyboardHeight, ...css.bgColor('red')}]} onPress={this.iconPress}>
              <Image source={require('src/assents/icon/keyboard.png')} />
            </TouchableOpacity> 
            <View style={[styles.emotionWrap]}>
              <Emotion height={keyboardHeight} callback={(name: string)=>this.addIcon(name)}></Emotion>
            </View>
          </>
        }
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
