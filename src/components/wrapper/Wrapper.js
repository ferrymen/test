import Style from '../../style/06_components/_wrapper.scss'

export default {
  name: 'Wrapper',
  render(h) {
    return h(
      'div',
      {
        staticClass: Style['c-wrapper'] + ' ' + Style['u-ph--medium']
      },
      this.$slots.default
    )
  }
}