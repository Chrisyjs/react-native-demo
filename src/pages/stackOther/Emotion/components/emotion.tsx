import React, { Component } from 'react'
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
import css from 'src/libs/mixins/common'
const DWidth = Dimensions.get('window').width;
interface Props {
  focusCallback: Function,
  onRef: Function,
  hasMask: boolean,
  addIconCallback: Function,
}
const TextInputMap = {
  textInput1: 'value1',
  textInput2: 'value2'
}
interface States {
  keyboardHeight: number,
  keyboardType: 'keyboard' | 'emotionBoard' | '',
  animateEmotionBoard: any
}

export default class index extends Component<Props, States> {
  private isIconPressed: boolean = false;
  private keyboardDidShow: object = {};
  private keyboardDidHide: object = {};
  private currentTextInput: string = '';
  constructor(props: Props) {
    super(props);
    this.state = {
      keyboardHeight: 0,
      keyboardType: '',
      animateEmotionBoard: new Animated.Value(0)
    }
  }
  componentDidMount() {
    this.props.onRef(this);
    this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShowCallback);
    this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', this.keyboardDidHideCallback);
  }
  private keyboardDidShowCallback = (e) => {
    // console.log(e.endCoordinates.height)
    this.setKeyboardType('keyboard')
    this.setState({
      keyboardHeight: e.endCoordinates.height
    })
  }
  private keyboardDidHideCallback = (e) => {
    const { keyboardType } = this.state;
    // console.log(keyboardType)
    !this.isIconPressed && keyboardType === 'keyboard' && this.setKeyboardType('')
    this.isIconPressed = false;
  }
  public setKeyboardType = (type, func?: Function) => {
    this.setState({
      keyboardType: type
    }, () => {
      func instanceof Function && func();
    })
    /* Platform.OS !== 'ios' &&
    Animated.timing(this.state.animateEmotionBoard, {
      toValue: (type === 'keyboard' || type === '') ? 0 : 1,
      duration: 80,
      easing: Easing.linear,
    }).start(); */
  }
  private addIcon = (name: string) => {
    const { addIconCallback } = this.props;
    addIconCallback instanceof Function && addIconCallback(name)
  }
  private iconPress = () => {
    const { focusCallback, hasMask } = this.props;
    const { keyboardType } = this.state;
    if (keyboardType === 'keyboard') {
      // isIconPressed 用来防止 mask 闪烁
      this.isIconPressed = true;
      Keyboard.dismiss();
      setTimeout(() => {  // 防止键盘收起过程中高度变化，导致闪烁
        this.setKeyboardType('emotionBoard')
      }, 200)
    } else {
      setTimeout(() => {
        this.setKeyboardType('keyboard', focusCallback)
      }, 150)
    }
  }
  public render() {
    const { keyboardHeight, keyboardType, animateEmotionBoard } = this.state;
    const { hasMask } = this.props;
    const h = 44;
    const bottom = Platform.OS === "ios" ? keyboardHeight + h : keyboardType === 'emotionBoard' ? keyboardHeight + h : h
    return (
      <>
        {/* 两种键盘打开都添加遮罩 */}
        {
          !!keyboardType && hasMask &&
            <TouchableWithoutFeedback onPress={() => {
              Keyboard.dismiss();
              this.setKeyboardType('');
            }}>
              <View style={[styles.mask, {bottom: bottom}]}>
              </View>
            </TouchableWithoutFeedback>
        }
        <View>
          {/* 键盘上方的切换按钮 */}
          {
            !!keyboardType &&
              <View 
                // onLayout={(e) => console.log(e.nativeEvent.layout.height)}
                style={[
                  // Platform.OS === "ios" ? { position: 'absolute', right: 0, bottom: bottom} : {...css.flexRow(), flex: 0, justifyContent: 'flex-end'}
                  {...css.flexRow(), backgroundColor: '#FFF', flex: 0, justifyContent: 'flex-end'}
                ]}
              >
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
              /* Platform.OS !== 'ios' &&
              {
                height: animateEmotionBoard.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, keyboardHeight],
                })
              } */
            ]}>
              <View style={[styles.emotionWrap]}>
                <Emotion height={keyboardHeight} callback={this.addIcon}></Emotion>
              </View>
            </Animated.View>
          }
        </View>
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
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, .5)'
  },
  emoticonBtn: {
    // ...css.bgColor('red'),
    zIndex: 100,
    ...css.padding(10)
  },
  emotionWrap: {
    // ...css.bgColor('#FFF'),
    ...css.bgColor('#FFF'),
    // position: 'absolute',
    // bottom: 0
  }
})
