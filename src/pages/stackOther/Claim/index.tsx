import React from 'react';
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

export default class Other extends React.Component {
  private boxH: number = 0;
  private init: boolean = true;
  constructor(props: Props) {
    super(props);
    this.state = {
      keyboardType: '',
      deleteView: false,
      imgW: 0,
      imgH: 0,
      clickedXY: {
        x: 0,
        y: 0
      },
      proportion: 1,
      claimTagList: []
    }
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  getImageSize(imagePath) {
    return Image.resolveAssetSource(imagePath)
  }
  setImgWH() {
    let img = this.getImageSize(require('./kobe.jpeg'))
    this.setImageSize(img.width, img.height);
  }
  setImageSize = (width, height) => {
    const { boxH } = this
    let ImageW = width;
    let imageH = height;
    let b = width / height;
    if (ImageW > window.width) {
      ImageW = window.width
      imageH = window.width / b;
    }
    if (imageH > boxH) {
      imageH = boxH;
      ImageW = boxH * b;
    }
    // console.log(imageH, ImageW)
    this.setState({
      imgH: Number(imageH),
      imgW: Number(ImageW),
      proportion: height / imageH
    });
  }
  handlePress() {
    this.setState({
      keyboardType: 'keyboard'
    }, () => {
      this.addComment && this.addComment.setFocus()
    })
  }
  onPressConfirm = (value) => {
    const { clickedXY, claimTagList, imgW } = this.state;
    let direction = 'right'
    if (clickedXY.x > imgW / 2) {
      direction = 'left'
    }
    // console.log(clickedXY.x, imgW)
    // console.log(direction, 'hhhhh')
    this.setState({
      claimTagList: [...claimTagList, {
        tagTxt: value,
        tagLocation: {
          x: clickedXY.x,
          y: clickedXY.y,
          direction,
        },
        key: Number(Math.random().toString().substr(3, 4) + Date.now()).toString(36),
      }]
    })
  }
  onPressImage = (e) => {
    this.setState({
      keyboardType: 'keyboard',
      clickedXY: {
        x: e.nativeEvent.locationX,
        y: e.nativeEvent.locationY
      }
    }, () => {
      this.addComment && this.addComment.setFocus()
    })
  }
  changeDirection = (key, direction, obj) => {
    const { claimTagList } = this.state
    const item = claimTagList.find(item => item.key === key) || {}
    item.tagLocation.direction = direction
    item.tagLocation.x = obj.x
    this.setState({})
  }
  pressRelease(key, e, gs, deleteB) {
    const { imgW, imgH, claimTagList } = this.state
    const deletePosition = {
      x: imgW / 2 - 32,
      y: imgH - 30 - 42,
    }
    const tag = claimTagList.find(item => item.key === key) || {}
    const idx = claimTagList.findIndex(item => item.key === key)
    if (!deleteB) {
      tag.tagLocation.x = gs.x
      tag.tagLocation.y = gs.y
    } else {
      if (deletePosition.x < gs.x && gs.x < deletePosition.x + 42 && gs.y > deletePosition.y - 20 && gs.y < deletePosition.y + 20) {
        claimTagList.splice(idx, 1)
      } else {
        tag.tagLocation.x = gs.x
        tag.tagLocation.y = gs.y
      }
    }
    this.setState({})
  }
  onLayout = (e) => {
    this.boxH = e.nativeEvent.layout.height
    // 计算图片宽高，初始化的时候执行一次
    this.init && this.setImgWH()
    this.init = false;
  }
  render() {
    const { keyboardType, x, y, deleteView, imgW, imgH, claimTagList } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ ...css.flexRow, flex: 1, ...css.bgColor() }}>
          <View style={{ flex: 1, ...css.flexRow}} onLayout={this.onLayout}>
            {
              claimTagList && claimTagList.length ?
                claimTagList.map(d =>
                  <Draggable
                    boxW={imgW}
                    boxH={imgH}
                    key={d.key}
                    onPress={(e) => this.setState({ deleteView: e })}
                    pressDragRelease={this.pressRelease.bind(this, d.key)}
                    changeDirection={this.changeDirection.bind(this, d.key)}
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
            <View style={{...css.flexRow()}}>
              <TouchableWithoutFeedback onPress={this.onPressImage}>
                {/* <Text>123</Text> */}
                <Image resizeMode="contain" style={{ width: imgW, height: imgH }} source={require('./kobe.jpeg')}></Image>
                {/* <Image resizeMode="contain" style={{ width: imgW, height: imgH }} source={require('./kobe.jpeg')}></Image> */}
                {/* <Image resizeMode="contain" source={require('./kobe.jpeg')}></Image> */}
              </TouchableWithoutFeedback>
            </View>
            {deleteView && <View style={{ position: 'absolute', bottom: 30, width: 42, height: 42, left: imgW / 2 - 21, zIndex: 99 }}>
              <Image source={require('./icon/icon-delete.png')} style={{ width: 42, height: 42 }} />
            </View>}
          </View>
        </SafeAreaView>
        {
          <AddComment
            commentToComponent={<></>}
            onPressConfirm={this.onPressConfirm}
            onRef={(ref) => this.addComment = ref}
            setKeyboardType={(type) => this.setState({ keyboardType: type })}
            keyboardType={keyboardType}
          >
          </AddComment>
        }
      </View>
    )
  }
}



