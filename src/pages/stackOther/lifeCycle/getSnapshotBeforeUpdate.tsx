import React, { Component } from 'react'
import { Text, StyleSheet, ScrollView, View } from 'react-native'
import css from 'src/libs/mixins/common'

export default class getSnapshotBeforeUpdate extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = { messages: [] };
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        messages: ["msg:" + this.state.messages.length, ...this.state.messages]
      });
      //this.setState({messages:[...this.state.messages,this.state.messages.length]});
    }, 100);
  }
  componentWillMount() {
    clearInterval(this.interval)
  }
  getSnapshotBeforeUpdate() {
    // 返回更新内容的高度 300px
    return this.wrapper.current.scrollHeight;
  }
  componentDidUpdate(prevProps, prevState, prevScrollHeight) {
    this.wrapper.current.scrollTop =
      this.wrapper.current.scrollTop +
      (this.wrapper.current.scrollHeight - prevScrollHeight);
  }
  render() {
    return (
      <ScrollView style={[styles.ul]} ref={this.wrapper}>
        {this.state.messages.map((message, index) => (
          <Text key={index}>{message}</Text>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  ul: {
    height: 100,
    width: 200,
    ...css.border(),
  }
})
