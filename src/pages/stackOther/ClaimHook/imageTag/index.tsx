import React, { useRef, useState } from 'react';
import { View, Text, PanResponder, Animated } from 'react-native';
import Tag from './tag';

const Dragable = (props) => {
  const { title, direction, x, y, boxW, childAvatar, drage, hide } = props;

  /* useState */
  const [pos, setPos] = useState({
    _left: x,
    _top: y,
  })

  /* useRef */
  const tagSizeRef = useRef({
    width: 0,
    height: 0
  })

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return true
    },
    onMoveShouldSetPanResponderCapture: (_, gestureState) => {
      return true
    },
    onPanResponderGrant: (e, gestureState) => {
      props.onPress(true)
    },
    onPanResponderMove: (e, gs) => {
      let obj = {
        x: props.x + gs.dx,
        y: props.y + gs.dy,
      };
      props.pressDragRelease(e, obj)
      // let obj = {
      //   _left: props.x + gs.dx,
      //   _top: props.y + gs.dy
      // }
      // setPos(obj)
    },
    onPanResponderRelease: (e, gs) => {
      props.onPress(false)
      props.pressDragRelease(e, checkOverflow(gs), true);
    },
  });

  const checkOverflow = (gs) => {
    let x = props.x + gs.dx;
    let y = props.y + gs.dy;
    if (x < 0) {
      x = 0;
    }
    if (props.direction === 'left') {
      if (x < tagSizeRef.current.width - 12) {
        x = tagSizeRef.current.width - 12;
      }
    }
    if (props.direction === 'right') {
      if (x > props.boxW - tagSizeRef.current.width) {
        x = props.boxW - tagSizeRef.current.width;
      }
    } else {
      if (x > props.boxW - 12) {
        x = props.boxW - 12;
      }
    }
    if (y < 0) {
      y = 0;
    }
    if (y > props.boxH - tagSizeRef.current.height) {
      y = props.boxH - tagSizeRef.current.height;
    }
    return {
      x,
      y,
    }
  }

  const setTagSize = e => {
    tagSizeRef.current = {
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    }
  }

  const leftPosition = x => {
    if (props.direction === 'left') {
      return x - tagSizeRef.current.width + 12
    } else {
      return x;
    }
  }

  const changeDirection = (direction) => {
    const { changeDirection, x, boxW } = props;
    const { width } = tagSizeRef.current;
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
    props.changeDirection(direction, obj);
  };

  return (
    <View style={{ position: 'absolute', opacity: hide === false ? 0 : 1, top: y, zIndex: 999, left: leftPosition(x) }}>
      {drage === false ? <Tag
        setTagSize={setTagSize}
        direction={direction}
        title={title}
        small={props.small}
        childAvatar={childAvatar}
      /> : <Animated.View {...panResponder.panHandlers}>
          <Tag
            setTagSize={setTagSize}
            direction={direction}
            title={title}
            childAvatar={childAvatar}
            changeDirection={changeDirection}
          />
        </Animated.View>}
    </View>
  )
}
export default Dragable
