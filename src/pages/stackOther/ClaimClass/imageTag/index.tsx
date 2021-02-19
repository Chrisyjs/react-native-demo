import React, { Component } from 'react';
import { View, Text, PanResponder, Animated } from 'react-native';
import Tag from './tag';
import { debounce, throttle } from 'src/libs/util'
export default class Draggable extends Component {
  static defaultProps = {
    offsetX: 100,
    renderSize: 36,
    offsetY: 100,
    reverse: true,
  };
  constructor(props, defaultProps) {
    super(props, defaultProps);
    const { pressDragRelease } = props;
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx, dy } = gestureState;
        return (dx > 2 || dx < -2 || dy > 2 || dy < -2)
      },
      onMoveShouldSetPanResponderCapture: (_, gestureState) => {
        const { dx, dy } = gestureState;
        return (dx > 2 || dx < -2 || dy > 2 || dy < -2)
      },
      onPanResponderGrant: (e, gestureState) => {
        this._top = this.props.y;
        this._left = this.props.x;
        this.props.onPress(true)
      },
      onPanResponderMove: throttle((e, gs) => {
        this.setState({
          x: this._left + gs.dx,  // 初始位置+距离初始位置移动的距离
          y: this._top + gs.dy
        })
      }, 50, true),
      onPanResponderRelease: (e, gs) => {
        this.props.onPress(false)
        const { x, y } = this.checkOverflow()
        this.setState({
          x,
          y
        }, () => {
          pressDragRelease(e, {x: this.state.x, y: this.state.y}, true);
        })
      },
    });
  }
  state = {
    width: 0,
    height: 0,
    x: this.props.x,
    y: this.props.y
  };
  checkOverflow = () => {
    let x = this.state.x;
    let y = this.state.y;
    if (x < 0) {
      x = 0;
    }
    if (this.props.direction === 'left') {
      if (x < this.state.width - 12) {
        x = this.state.width - 12;
      }
    }
    if (this.props.direction === 'right') {
      if (x > this.props.boxW - this.state.width) {
        x = this.props.boxW - this.state.width;
      }
    } else {
      if (x > this.props.boxW - 12) {
        x = this.props.boxW - 12;
      }
    }
    if (y < 0) {
      y = 0;
    }
    if (y > this.props.boxH - this.state.height) {
      y = this.props.boxH - this.state.height;
    }
    return {
      x,
      y,
    }
  }
  setTagSize = e => {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  };
  changeDirection = (direction) => {
    const { changeDirection, x, boxW } = this.props;
    const { width } = this.state;
    let obj = {
      x,
    };
    // debugger
    if (direction === 'left') {
      let w = x - width;
      obj.x = w < 0 ? width - 11 : x;
    }
    if (direction === 'right') {
      let w = x + width;
      obj.x = w >= boxW ? boxW - width : x;
    }
    this.setState({
      x: obj.x,
      y: this.props.y
    }, () => {
      changeDirection(direction, obj);
    })
  };
  leftPosition = x => {
    if (this.props.direction === 'left') {
      return x - this.state.width + 12
    } else {
      return x;
    }
  }
  render() {
    const { title, direction, boxW, childAvatar } = this.props;
    const { x, y } = this.state;
    return (
      <View style={{ position: 'absolute', opacity: this.props.hide === false ? 0 : 1, top: y, zIndex: 999, left: this.leftPosition(x) }}>
        {this.props.drage === false ? <Tag
          setTagSize={this.setTagSize}
          direction={direction}
          title={title}
          small={this.props.small}
          childAvatar={childAvatar}
        /> : <Animated.View {...this.panResponder.panHandlers}>
            <Tag
              setTagSize={this.setTagSize}
              direction={direction}
              title={title}
              childAvatar={childAvatar}
              changeDirection={this.changeDirection}
            />
          </Animated.View>}
      </View>
    );
  }
}

