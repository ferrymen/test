import Style from '../../style/06_components/_button.scss'

export default {
  name: 'Button',
  render(h) {
    return h(
      'button',
      {
        staticClass: Style['c-button']
      },
      this.$slots.default
    )
  }
}