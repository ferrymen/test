import Style from '../../style/06_components/_grid-item.scss'

export default {
  name: 'GridItem',
  render(h) {
    return h(
      'div',
      {
        staticClass: Style['c-grid__item']
      },
      this.$slots.default
    )
  }
}