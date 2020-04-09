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
  focusCallback: Function,
  onRef: Function,
  addIconCallback: Function,
}
const TextInputMap = {
  textInput1: 'value1',
  textInput2: 'value2'
}
interface States {
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
      keyboardHeight: 0,
      keyboardType: ''
    }
  }
  componentDidMount() {
    this.props.onRef(this);
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
    // console.log(keyboardType)
    keyboardType === 'keyboard' &&
      this.setState({
        keyboardType: ''
      })
  }
  private addIcon = (name: string) => {
    const { addIconCallback } = this.props;
    addIconCallback instanceof Function && addIconCallback(name)
  }
  private iconPress = () => {
    const { focusCallback } = this.props;
    const { keyboardType } = this.state;
    if (keyboardType === 'keyboard') {
      keyboardType === 'keyboard' && Keyboard.dismiss();
      setTimeout(() => {  // 防止键盘收起过程中高度变化，导致闪烁
        this.setState({
          keyboardType: 'emotionBoard'
        })
      }, 250)
    } else {
      this.setState({
        keyboardType: 'keyboard'
      }, () => {
        focusCallback instanceof Function && focusCallback()
      })
    }
  }
  public render() {
    const { keyboardHeight, keyboardType } = this.state;
    const bottom = Platform.OS === "ios" ? keyboardHeight : keyboardType === 'emotionBoard' ? keyboardHeight : 0
    return (
      <>
        {/* 键盘上方的切换按钮 */}
        {
          !!keyboardType &&
            <TouchableOpacity style={[styles.emoticonBtn, { bottom: bottom, ...css.bgColor('red') }]} onPress={this.iconPress}>
              {
                keyboardType === 'keyboard' &&
                <Image source={require('src/assents/icon/icon-emoticon.png')} />
              }
              {
                keyboardType === 'emotionBoard' &&
                <Image source={require('src/assents/icon/keyboard.png')} />
              }
            </TouchableOpacity>
        }
        {/* ios 键盘不占空间，安卓占据空间 */}
        {
          keyboardType === 'keyboard' && Platform.OS === 'ios' &&
          <View style={[{ height: keyboardHeight, width: DWidth, backgroundColor: 'transparent' }]}></View>
        }
        {/* 表情键盘 */}
        {
          keyboardType === 'emotionBoard' &&
          <>
            <View style={[styles.emotionWrap]}>
              <Emotion height={keyboardHeight} callback={this.addIcon}></Emotion>
            </View>
          </>
        }
      </>
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
