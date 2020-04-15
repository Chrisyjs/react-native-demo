import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import css from 'src/libs/mixins/common'

/* 
  初始化：
  1 2 3 4
 */
/* 
  点击 setState 后
  5 6 3 7 
  所以即使 state 没有更新，还是会走 shouldComponentUpdate、willUpdate、render、didUpdate 生命周期
 */
export default class LifeCycle extends Component {
  static defaultProps = {
    name: '计数器'
  };

  constructor(props) {
    super(props);
    this.state = { number: 0 };//初始化默认的状态对象
    console.log('1. constructor 初始化 props and state');
  }

  componentWillMount() {
    console.log('2. componentWillMount 组件将要挂载');
  }

  componentDidMount() {
    console.log('4. componentDidMount 组件挂载完成');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Counter', nextProps, nextState);
    console.log('5. shouldComponentUpdate 询问组件是否需要更新');
    return true;
  }

  componentWillUpdate() {
    console.log('6. componentWillUpdate 组件将要更新');
  }

  componentDidUpdate() {
    console.log('7. componentDidUpdate 组件更新完毕');
  }

  add = () => {
    this.setState({ number: this.state.number });
  };

  render() {
    console.log('3.render渲染')
    return (
      <View style={[{...css.padding(10), ...css.border()}]}>
        <Text>{this.state.number}</Text>
        <TouchableOpacity onPress={this.add}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    )
  }
}



const styles = StyleSheet.create({})
