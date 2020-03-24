import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export default class Index extends Component {
  render() {
    return (
      <ScrollView>
        <Calendar
          // Collection of dates that have to be colored in a special way. Default = {}
          markedDates={{
            '2020-03-20': {textColor: 'rgba(255, 98, 20, 1)'},
            '2020-03-22': {startingDay: true, color: 'rgba(255, 98, 20, 1)', selected: true},
            '2020-03-23': {selected: true, color: 'rgba(255, 98, 20, 1)'},
            '2020-03-24': {selected: true, endingDay: true, color: 'rgba(255, 98, 20, 1)', },
            '2020-03-04': {disabled: true, startingDay: true, color: 'rgba(255, 98, 20, .1)', endingDay: true}
          }}
          // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
          markingType={'period'}
        />

        <Calendar
          // Collection of dates that have to be colored in a special way. Default = {}
          markedDates={{
            '2020-03-22': {startingDay: true, customStyles: {
              container: {
                backgroundColor: 'rgba(255, 98, 20, .1)',
                borderRadius: 0
              },
              text: {
                color: 'black',
                fontWeight: 'bold'
              }
            }
       },
            '2020-03-23': {selected: true, customStyles: {
              container: {
                backgroundColor: 'rgba(255, 98, 20, .1)',
                borderRadius: 0
              },
              text: {
                color: 'black',
                fontWeight: 'bold'
              }
            }
       },
            '2020-03-24': {selected: true, endingDay: false, customStyles: {
              container: {
                backgroundColor: 'rgba(255, 98, 20, .1)',
                borderRadius: 0
              },
              text: {
                color: 'black',
                fontWeight: 'bold'
              }
            }
       },
          }}
          // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
          markingType={'custom'}
        />

        <Calendar
          // Collection of dates that have to be colored in a special way. Default = {}
          renderItem={(day, firstItemInDay) => {
            return <View>234</View> 
          }}
          dayComponent={({date, state}) => {
            return (
              <View style={{backgroundColor: 'yellow'}}>
                <Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>
                  {date.day}
                </Text>
              </View>
            )
          }}
          // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({})
