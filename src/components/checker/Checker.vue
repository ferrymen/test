<template>
  <div class="c-checker">
    <slot></slot>
  </div>
</template>

<script>
import Style from '../../style/06_components/_checker.scss'

export default {
  name: 'Checker',
  props: {
    value: [String, Number, Array, Object],
    defaultItemClass: String,
    selectedItemClass: String,
    type: {
      type: String,
      default: 'radio'
    },
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value (newValue) {
      this.currentValue = newValue
    },
    currentValue (val) {
      this.$emit('input', val) // 触发watch下的value更新
      this.$emit('on-change', val)
    }
  }
}
</script>
