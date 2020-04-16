import {iconList} from './emotionIcon'
export const checkIconName = (name: string) => {
  const nameList = iconList.map(d=> d.name)
  return nameList.find(d=> d=== name)
}
/* 
  插入字符串
 */
export const insertValue = (formerValue, index, value) => {
  return formerValue.slice(0, index) + value + formerValue.slice(index);
}