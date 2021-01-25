/* 
  插入字符串
 */
export const insertValue = (formerValue, index, value) => {
  return formerValue.slice(0, index) + value + formerValue.slice(index);
}

/* 
  根据对象属性排序
 */
export const compare = (propertyName) => {
  return function (object1, object2) {
    var value1 = object1[propertyName];
    var value2 = object2[propertyName];
    if (value2 < value1) {
      return 1;
    } else if (value2 > value1) {
      return -1;
    } else {
      return 0;
    }
  }
}

/* 
  时间转换为分钟
 */
export const time_to_min = (time) => {
  let arr = time.split(':')
  return (~~arr[0] * 60 + ~~arr[1]);
}
/**
 * 防抖函数
 * @param fn
 * @param delay 
 */
export const debounce = (fn: Function, delay: Number) => {
  let timer: NodeJS.Timeout = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.call(this, ...arguments)
    }, delay)
  }
}
/**
 * 节流函数
 * @param fn 
 * @param delay 
 */
export const throttle = (fn: Function, delay: number = 300, immediate: boolean = false) => {
  if (!immediate) {
    let timer: NodeJS.Timeout = null
    return function () {
      if (timer) {
        return
      }
      timer = setTimeout(() => {
        fn.call(this, ...arguments)
        timer = null
      }, delay)
    }
  } else {
    let lastTime: number = 0
    return function() {
      const nowTime: number = +new Date()
      if (nowTime - lastTime >= delay) {
        fn.call(this, ...arguments)
        lastTime = nowTime
      }
    }
  }
}