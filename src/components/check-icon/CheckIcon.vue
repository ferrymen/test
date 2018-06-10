<template>
  <div class="c-check-icon" @click="updateValue">
    <i class="c-check-icon--success" v-show="type === 'default' && values"></i>
    <i class="c-check-icon--circle" v-show="!values"></i>
    <span><slot></slot></span>
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
    },
    type: {
      type: String,
      default: 'default'
    }
  }
}
</script>

<style>
.c-check-icon--success:before, .c-check-icon--circle:before {
  content: ' ';
  width: 24px;
  height: 24px;
  background-color: #efefef; /* Can be set to transparent */
  border: 1px #ccc solid;
  -moz-border-radius: 12px;
  -webkit-border-radius: 12px;
  border-radius: 12px;
  display: inline-block;
}
.c-check-icon--success:before {
  color: #09BB07 !important;
  background-color: #09BB07 !important; 
}
</style>
