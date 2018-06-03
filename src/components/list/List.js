import Style from '../../style/06_components/_list.scss'

export default {
  name: 'List',
  render(h) {
    return h(
      'ul',
      {
        staticClass: Style['c-list--bare']
      },
      this.$slots.default
    )
  }
}