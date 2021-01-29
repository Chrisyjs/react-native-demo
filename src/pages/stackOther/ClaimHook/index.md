#### 注意点

- rn
  - 拖拽
    - 手势响应系统：https://reactnative.cn/docs/gesture-responder-system
    - https://reactnative.cn/docs/panresponder

  - flex 布局
    - 默认 flexDirection 是 column，所以这时候 flex: 1 表示纵向铺满

- 图片比例计算
  - 始终保持原始图片的宽高比
  - 先比较宽度，超过屏幕宽度，则定为屏幕宽度，高度按比例计算
  - 然后，比较高度，如果超过 boxH，则定为 boxH，宽度再按比例计算
  - 所以最终展示图，和原图的比例，就是高度比
  - 最终存储的数据，应该是打在原图的位置，所以要把比例也传递给后端

- hooks 使用
  - claimTagList 在拖拽等函数中使用时，取不到最新值，需要用 useRef、useEffect 存储