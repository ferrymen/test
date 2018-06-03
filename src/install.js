import * as components from './components'

export default function BellUI(_Vue) {
  // 注册组件
  let c = {}
  Object.keys(components).forEach((key) => {
    c = components[key]
    
    if (c.name) {
      _Vue.component(c.name, c)
    }
  })
}
