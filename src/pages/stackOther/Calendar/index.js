import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markedDates: {
        ['2020-04-01']: {
          selected: true,
          startingDay: true,
          color: '#FFEFE7',
        },
        ['2020-04-02']: {
          selected: true,
          color: '#FFEFE7',
        },
        ['2020-04-03']: {
          selected: true,
          endingDay: true,
          color: '#FFEFE7',
        }
      }
    }
  }
  render() {
    const { markedDates } = this.state;
    return (
      <View>
      {/* CalendarList */}
      <CalendarList
        pastScrollRange={1}
        futureScrollRange={1}
        markedDates={markedDates}
        markingType={'period'}
        onDayPress={(day) => this.setState({
          markedDates: {
            [day.dateString]: {
              selected: true,
              color: 'orange',
              startingDay: true,
              endingDay: true
              // marked: true
            }
          }
        })}
        // dayComponent={({date, state}) => {
        //   return (<Text>{date.day}</Text>)
        // }}
        onDayChange={(day) => console.log(day, 'onDayChange')}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: 'orange',
          selectedDayTextColor: 'blue',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          disabledArrowColor: '#d9e1e8',
          monthTextColor: 'blue',
          indicatorColor: 'blue',
          // textDayFontFamily: 'monospace',
          // textMonthFontFamily: 'monospace',
          // textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
      ></CalendarList>
    </View>
    )
  }
}

const styles = StyleSheet.create({})
