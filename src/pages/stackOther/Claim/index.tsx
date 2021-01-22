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
    this.setImgWH()
  }
  componentWillUnmount() {
  }
  getImageSize(imagePath) {
    return Image.resolveAssetSource(imagePath)
  }
  setImgWH() {
    let img = this.getImageSize(require('./bg1.jpg'))
    this.setImageSize(img.width, img.height);
  }
  setImageSize = (width, height) => {
    let ImageW = width;
    let imageH = height;
    let b = width / height;
    if (ImageW > window.width) {
      ImageW = window.width
      imageH = window.width / b;
    }
    if (imageH > this.state.boxH) {
      imageH = this.state.boxH;
      ImageW = this.state.boxH * b;
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
    if(clickedXY.x > imgW/2) {
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
        key: Number(Math.random().toString().substr(3,4) + Date.now()).toString(36),
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
  changeDirection = (key) => {
    const { claimTagList } = this.state
    const item = claimTagList.find(item => item.key === key)
    item.tagLocation.direction = item.tagLocation.direction === 'left' ? 'right' : 'left'
    this.setState({})
  }
  render() {
    const { keyboardType, x, y, deleteView, imgW, imgH, claimTagList } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ ...css.flexRow, flex: 1 }}>
          <View style={{ ...css.bgColor() }}>
            {
              claimTagList && claimTagList.length ?
                claimTagList.map(d =>
                  <Draggable
                    boxW={imgW}
                    boxH={imgH}
                    key={d.key}
                    onPress={(e) => this.setState({ deleteView: e })}
                    // pressDragRelease={this.pressRelease.bind(this, d.key)}
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
            <TouchableWithoutFeedback onPress={this.onPressImage}>
              <Image resizeMode="contain" style={{ width: imgW, height: imgH }} source={require('./bg1.jpg')}></Image>
            </TouchableWithoutFeedback>
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



