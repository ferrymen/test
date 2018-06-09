// https://github.com/fjc0k/vue-css-modules.git
import { INJECTED } from './config'
import createElement from './create-element'
import Style from '../../style/_bootstrap.scss'

export default {
  beforeCreate() {
    if (this[INJECTED]) return

    this[INJECTED] = true

    this.$createElement = createElement.bind(this, {
      createElement: this.$createElement,
      context: this,
      styles: Style
    })
    this._c = createElement.bind(this, {
      createElement: this._c,
      context: this,
      styles: Style
    })
  }
}