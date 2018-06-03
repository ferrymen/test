import Style from '../../style/06_components/_app.scss'

export default {
  name: 'App',
  props: {
    padded: {
      type: Boolean,
      default: false
    }
  },
  render (h) {
    console.log(this)
    return h(
      'div',
      {
        staticClass: Style['c-app']
      },
      [
        h(
          'div',
          {
            staticClass: Style['c-app__wrap'],
            class: {[Style['c-app__wrap--soft']]: this.padded}
          },
          this.$slots.default
        )
      ]
    )
  }
}