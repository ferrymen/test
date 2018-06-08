<template>
  <div class="c-check-item" @click="select">
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
