import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  RefreshControl,
  SafeAreaView,
  Alert,
  Clipboard,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  PanResponder,
  Button,
  Animated,
  ActivityIndicator
} from 'react-native';
import { Swipeable, RectButton } from 'react-native-gesture-handler';


export default class List extends React.Component {
  flastListKey = 0;
  state = {
    refreshing: false,
    footerRefreshing: false,
    listData: [
      {
        name: '张老师'
      },
      {
        name: '张老师1'
      },
      {
        name: '张老师2'
      },
      {
        name: '张老师3'
      }
    ]
  }
  componentWillMount() {
    this.panResponder();
  }
  componentDidMount() {
    this._onRefresh();
  }

  /* 手势处理 */
  panResponder = () => {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        console.log(gestureState)
        this.startX = gestureState.x0;
        return true;
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

        // gestureState.{x,y} 现在会被设置为0
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        // console.log(1234)

        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (this.startX <= 30 && gestureState.moveX >= 40) {
          alert('goBack');
        }
        console.log(gestureState)
        return true;

        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
        console.log(1234)
        return true;

      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    });
    console.log(this._panResponder, '2342432');
  }

  _onRefresh = () => {
    console.log('refreshing')
    // iOS和Android上都可用
    // Alert.alert(
    //   'Alert Title',
    //   'My Alert Msg',
    //   [
    //     {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
    //     {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    //     {text: 'OK', onPress: () => console.log('OK Pressed')},
    //   ],
    //   { cancelable: false }
    // )

    // this.refs.flatList.scrollToOffset({offset: -60, animated: false})
    // this.refs.flatList.scrollToOffset({offset: 0, animated: false})
    this.refreshData();
  }
  refreshData = () => {
    this.setLoading(true)

    // DO stuff

    setTimeout(() => {
      this.setLoading(false)
    }, 2000)
  }

  setLoading = (loading) => {
    let shouldResetFlatlist = this.state.refreshing && !loading

    this.setState(
      {
        refreshing: loading,
      },
      () => {
        if (shouldResetFlatlist) {
          // this.resetFlatlist()
        }
      },
    )
  }

  resetFlatlist = () => {
    if (Platform.OS === 'ios') {
      this.flatListKey = Math.random() * 1000
      setTimeout(() => {
        this.forceUpdate()
      }, 250)
    }
  }

  _onPress = async () => {
    const content = await Clipboard.getString();
    console.log(content);
  }
  _beginFooterRefresh = () => {
    this.setState({
      footerRefreshing: true
    })
  }

  _renderFooter = () => {
    return this.state.footerRefreshing ? (
      <View>
        <ActivityIndicator size="small" color="#ccc" />
      </View>
    ) : null
  }
  _renderItem = ({item, index, separators}) => {
    // console.log(separators)
    return (
      <View style={styles.item}>
        <View style={{...styles.flexRow, justifyContent: 'space-between'}}>
          <View style={styles.flexRow}>
            <Image source={{}} style={styles.photoIcon}></Image>
            <View>
              <View style={styles.flexRow}>
                <Text style={[styles.fontSize14, styles.fontBlack]}>{item.name}</Text>
                <Text onPress={this._onPress} style={[styles.fontSize12, styles.flag]}>机构</Text>
              </View>
              <Text style={[styles.fontSize12, styles.fontGray]}>2019 09/08 12:34</Text>
            </View>
          </View>
          <Text style={[styles.fontSize12, styles.fontGray]}>杭州瑞思四班</Text>
        </View>
        <View>
          <Text selectable={true} style={[styles.fontSize14, styles.fontBlack, {paddingVertical: 10}]}>今天小朋友们表现的都很棒，继续加油！</Text>
        </View>
        <View style={styles.ImageContainer}>
          <Image source={{}} style={[styles.ImageItem, {marginRight: 5}]}></Image>
          <Image source={{}} style={styles.ImageItem}></Image>
        </View>
        <TouchableHighlight
        onPress={() => {}}
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}>
        <Text>123</Text>
        </TouchableHighlight>
      </View>
    )
  }
  renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={styles.leftAction} onPress={this.close}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          Archive
        </Animated.Text>
      </RectButton>
    );
  };
  render() {
    return (
      <SafeAreaView {...this._panResponder.panHandlers} style={{flex: 1}}>
        <Swipeable 
          renderLeftActions={this.renderLeftActions}
          // leftThreshold={0}
          // rightThreshold={0}
        >
          <TouchableOpacity
            style={{borderColor: 'blue', borderWidth: 1, backgroundColor: 'red', }}
            onPress={() => this._onRefresh()}
          >
            <Text style={{textAlign: 'center', padding: 10,}}>刷新</Text>
          </TouchableOpacity>
        </Swipeable>
        <Button
          title="scrollToEnd"
          onPress={() => this.refs.flatList.scrollToEnd()}
        />
        <Button
          title="scrollToIndex"
          onPress={() => this.refs.flatList.scrollToIndex({animated: true, index: 2, viewOffset: 0, viewPosition: 1})}
        />
        <Button
          title="scrollToOffset"
          onPress={() => this.refs.flatList.scrollToOffset({animated: true, offset: 0})}
        />
        <Button
          title="flashScrollIndicators"
          onPress={() => this.refs.flatList.flashScrollIndicators()}
        />
        <Button
          title="recordInteraction"
          onPress={() => this.refs.flatList.recordInteraction()}
        />
          <FlatList 
            ref="flatList"
            scrollToOverflowEnabled={true}
            ItemSeparatorComponent={({highlighted}) => {
              // console.log(highlighted, 'highlighted')
              return <View style={[styles.separator, highlighted && {backgroundColor: 'red'}]} />
            }}
            // key={this.flatListKey}
            style={styles.scrollView}
            data={this.state.listData}
            renderItem={this._renderItem}
            horizontal={false}
            initialNumToRender={4}
            // numColumns={4}
            // inverted={true}
            // onRefresh={() => setTimeout(() => {
            //   this._onRefresh()
            // }, 300)}
            // onRefresh={this._onRefresh}
            keyExtractor={(item) => item.name} 
            // refreshing={this.state.refreshing}
            ListFooterComponent={this._renderFooter}
            onEndReachedThreshold={0.1}
            onEndReached={this._beginFooterRefresh}
            refreshControl={
              <RefreshControl
                title={'加载中...'}
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
          </FlatList>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 12
  },
  item: {
    marginBottom: 12
  },
  fontSize12: {
    fontSize: 12
  },
  fontGray: {
    color: '#7F7F7F'
  },
  fontSize14: {
    fontSize: 14
  },
  fontBlack: {
    color: '#333'
  },
  flexRow: {
    flex: 1, 
    justifyContent: 'flex-start', 
    flexDirection: 'row',
    alignItems: 'center'
  },
  photoIcon: {
    marginRight: 6,
    width: 36,
    height: 36,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  flag: {
    color: '#1277FF', 
    borderColor: '#1277FF', 
    borderWidth: 1, 
    textAlign: 'center',
    fontSize: 10,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
    marginLeft: 6
  },
  ImageContainer: {
    height: 200,
    flex: 1,
    flexDirection: 'row'
  },
  ImageItem: {
    flex: 1,
    backgroundColor: 'green',
    borderRadius: 4,
  },
  separator: {
    height: 10,
    backgroundColor: 'blue'
  }
});
