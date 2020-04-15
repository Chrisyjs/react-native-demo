import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import css from 'src/libs/mixins/common';

export default class AAA extends Component {
  state = {
    age: 666
  }
  add = () => {
    console.log(this.state.age + 1)
    this.setState({ age: this.state.age + 1})
  }
  render() {
    return (
      <ChildA onChangeParent={this.add} age={this.state.age}></ChildA>
    )
  }
}
class ChildA extends Component {
  state = {
    num: 888
  }
  /*  */
  static getDerivedStateFromProps(nextProps, state) {  // 有这个生命周期才能将 props 上的属性映射到 state 上
    if (nextProps.age !== state.age) {
      console.log('更新吧');
      return {
        onChangeParent: nextProps.onChangeParent,
        age: nextProps.age,
      }
    }
    return null;
  }
  add = () => {
    console.log(this.state.num + 1)
    this.setState({ num: this.state.num + 1 })
  }
  render() {
    const { onChangeParent, num, age } = this.state;
    return (
      <View>
        <TouchableOpacity style={[styles.text]} onPress={() => this.setState({age: age+1})}>
          <Text>changePropAge {age}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.text]} onPress={onChangeParent}>
          <Text>changeStateAge {age}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.text]} onPress={this.add}>
          <Text>addStateNum {num}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    ...css.padding(10),
    ...css.flexRow()
  }
})
