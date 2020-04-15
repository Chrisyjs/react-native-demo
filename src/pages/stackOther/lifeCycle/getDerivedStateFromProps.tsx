import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import css from 'src/libs/mixins/common';

/* 
  getDerivedStateFromProps 生命周期
  最常见的误解就是 getDerivedStateFromProps 和 componentWillReceiveProps 只会在 props “改变”时才会调用。
  实际上只要父组件重新渲染时，这两个生命周期函数就会重新调用，不管 props 有没有“变化”
 */
export default class AAA extends Component {
  state = {
    age: 666,
    count: 1
  }
  add = () => {
    console.log(this.state.age + 1)
    this.setState({ age: this.state.age + 1})
  }
  render() {
    const { count } = this.state;
    return (
      <>
        <TouchableOpacity style={[styles.text]} onPress={() => this.setState({count: count+1})}>
          <Text>addCount {count}</Text> 
        </TouchableOpacity>
        <ChildA onChangeParent={this.add} age={this.state.age}></ChildA>
      </>
    )
  }
}
class ChildA extends Component {
  state = {
    num: 888
  }
  /*  */
  static getDerivedStateFromProps(nextProps, state) {  // 有这个生命周期才能将 props 上的属性映射到 state 上
    console.log('getDerivedStateFromProps')
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
