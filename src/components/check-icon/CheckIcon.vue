<template>
  <div class="c-check-icon" @click="updateValue">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CheckIcon',
  methods: {
    updateValue () {
      this.$emit('update:values', !this.values)
    }
  },
  props: {
    values: {
      type: Boolean,
      default: false
    }
  }
}
</script>

