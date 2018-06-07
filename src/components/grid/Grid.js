import Style from '../../style/06_components/_grid.scss'
console.log(Style)
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