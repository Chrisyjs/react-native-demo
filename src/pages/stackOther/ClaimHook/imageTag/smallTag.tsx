import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';

class SamllTag extends React.PureComponent {
  changeDirection =(Direction)=> {
    if (this.props.changeDirection) {
      this.props.changeDirection(Direction)
    }
  }
  render() {
    const {direction, setTagSize, changeDirection, title, childAvatar} = this.props;
    return (
      <View
        onLayout={setTagSize}
        style={{alignItems:'center',flexDirection:'row'}}>
        {direction === 'right' && (
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <Image style={styles.drageIconRight} source={require('./icon/icon-c.png')} />
            <View style={styles.drageIconW} />
          </View>)}
        <View style={styles.drageBox} >
          {!!childAvatar && <Image style={{width:16,height:16,marginLeft:3,borderRadius:2}} source={{uri:childAvatar}} />}
          <Text style={styles.drageBoxText}>{title}</Text>
        </View>
        {direction === 'left' && <TouchableOpacity onPress={this.changeDirection.bind(this,'right')} activeOpacity={0.9}><View style={{flexDirection: 'row',alignItems: 'center'}}>
          <View style={styles.drageIconW} />
          <Image style={styles.drageIconLeft} source={require('./icon/icon-c.png')} />
          </View>
        </TouchableOpacity>}
      </View>
    );
  }
}

export default SamllTag;

const styles = StyleSheet.create({
  drageIconRight: {
    width: 12,
    height: 12,
    marginRight: -3,
  },
  drageIconLeft: {
    width: 12,
    height: 12,
    marginLeft: -3,
  },
  drageIconW: {
    height: 1,
    width: 14,
    backgroundColor: '#fff',
  },
  drageBox: {
    backgroundColor: 'rgba(136, 136, 136, 0.4)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
  },
  drageBoxText: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 18,
    paddingHorizontal: 4
  },
})