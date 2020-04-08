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
  ScrollView 
} from 'react-native'
import Emotion from './emotionIcon';
import css from 'src/libs/mixins/common'
interface Props {

}
interface States {
  value: string,
  keyboardHeight: number,
  keyboardType: 'keyboard' | 'emotionBoard' | ''
}

export default class index extends Component<Props, States> {
  private keyboardDidShow: object = {};
  private keyboardWillHide: object = {};
  constructor(props: Props) {
    super(props);
    this.state = {
      value: '',
      keyboardHeight: 0,
      keyboardType: ''
    }
  }
  componentDidMount() {
    this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShowCallback);
    this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHideCallback);
  }
  private keyboardDidShowCallback = (e) => {
    // console.log(e.endCoordinates.height)
    this.setState({
      keyboardType: 'keyboard',
      keyboardHeight: e.endCoordinates.height 
    })
  }
  private keyboardWillHideCallback = (e) => {
    const { keyboardType } = this.state;
    keyboardType === 'keyboard' &&
    this.setState({
      keyboardType: ''
    })
  }
  private onChangeText = (val: string) => {
    this.setState({
      value: val
    })
  }
  private addIcon = (name: string) => {
    let { value } = this.state;
    value += name;
    this.setState({
      value
    })
  }
  private iconPress = () => {
    const { keyboardType } = this.state;
    keyboardType === 'keyboard' && Keyboard.dismiss();
    keyboardType === 'emotionBoard' && this.textInput && this.textInput.focus();
    this.setState({
      keyboardType: keyboardType === 'emotionBoard' ? 'keyboard' : 'emotionBoard'
    })
  }
  private onFocus = (event: object) => {
    // console.log(event)
  }
  private onPressBlank = () => {
    console.log(123)
    Keyboard.dismiss();
    this.setState({
      keyboardType: ''
    })
  }
  public render() {
    const { value, keyboardHeight, keyboardType } = this.state;
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={[{flex: 1, ...css.bgColor('yellow')}]}>
            <ScrollView style={[{paddingHorizontal: 10, paddingTop: 10, flex: 1}]}>
              <TextInput 
                ref={(ref) => this.textInput = ref} 
                style={[{...css.border(), height: 200, ...css.padding(10)}]} 
                onFocus={this.onFocus} 
                onChangeText={this.onChangeText} 
                value={value}
                multiline={true}
              ></TextInput>
              <TouchableWithoutFeedback onPress={this.onPressBlank}>
                <View style={[{...css.border(), height: 300, ...css.bgColor('blue')}]}></View>
              </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>
        {
          keyboardType === 'keyboard' &&
            <TouchableOpacity style={[styles.emoticonBtn, {bottom: keyboardHeight+10, ...css.border()}]} onPress={this.iconPress}>
              <Image source={require('src/assents/icon/icon-emoticon.png')} />
            </TouchableOpacity> 
        }
        {
          keyboardType === 'emotionBoard' && 
          <>
            <TouchableOpacity style={[styles.emoticonBtn, {bottom: keyboardHeight+10, ...css.border()}]} onPress={this.iconPress}>
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
    right: 10,
  },
  emotionWrap: {
    // position: 'absolute',
    // bottom: 60
  }
})
