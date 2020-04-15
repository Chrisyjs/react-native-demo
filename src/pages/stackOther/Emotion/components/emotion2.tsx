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
import css from 'src/libs/mixins/common'
const DWidth = Dimensions.get('window').width;
const DHeight = Dimensions.get('window').height;
interface Props {
  onRef: Function,
  setKeyboardType: Function,
  placeholder: string,
  commentToText: any,
  keyboardType: 'keyboard' | 'emotionBoard' | '',
}
interface States {
  height: number,
  keyboardHeight: number,
  textInputType: 'big' | 'small'
}

export default class index extends Component<Props, States> {
  private isIconPressed: boolean = false;
  private textInput = React.createRef<TextInput>()
  private keyboardDidShow: object = {};
  private keyboardDidHide: object = {};
  private currentTextInput: string = '';
  constructor(props: Props) {
    super(props);
    this.state = {
      height: 0,
      keyboardHeight: 0,
      textInputType: 'small',
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
    const { keyboardType } = this.props;
    // console.log(keyboardType)
    !this.isIconPressed && keyboardType === 'keyboard' && this.setKeyboardType('')
    this.isIconPressed = false;
    // console.log(keyboardType, 12343)
  }
  public setKeyboardType = (type) => {
    this.props.setKeyboardType(type)
  }
  private addIcon = (name: string) => {

  }
  private iconPress = () => {
    const { keyboardType } = this.props;
    const { keyboardHeight } = this.state;
    if (keyboardType === 'keyboard') {
      // isIconPressed 用来防止 mask 闪烁
      this.isIconPressed = true;
      Keyboard.dismiss();
      setTimeout(() => {  // 防止键盘收起过程中高度变化，导致闪烁
        this.setKeyboardType('emotionBoard')
      }, 200)
    } else {
      setTimeout(() => {
        this.setKeyboardType('keyboard')
        // this.setState({
        //   height: this.height + keyboardHeight
        // })
        this.textInput && this.textInput.focus();
      }, 150)
    }
  }
  private heightIconPress = () => {
    const { textInputType } = this.state;
    this.setState({
      textInputType: textInputType === 'big' ? 'small' : 'big'
    })
  }
  public render() {
    const { commentToText, placeholder, keyboardType } = this.props;
    const { keyboardHeight, height, textInputType } = this.state;
    const bottom = Platform.OS === "ios" ? keyboardHeight + height : keyboardType === 'emotionBoard' ? height : height
    // console.log(keyboardType, bottom, 'render')
    return (
      <>
        {/* 显示遮罩层 */}
        {
          !!keyboardType && 
            <TouchableWithoutFeedback onPress={() => {
              Keyboard.dismiss();
              this.setKeyboardType('');
            }}>
              <View style={[styles.mask, {bottom: bottom}]}>
              </View>
            </TouchableWithoutFeedback>
        }
        <View onLayout={(e) => {
          this.setState({height: e.nativeEvent.layout.height});
        }}>
          {/* 键盘上方的切换按钮 */}
          {
              <View style={[{display: !!keyboardType ? 'flex' : 'none'}]}>
                {/* 评论给 */}
                <View style={[{...css.flexRow(), justifyContent: 'space-between', ...css.padding(12)}]}>
                  <View>
                    {commentToText || <Text>评论</Text>}
                  </View>
                  <View style={[{...css.flexRow()}]}>
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
                <TextInput
                  ref={(ref) => this.textInput = ref}
                  autoFocus={true}
                  multiline={true}
                  placeholder={ placeholder || '友善的评论是交流的起点'}
                  style={[styles.input, {height: textInputType === 'big' ? 250 : 43}]}
                ></TextInput>
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
    backgroundColor: 'rgba(0, 0, 0, .6)'
  },
  emoticonBtn: {
    // ...css.bgColor('red'),
    zIndex: 100,
    paddingHorizontal: 10,
  },
  emotionWrap: {
    ...css.bgColor('#F9FAF9'),
    // ...css.bgColor('#FFF'),
    // position: 'absolute',
    // bottom: 0
  },
  input: {
    padding: 0,
    paddingHorizontal: 12,
    textAlignVertical: 'top'
  }
})
