import React, { Component } from 'react'
import { 
  Text, 
  StyleSheet, 
  View, 
  TextInput, 
  Keyboard,
  TouchableOpacity,
  Image,
  SafeAreaView 
} from 'react-native'
import Emotion from './emotionIcon';
import css from 'src/libs/mixins/common'
interface Props {

}
interface States {
  value: string,
  keyboardHeight: number,
  keyboardShow: boolean,
  keyboardType: 'keyboard' | 'emotionBoard' | ''
}

export default class index extends Component<Props, States> {
  private keyboardDidShow: object = {};
  private keyboardDidHide: object = {};
  constructor(props: Props) {
    super(props);
    this.state = {
      value: '',
      keyboardHeight: 0,
      keyboardShow: false,
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
      keyboardShow: true,
      keyboardType: 'keyboard',
      keyboardHeight: e.endCoordinates.height 
    })
  }
  private keyboardDidHideCallback = (e) => {
    this.setState({
      keyboardShow: false
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
    this.setState({
      keyboardType: keyboardType === 'emotionBoard' ? 'keyboard' : 'emotionBoard'
    })
  }
  private onFocus = (event: object) => {
    // console.log(event)
  }
  public render() {
    const { value, keyboardHeight, keyboardShow, keyboardType } = this.state;
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={[{flex: 1}]}>
          <View style={[{paddingHorizontal: 10, paddingTop: 10, flex: 1}]}>
            <TextInput style={[{...css.border()}]} onFocus={this.onFocus} onChangeText={this.onChangeText} value={value}></TextInput>
          </View>
        </SafeAreaView>
        {
          !!keyboardShow && keyboardType === 'keyboard' &&
            <TouchableOpacity style={[styles.emoticonBtn, {bottom: keyboardHeight+10, ...css.border()}]} onPress={this.iconPress}>
              <Image source={require('src/assents/icon/icon-emoticon.png')} />
            </TouchableOpacity> 
        }
        {
          keyboardType === 'emotionBoard' && 
          <TouchableOpacity style={[styles.emoticonBtn, {bottom: keyboardHeight+10, ...css.border()}]} onPress={this.iconPress}>
            <Image source={require('src/assents/icon/keyboard.png')} />
          </TouchableOpacity> 
        }
        {/* <Emotion callback={(name: string)=>this.addIcon(name)}></Emotion> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  emoticonBtn: {
    position: 'absolute',
    right: 10,
  }
})
