<template>
  <transition>
    <div
      class="c-popup"
      v-show="show"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    value: Boolean,
  },
  data () {
    return {
      // initialShow: false,
      show: this.value
    }
  },
  watch: {
    value (val) {
      this.show = val
    },
    show (val) {
      // this.$emit('input', val)
      // if (val) {
      //   this.doShow()
      // } else {
      //   this.$emit('on-hide')
      //   this.show = false
      //   // this.popup.hide(false)
      // }
    }
  },
  methods: {
    doShow () {
      // console.log(this.popup)
      // this.popup && this.popup.show()
      // this.$emit('on-show')
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
</style>

