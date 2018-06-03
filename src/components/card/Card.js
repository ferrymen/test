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
    bgColor: String,
    aligns: {
      type: Array,
      default: []
    }
  },
  computed: {
    classes() {
      const c_classes = {
        [Style[`u-bg-color--${this.bgColor}`]]: true
      }
      this.aligns.forEach(el => {
        c_classes[Style[`u-align--${el}`]] = true
      });
      return c_classes
    },
    oStyles() {
      const style = {
        height: isNaN(this.height) ? this.height : `${this.height}px`
      }

      if (this.img) {
        style.background = `url("${this.img}") center center / cover no-repeat`
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
        style: this.oStyles,
        class: this.classes
      },
      this.$slots.default
    )
  }
}