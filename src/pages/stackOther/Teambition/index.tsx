import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView } from 'react-native'
import { compare, time_to_min } from 'src/libs/util/index';
import css from 'src/libs/mixins/common'
import _ from 'lodash'
const timeArr = [
  {
    startTime: '00:00',
    endTime: '01:00'
  },
  {
    startTime: '00:00',
    endTime: '00:20'
  },
  {
    startTime: '00:20',
    endTime: '00:40'
  },
  {
    startTime: '00:25',
    endTime: '00:55'
  },
]

export default class index extends Component {
  private rowsNum: number = 0;
  constructor(props) {
    super(props);
    this.state = {
      timeArr: []
    }
  }
  componentDidMount() {
    let t = timeArr.map(item => (
      {
        startMin: time_to_min(item.startTime),
        endMin: time_to_min(item.endTime),
        // startTime: item.startTime,
        // endTime: item.endTime
      }
    ))
    this.transformData(t);
  }
  transformData = (timeArr: any[]) => {
    let t = this.sortTimes(timeArr);
    console.log(t, '123343242342')
    this.getAllRowData(t);
    this.setState({
      timeArr: t
    })
  }
  /* 
    获取属于一排的数据
   */
  getAllRowData = (timeArr: any[]) => {
    let arr: any[] = [];
    let i = 0;  // rowsNum
    let i1 = 0;
    arr[i] = [timeArr[i1]];
    timeArr.forEach((item, idx) => {
      if (idx < timeArr.length - 1) {
        let isIntersect = this.isIntersect(timeArr[i1], timeArr[idx + 1])
        if (isIntersect) {
          console.log(i, timeArr[idx + 1])
          arr[i].push(timeArr[idx + 1]);
          // console.log(arr[i], '123')
        } else {
          // console.log(arr, 'aaa');
          i += 1;
          i1 = idx + 1;
          arr[i] = [timeArr[i1]];
        }
      }
    })
    console.log(arr);
  }
  /* 
    判断是否相交
   */
  isIntersect = (a, b) => {
    if (a.endMin <= b.startMin || b.endMin <= a.startMin) {  // 不相交
      return false;
    }
    // console.log(a, b)
    return true;
  }
  sortTimes = (timeArr: any[]) => {
    timeArr = _.sortBy(timeArr, ['startMin', 'endMin']);
    return timeArr;
  }
  render() {
    const { timeArr } = this.state;
    // console.log(timeArr)
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={[{flex: 1,}]}>
          {
            timeArr.map((item, idx) => {
              const { startMin, endMin, startTime, endTime } = item;
              return (
                <View key={idx} style={[{width: 100, height: endMin - startMin, ...css.border()}]}>
                  <Text>{startTime}</Text>
                  <Text>{endTime}</Text>
                </View>
              )
            })
          }
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    // position: 'relative',
    // top: 0,
    // left: 0,
    width: 100, 
    height: 100,
    ...css.border(),
    ...css.bgColor('blue')
  }
})
