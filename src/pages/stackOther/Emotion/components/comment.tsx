import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import css from 'src/libs/mixins/common'

interface Props {
  onPressEmotion: () => void,
  onPressLike: () => void,
  onPressInput: () => void,
  text?: string
}
interface States {

}
export default class comment extends Component <Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      
    }
  }
  render() {
    const { onPressEmotion, onPressLike, onPressInput, text } = this.props;
    return (
      <View style={[styles.wrap]}>
        <TouchableOpacity onPress={onPressInput} style={[styles.input]}>
          <Image source={require('src/assents/icon/icon-edit.png')}></Image>
          <Text style={[styles.text]}>{!!text || '说点什么...'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.icon,]} onPress={onPressEmotion}>
          <Image source={require('src/assents/icon/icon-emoticon.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.icon]} onPress={onPressLike}>
          <Image source={require('src/assents/icon/like-in-detail.png')}></Image>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    borderTopWidth: .5,
    borderColor: '#E5E5E5',
    ...css.flexRow(),
    ...css.padding(12)
  },
  text: {
    color: '#7F7F7F',
    fontSize: 12,
    lineHeight: 17,
  },
  input: {
    ...css.flexRow(),
    flex: 1,
    borderRadius: 18,
    ...css.bgColor('#F0F0F0'),
    justifyContent: 'flex-start',
    ...css.padding(9, 13)
  },
  icon: {
    ...css.padding(4, 8),
    flex: 0,
  }
})
