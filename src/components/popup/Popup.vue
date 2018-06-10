<template>
  <transition
    :name="`c-popup-animate--${position}`"
  >
    <div
      class="c-popup"
      v-show="show"
      :style="styles"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import Popuper from './popuper'

export default {
  name: 'Popup',
  props: {
    value: Boolean,
    showMask: {
      type: Boolean,
      default: true
    },
    hideOnBlur: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: 'auto'
    },
    width: {
      type: String,
      default: 'auto'
    },
    position: {
      type: String,
      default: 'bottom'
    }
  },
  data () {
    return {
      // initialShow: false,
      show: this.value
    }
  },
  computed: {
    styles () {
      const styles = {}
      if (!this.position || this.position === 'bottom' || this.position === 'top') {
        styles.height = this.height
      } else {
        styles.width = this.width
      }

      return styles
    }
  },
  watch: {
    value (val) {
      this.show = val
    },
    show (val) {
      this.$emit('input', val)
      if (val) {
        this.doShow()
      } else {
        this.$emit('on-hide')
        this.show = false
        this.popup.hide(false)
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      const _this = this

      this.popup = new Popuper({
        showMask: _this.showMask,
        container: _this.$el,
        hideOnBlur: _this.hideOnBlur,
        onClose () {
          _this.show = false
          if (window.__$Popups && Object.keys(window.__$Popups).length > 1) return
          if (document.querySelector('.c-popup-dialog.c-popup-mask-disabled')) return
        }
      })

      if (this.value) {
        this.popup.show()
      }
    })
  },
  beforeDestroy () {
    // this.popup && this.popup.destroy()
  },
  methods: {
    doShow () {
      this.popup && this.popup.show()
      this.$emit('on-show')
      // this.fixSafariOverflowScrolling('auto')
      // this.layout === 'VIEW_BOX' && dom.addClass(document.body, 'vux-modal-open')
      // if (!this.hasFirstShow) {
      //   this.$emit('on-first-show')
      //   this.hasFirstShow = true
      // }
    }
  }
}
</script>

<style>
.c-popup {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #eee;
  z-index: 501;
  -webkit-transition-property: -webkit-transform;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  max-height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.c-popup-mask {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    tap-highlight-color: rgba(0, 0, 0, 0);
    z-index: -1;
    -webkit-transition: opacity 400ms;
    transition: opacity 400ms;
}

.c-popup-mask.c-popup-show {
    opacity: 1;
}

.c-popup-animate--bottom-enter, .c-popup-animate--bottom-leave-active {
  transform: translate3d(0, 100%, 0);
}
</style>

