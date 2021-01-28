import React, { useState, useEffect, useRef, useCallback } from 'react';
import AddComment from '../Emotion/components/emotion2';
import Draggable from './imageTag/index'
import { View, Button, Dimensions, Text, SafeAreaView, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import css from 'src/libs/mixins/common'

const window = Dimensions.get('window') //获取手机宽度和高度


interface Props {

}
interface States {
  keyboardType: 'keyboard' | 'emotionBoard' | ''
}
const ClaimHook = () => {

  /* useState */
  const [state, setState] = useState({
    keyboardType: '',
    deleteView: false,
    imgW: 0,
    imgH: 0,
    clickedXY: {
      x: 0,
      y: 0
    },
    proportion: 1,
  })
  const [claimTagList, setClaimTagList] = useState([]);

  /* useRef */
  const addCommentRef = useRef(null);
  const boxH = useRef(null);
  const latestClaimTagList = useRef([]);

  /* useEffect */
  useEffect(() => {
    state.keyboardType === 'keyboard' && addCommentRef.current && addCommentRef.current.setFocus()
  }, [state.keyboardType])

  useEffect(() => {
    latestClaimTagList.current = claimTagList
  }, [claimTagList])
  
  /* function */
  function getImageSize(imagePath) {
    return Image.resolveAssetSource(imagePath)
  }
  function setImgWH() {
    let img = getImageSize(require('./kobe.jpeg'))
    setImageSize(img.width, img.height);
  }
  function setImageSize(width, height) {
    /* 
      比例计算：
        - 始终保持原始图片的宽高比
        - 先比较宽度，超过屏幕宽度，则定为屏幕宽度，高度按比例计算
        - 然后，比较高度，如果超过 boxH，则定为 boxH，宽度再按比例计算
        - 所以最终展示图，和原图的比例，就是高度比
        - 最终存储的数据，应该是打在原图的位置，所以要把比例也传递给后端
     */
    let ImageW = width;
    let imageH = height;
    let b = width / height;
    if (ImageW > window.width) {
      ImageW = window.width
      imageH = window.width / b;
    }
    if (imageH > boxH.current) {
      imageH = boxH.current;
      ImageW = boxH.current * b;
    }
    // console.log(imageH, ImageW)
    setState({
      ...state,
      imgH: Number(imageH),
      imgW: Number(ImageW),
      proportion: height / imageH
    });
  }
  function onPressConfirm(value) {
    const claimTagListCopy = JSON.parse(JSON.stringify(latestClaimTagList.current))
    const { clickedXY, imgW } = state;
    let direction = 'right'
    if (clickedXY.x > imgW / 2) {
      direction = 'left'
    }
    claimTagListCopy.push({
      tagTxt: value,
      tagLocation: {
        x: clickedXY.x,
        y: clickedXY.y,
        direction,
      },
      key: Number(Math.random().toString().substr(3, 4) + Date.now()).toString(36),
    })
    setClaimTagList(claimTagListCopy)
  }
  function onPressImage(e) {
    setState({
      ...state,
      keyboardType: 'keyboard',
      clickedXY: {
        x: e.nativeEvent.locationX,
        y: e.nativeEvent.locationY
      }
    })
  }
  function changeDirection(key, direction, obj) {
    const claimTagListCopy = JSON.parse(JSON.stringify(latestClaimTagList.current))
    const item = claimTagListCopy.find(item => item.key === key) || {}
    item.tagLocation.direction = direction
    item.tagLocation.x = obj.x
    setClaimTagList(claimTagListCopy)
  }
  function pressRelease(key, e, gs, deleteB) {
    const { imgW, imgH } = state
    const deletePosition = {
      x: imgW / 2 - 32,
      y: imgH - 30 - 42,
    }
    const claimTagListCopy = JSON.parse(JSON.stringify(latestClaimTagList.current))
    const tag = claimTagListCopy.find(item => item.key === key) || {}
    const idx = claimTagListCopy.findIndex(item => item.key === key)
    if (!deleteB) {
      tag.tagLocation.x = gs.x
      tag.tagLocation.y = gs.y
    } else {
      if (deletePosition.x < gs.x && gs.x < deletePosition.x + 42 && gs.y > deletePosition.y - 20 && gs.y < deletePosition.y + 20) {
        claimTagListCopy.splice(idx, 1)
      } else {
        tag.tagLocation.x = gs.x
        tag.tagLocation.y = gs.y
      }
    }
    setClaimTagList(claimTagListCopy)
  }
  function onLayout(e) {
    if (boxH.current) return
    boxH.current = e.nativeEvent.layout.height
    // 计算图片宽高，初始化的时候执行一次
    setImgWH()
  }
  const { keyboardType, x, y, deleteView, imgW, imgH } = state;
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ ...css.flexRow, flex: 1, ...css.bgColor() }}>
        <View style={{ flex: 1, ...css.flexRow }} onLayout={onLayout}>
          {
            claimTagList && claimTagList.length ?
              claimTagList.map(d =>
                <Draggable
                  boxW={imgW}
                  boxH={imgH}
                  key={d.key}
                  onPress={(e) => setState({ ...state, deleteView: e })}
                  pressDragRelease={function() {pressRelease(d.key, ...arguments)}}
                  changeDirection={function() {changeDirection(d.key, ...arguments)}}
                  x={d.tagLocation.x}
                  title={d.tagTxt}
                  direction={d.tagLocation.direction}
                  delete={d.delete}
                  childAvatar={d.tagLocation.childAvatar}
                  y={d.tagLocation.y}
                />) :
              <Draggable
                boxW={imgW}
                boxH={imgH}
                key={'1'}
                title={'点击任意位置进行认领'}
                direction={'right'}
                small={true}
                drage={false}
                x={100}
                y={50}
              />
          }
          {/* <View style={{ ...css.flexRow() }}> */}
            <TouchableWithoutFeedback onPress={onPressImage}>
              {/* <Text>123</Text> */}
              <Image resizeMode="contain" style={{ width: imgW, height: imgH }} source={require('./kobe.jpeg')}></Image>
              {/* <Image resizeMode="contain" style={{ width: imgW, height: imgH }} source={require('./kobe.jpeg')}></Image> */}
              {/* <Image resizeMode="contain" source={require('./kobe.jpeg')}></Image> */}
            </TouchableWithoutFeedback>
          </View>
          {deleteView && <View style={{ position: 'absolute', bottom: 30, width: 42, height: 42, left: imgW / 2 - 21, zIndex: 99 }}>
            <Image source={require('./icon/icon-delete.png')} style={{ width: 42, height: 42 }} />
          </View>}
        {/* </View> */}
      </SafeAreaView>
      {
        <AddComment
          commentToComponent={<></>}
          onPressConfirm={onPressConfirm}
          onRef={ref => addCommentRef.current = ref}
          setKeyboardType={(type) => setState({ ...state, keyboardType: type })}
          keyboardType={keyboardType}
        >
        </AddComment>
      }
    </View>
  )
}
export default ClaimHook


