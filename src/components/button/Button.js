import Style from '../../style/06_components/_button.scss'

export default {
  name: 'Button',
  props: {
    label: String
  },
  render(h) {
    return h(
      'button',
      {
        staticClass: Style['c-button'],
        on: {
          click: this.handler
        }
      },
      this.label
    )
  },
  methods: {
    handler () {
      this.$emit('on-click')
    }
  }
}