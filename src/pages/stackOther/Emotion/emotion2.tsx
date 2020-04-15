import React, { Component, Props } from 'react'
import { Text, StyleSheet, View, SafeAreaView, ScrollView, Keyboard } from 'react-native'
import Comment from './components/comment'
import AddComment from './components/emotion2'

interface Props {

}
interface States {
  keyboardType: 'keyboard' | 'emotionBoard' | ''
}
export default class emotion2 extends Component <Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      keyboardType: '',
    }
  }
  render() {
    const { keyboardType, } = this.state;
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView style={{flex: 1, backgroundColor: 'red'}}></ScrollView>
          {
            !keyboardType && 
              <Comment 
                onPressInput={() => {
                  this.setState({
                    keyboardType: 'keyboard'
                  })
                }}
                onPressEmotion={() => {
                  this.setState({
                    keyboardType: 'emotionBoard'
                  })
                }}
                onPressLike={() => {

                }}
              ></Comment>
          }
        </SafeAreaView>
        {
          !!keyboardType && 
            <AddComment 
              setKeyboardType={(type) => this.setState({keyboardType: type})}
              keyboardType={keyboardType}
              onRef={(ref) => this.addComment = ref}
            >
            </AddComment>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({

})
