<template>
  <div class="c-check-item" :class="classNames2" :style="styles" @click="select">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CheckerItem',
  props: {
    value: {
      type: [String, Number, Object],
      required: true
    }
  },
  computed: {
    styles () {
      console.log('styles')
      // const isSimpleValue = typeof this.value === 'string' || typeof this.value === 'number'
      const styles = {}
      if (this.$parent.currentValue && this.$parent.currentValue == '2') {
        styles.fontSize = '24px'
      }
      return styles
    },
    classNames2 () {
      console.log('classNames')
      const isSimpleValue = typeof this.value === 'string' || typeof this.value === 'number'
      const names = {
        'vux-tap-active': !this.disabled
      }
      if (this.$parent.defaultItemClass) {
        names[this.$parent.defaultItemClass] = true
      }

      if (this.$parent.selectedItemClass) {
        let selected = false
        if (this.$parent.type === 'radio') {
          if (isSimpleValue && this.$parent.currentValue === this.value) {
            selected = true
          } else if (typeof this.value === 'object' && isEqual(this.$parent.currentValue, this.value)) {
            selected = true
          }
        } else {
          if (typeof this.value === 'string') {
            if (this.$parent.currentValue.indexOf(this.value) > -1) {
              selected = true
            }
          } else if (this.$parent.currentValue && this.$parent.currentValue.length) {
            const match = this.$parent.currentValue.filter(one => {
              return isEqual(one, this.value)
            })
            selected = match.length > 0
          }
        }
        names[this.$parent.selectedItemClass] = selected
      }

      if (this.$parent.disabledItemClass) {
        names[this.$parent.disabledItemClass] = this.disabled
      }

      return names
    }
  },
  methods: {
    select () {
      if (!this.disabled) {
        if (this.$parent.currentValue === this.value) {
          if (!this.$parent.radioRequired) {
            this.$parent.currentValue = ''
          }
        } else {
          this.$parent.currentValue = this.value
        }
      }
      this.$emit('on-item-click', this.value, this.disabled)
    }
  }
}
</script>
