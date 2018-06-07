import Style from '../../style/06_components/_list.scss'

export default {
  name: 'List',
  props: {
    border: String
  },
  computed: {
    classes() {
      const _class = {}
      if (this.border) {
        _class[Style[`c-list__border--${this.border}`]] = true
      }
      return _class
    }
  },
  render(h) {
    return h(
      'ul',
      {
        staticClass: Style['c-list--bare'],
        class: this.classes
      },
      this.$slots.default
    )
  }
}