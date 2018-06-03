import * as components from './components'

export default function BellUI(_Vue) {
  let c = {}
  Object.keys(components).forEach((key) => {
    c = components[key]
    
    if (c.name) {
      _Vue.component(c.name, c)
    }
  })
}
