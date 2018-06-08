<template>
  <div :class="{[Style['c-switcher']]: true}">
    <input type="checkbox"
      :class="{
        [Style['c-switcher__checkbox']]: true,
        [Style['c-switcher__appearance']]: true
      }"
      v-model="currentValue"
    >
  </div>
</template>

<script>
import Style from '../../style/06_components/_switcher.scss'

export default {
  name: 'Switcher',
  data () {
    return {
      Style,
      currentValue: this.toBoolean(this.value)
    }
  },
  props: {
    disabled: Boolean,
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    valueMap: {
      type: Array,
      default: () => ([false, true])
    }
  },
  methods: {
    toBoolean (val) {
      if (!this.valueMap) {
        return val
      } else {
        const index = this.valueMap.indexOf(val)
        return index === 1
      }
    },
    toRaw (val) {
      if (!this.valueMap) {
        return val
      } else {
        return this.valueMap[val ? 1 : 0]
      }
    }
  },
  watch: {
    value (val) {
      this.currentValue = this.toBoolean(val)
    },
    currentValue (val) {
      const rawValue = this.toRaw(val)
      this.$emit('input', rawValue)
      this.$emit('on-change', rawValue)
    },
  }
}
</script>
