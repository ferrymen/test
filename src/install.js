import * as components from './components'
import * as plugins from'./plugins'

export default function BellUI(_Vue) {

  if (!_Vue.prototype.$UI) {
    _Vue.prototype.$UI = {}
  }

  // 注册组件
  let c = {}
  Object.keys(components).forEach((key) => {
    c = components[key]
    
    if (c.name) {
      _Vue.component(c.name, c)
    }
  })

  Object.values(plugins).forEach(el => {
    _Vue.use(el)
  })
}
