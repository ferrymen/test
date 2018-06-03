import Style from '../../style/06_components/_section.scss'

export default {
  name: 'Section',
  props: {
    size: {
      type: String,
      default: 'sm'
    }
  },
  render(h) {
    return h(
      'div',
      {
        staticClass: Style[`c-section-${this.size}`]
      },
      this.$slots.default
    )
  }
}