import Style from '../../style/06_components/_list-item.scss'

export default {
  name: 'ListItem',
  render(h) {
    let _staticClass = ['c-list__item', 'u-pv--medium', 'u-ph--small', 'u-bg-color--white']
    _staticClass = _staticClass.map(key => {
      return Style[key]
    })
    return h(
      'li',
      {
        staticClass: _staticClass.join(' ')
      },
      this.$slots.default
    )
  }
}