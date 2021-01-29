import React, { useRef, useEffect } from 'react';
import { View, PanResponder, Animated } from 'react-native';
import Tag from './tag';
import css from 'src/libs/mixins/common'

const Draggable = (props) => {
  const { title, direction, x, y, boxW, boxH, childAvatar, hide, drage } = props;
  const pan = useRef(new Animated.ValueXY()).current
  // useEffect(() => {
  //   console.log(123)
  //   pan.setOffset({
  //     x: 100,
  //     y: 100
  //   })
  // }, [])
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log(pan)
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        })
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ]
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset()
      }
    })
  ).current

  return (
    <View style={{ ...css.border(), position: 'absolute', zIndex: 999 }}>
      {drage === false ? <Tag
        direction={direction}
        title={title}
        childAvatar={childAvatar}
      /> : <Animated.View style={{ transform: [{ translateX: pan.x }, { translateY: pan.y }] }} {...panResponder.panHandlers}>
          <Tag
            direction={direction}
            title={title}
            childAvatar={childAvatar}
          />
        </Animated.View>}
    </View>
  )
}
export default Draggable


