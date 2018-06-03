import Style from '../../style/06_components/_grid.scss'

export default {
  name: 'Grid',
  render(h) {
    return h(
      'div',
      {
        staticClass: Style['c-grid']
      },
      this.$slots.default
    )
  }
}