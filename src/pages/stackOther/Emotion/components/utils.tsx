import {iconList} from './emotionIcon'
export const checkIconName = (name: string) => {
  const nameList = iconList.map(d=> d.name)
  return nameList.find(d=> d=== name)
}
