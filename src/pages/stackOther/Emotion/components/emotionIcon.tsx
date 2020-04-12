import React from 'react';
import { View, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
var {width} =  Dimensions.get('window');
export const iconList = [
  {
    name: '[害羞]',
    path: require('../icon/icon-1.png')
  },
  {
    name: '[吃惊]',
    path: require('../icon/icon-2.png')
  },
  {
    name: '[撇嘴]',
    path: require('../icon/icon-3.png')
  },
  {
    name: '[调皮]',
    path: require('../icon/icon-4.png')
  },
  {
    name: '[难过]',
    path: require('../icon/icon-5.png')
  },
  {
    name: '[亲亲]',
    path: require('../icon/icon-6.png')
  },
  {
    name: '[愣神]',
    path: require('../icon/icon-7.png')
  },{
    name: '[大哭]',
    path: require('../icon/icon-8.png')
  },
  {
    name: '[微笑]',
    path: require('../icon/icon-9.png')
  },
  {
    name: '[笑哭]',
    path: require('../icon/icon-10.png')
  },
  {
    name: '[生气]',
    path: require('../icon/icon-11.png')
  },
  {
    name: '[得意]',
    path: require('../icon/icon-12.png')
  },
  {
    name: '[衰鬼]',
    path: require('../icon/icon-13.png')
  },
  {
    name: '[呕吐]',
    path: require('../icon/icon-14.png')
  },
  {
    name: '[委屈]',
    path: require('../icon/icon-15.png')
  },
  {
    name: '[生病]',
    path: require('../icon/icon-16.png')
  },
  {
    name: '[鼻涕]',
    path: require('../icon/icon-17.png')
  },
  {
    name: '[石化]',
    path: require('../icon/icon-18.png')
  }
]
interface Props {
  callback: Function,
  height: number
}
class Emoticon extends React.Component <Props> {
  constructor(props: Props) {
    super(props);
  }
  callbackName = (name: string) => {
    this.props.callback(name)
  }
  render () {
    const boxWidth = width/6;
    const { height } = this.props;
    return (
      <ScrollView>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingTop: 24, height: height}}>
          {
            iconList.map((d,k) => 
              <TouchableOpacity key={k} style={{marginBottom: 18, width: boxWidth, alignItems: 'center'}} onPress={()=> this.callbackName(d.name)} >
                <Image source={d.path} />
              </TouchableOpacity>
            )
          }
        </View>
      </ScrollView>
    )
  }
}
export default Emoticon