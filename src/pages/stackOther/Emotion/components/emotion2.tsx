import React, { Component, Children } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Easing,
  Animated,
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
import { checkIconName } from './utils';
import css from 'src/libs/mixins/common'
import { insertValue } from 'src/libs/util'
import Toast from 'react-native-root-toast';
const DWidth = Dimensions.get('window').width;
const DHeight = Dimensions.get('window').height;
const Timeout = 160;
const TextInputMap = {
  textInput: 'value',
}
interface Props {
  onRef: Function,
  maxLength?: number, 
  setKeyboardType: Function,
  placeholder?: string,
  onPressConfirm: Function,
  commentToComponent: React.ComponentType<any> | React.ReactElement | null,
  keyboardType: 'keyboard' | 'emotionBoard' | '',
}
interface States {
  keyboardHeight: number,
  maxLength: number,
  textInputType: 'big' | 'small',
  value: string
}

export default class index extends Component<Props, States> {
  private isIconPressed: boolean = false;
  private textInput = React.createRef<TextInput>()
  private emotion = React.createRef<TextInput>()
  private keyboardDidShow: object = {};
  private keyboardDidHide: object = {};
  private currentTextInput: string = '';
  private selection: {
    start: number,
    end: number
  } = {
    start: 0,
    end: 0
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      maxLength: props.maxLength || 140,
      value: '',
      keyboardHeight: 0,
      textInputType: 'small',
    }
  }
  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
    this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShowCallback);
    this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', this.keyboardDidHideCallback);
  }
  componentWillReceiveProps(nextProps) {
    nextProps.onRef && nextProps.onRef(this);
    if (!nextProps.keyboardType) {  // 关闭评论弹框后重置状态
      return {
        textInputType: 'small',
        value: ''
      }
    }
    return null;
  }
  // static getDerivedStateFromProps(nextProps, state) { 
  //   // console.log('getDerivedStateFromProps')
  //   // console.log(nextProps.keyboardType, 'getDerivedStateFromProps')
  //   if (!nextProps.keyboardType) {  // 关闭评论弹框后重置状态
  //     return {
  //       textInputType: 'small',
  //       value: ''
  //     }
  //   }
  //   return null;
  // }
  private keyboardDidShowCallback = (e) => {
    // console.log(e.endCoordinates.height)
    this.setKeyboardType('keyboard')
    // this.setFocus();
    // console.log(e.endCoordinates.height)
    this.setState({
      keyboardHeight: e.endCoordinates.height
    })
  }
  private keyboardDidHideCallback = (e) => {
    const { keyboardType } = this.props;
    // console.log(keyboardType)
    /* !this.isIconPressed && keyboardType === 'keyboard' && this.setKeyboardType('')
    this.isIconPressed = false; */
    // console.log(keyboardType, 12343)
  }
  public setKeyboardType = (type) => {
    this.props.setKeyboardType(type)
    !type && this.setState({
      value: ''
    })
  }
  private iconPress = () => {
    const { keyboardType } = this.props;
    console.log(keyboardType, 'keyboardType')
    const { keyboardHeight } = this.state;
    if (keyboardType === 'keyboard') {
      // isIconPressed 用来防止 mask 闪烁
      this.isIconPressed = true;
      Keyboard.dismiss();
      setTimeout(() => {  // 防止键盘收起过程中高度变化，导致闪烁
        // console.log(this.props.keyboardType,  '1232321')
        this.setKeyboardType('emotionBoard')
      }, Timeout)
    } else {
      setTimeout(() => {
        this.setKeyboardType('keyboard')
      }, Timeout)
      this.setFocus();
    }
  }
  private setFocus = () => {
    this.setKeyboardType('keyboard');  // focus 之前就设置 keyboardType 避免键盘弹起，顶起表情
    setTimeout(() => {
      this.textInput && this.textInput.focus &&  this.textInput.focus();
    }, Timeout)
  }
  private onFocus = () => {
    this.setKeyboardType('keyboard')
  }
  private heightIconPress = () => {
    const { textInputType } = this.state;
    this.setState({
      textInputType: textInputType === 'big' ? 'small' : 'big'
    })
  }
  /* 
    输入字符文本改变回调
   */
  private onChangeText = (val: string) => {
    const { start } = this.selection;
    let { value, maxLength } = this.state;
    // console.log('onChangeText')
    const t = value.slice(start - 4, start);
    // console.log(start, 2)
    // 删除的时候表情处理
    if (checkIconName(t) && val.length < value.length) {
      this.setState({
        value: value.slice(0, start - 4) + value.slice(start)
      })
    } else {
      if (val.length > maxLength) {
        this.setState({
          value: val.slice(0, maxLength)
        })
        this.showMaxLengthToast();
        return;
      }
      this.setState({
        value: val
      })
    }
  }
  /* 
    光标移动回调
   */
  private onSelectionChange = (event) => {
    let { selection } = event.nativeEvent;
    setTimeout(() => {  // 保证先执行 changeText 再设置光标，删除表情正确
      this.selection = selection
    }, 50)
  }
  /* 
    添加表情回调
   */
  private addIcon = (name: string) => {
    const { start, end } = this.selection;
    let { value, maxLength } = this.state;
    //  console.log(start)
    let temp = value;
    if (temp.length + 4 > maxLength) {
      this.showMaxLengthToast()
      return;
    };
    temp = insertValue(temp, start, name);
    this.selection = {
      start: start + name.length,
      end: start + name.length
    }
    this.setState({
      value: temp,
    })
  }
  private showMaxLengthToast = () => {
    const { maxLength } = this.state;
    Toast.show(`最多仅可输入${maxLength}字`, {
      position: 0,
      opacity: 0.7,
      shadow: false
    })
  }
  private onPressConfirm = () => {
    this.state.value && this.props.onPressConfirm(this.state.value)
    this.setKeyboardType('')
  }
  public render() {
    const { commentToComponent, placeholder, keyboardType } = this.props;
    const { keyboardHeight, textInputType, value } = this.state;
    const height = textInputType === 'big' ? 298 : 91;  // 高度是下方 e.nativeEvent.layout.height 
    const bottom = Platform.OS === "ios" ? keyboardHeight + height : keyboardType === 'emotionBoard' ? keyboardHeight + height : height
    // console.log(keyboardType, bottom, keyboardHeight, 'render')
    return (
      <>
        {/* 显示遮罩层 */}
        {
          !!keyboardType &&  
            <TouchableWithoutFeedback onPress={() => {
              this.setKeyboardType('');
              setTimeout(() => {
                Keyboard.dismiss();
              }, Timeout)
            }}>
              <View style={[styles.mask, {bottom: bottom}]}>
              </View>
            </TouchableWithoutFeedback>
        }
        {/* <View style={[{display: !!keyboardType ? 'flex' : 'none'}]} onLayout={(e) => { */}
        {
        !!keyboardType &&
        <View onLayout={(e) => {
          // console.log(e.nativeEvent.layout.height)
          // this.setState({height: e.nativeEvent.layout.height});
        }}>
          {/* 键盘上方的切换按钮 */}
          {
              <View style={{...css.bgColor('white')}}>
                {/* 评论给 */}
                <View style={[{...css.flexRow(), justifyContent: 'space-between', ...css.padding(12)}]}>
                  <View>
                    {commentToComponent || <Text>评论</Text>}
                  </View>
                  <View style={[{...css.flexRow()}]}>
                    <Text onPress={this.onPressConfirm}>确定</Text>
                    <TouchableOpacity style={[styles.emoticonBtn]} onPress={this.iconPress}>
                      {
                        keyboardType === 'keyboard' &&
                        <Image source={require('src/assents/icon/icon-emoticon.png')} />
                      }
                      {
                        keyboardType === 'emotionBoard' &&
                        <Image source={require('src/assents/icon/keyboard.png')} />
                      }
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.emoticonBtn]} onPress={this.heightIconPress}>
                      {
                        textInputType === 'big' &&
                        <Image source={require('src/assents/icon/icon-close.png')} />
                      }
                      {
                        textInputType === 'small' &&
                        <Image source={require('src/assents/icon/icon-open.png')} />
                      }
                    </TouchableOpacity>
                  </View>
                </View>
                {/* input */}
                <View style={[{paddingHorizontal: 12}]}>
                  {/* 避免点击 textInput 马上聚焦，导致键盘顶起表情 */}
                  {
                    keyboardType !== 'keyboard' &&
                    <TouchableOpacity onPress={this.setFocus} style={[styles.inputMask]}>
                    </TouchableOpacity>
                  }
                  <TextInput
                    ref={(ref) => this.textInput = ref}
                    // autoFocus={true}
                    value={value}
                    multiline={true}
                    onFocus={this.onFocus}
                    onChangeText={(val) => this.onChangeText(val)}
                    onSelectionChange={this.onSelectionChange}
                    placeholder={ placeholder || '友善的评论是交流的起点'}
                    style={[styles.input, {height: textInputType === 'big' ? 250 : 43}]}
                  ></TextInput>
                </View>
              </View>
          }
          {/* ios 键盘不占空间，安卓占据空间 */}
          {
            keyboardType === 'keyboard' && Platform.OS === 'ios' &&
            <View style={[{ height: keyboardHeight, width: DWidth, opacity: 0 }]}></View>
          }
          {/* 表情键盘 */}
          {
            keyboardType === 'emotionBoard' &&
            <Animated.View style={[
            ]}>
              <View style={[styles.emotionWrap]}>
                <Emotion height={keyboardHeight} callback={this.addIcon}></Emotion>
              </View>
            </Animated.View>
          }
        </View>
        }
      </>
    )
  }
}

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, .4)'
  },
  emoticonBtn: {
    // ...css.bgColor('red'),
    zIndex: 100,
    paddingHorizontal: 10,
  },
  iosPos: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 100,
  },
  emotionWrap: {
    ...css.bgColor('#F9FAF9'),
    // ...css.bgColor('#FFF'),
    // position: 'absolute',
    // bottom: 0
  },
  input: {
    padding: 0,
    textAlignVertical: 'top'
  },
  inputMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    // ...css.bgColor()
  }
})
