import Style from '../../style/06_components/_card.scss'

export default {
  name: 'Card',
  props: {
    width: [String, Number],
    height: {
      type: String,
      default: 'auto'
    },
    img: String,
    bgColor: String
  },
  computed: {
    styles() {
      const style = {
        height: isNaN(this.height) ? this.height : `${this.height}px`
      }
      console.log(this.bgColor)
      if (this.img) {
        style.background = `url("${this.img}") center center / cover no-repeat`
      } else if (this.bgColor) {
        style.background = Style[`color-${this.bgColor}`]
      }

      if (this.width) {
        style.width = isNaN(this.width) ? this.width : `${this.width}px`
      }

      return style
    },
  },
  render(h) {
    return h(
      'div',
      {
        staticClass: Style['c-card'],
        style: this.styles
      },
      this.$slots.default
    )
  }
}