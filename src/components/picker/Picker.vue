<template>
  <div class="c-picker">
    <FlexBox>
      <FlexBoxItem></FlexBoxItem>
    </FlexBox>
  </div>
</template>

<script>
export default {
  name: 'Picker',
  props: {
    value: Array,
    data: Array
  },
  created () {
    console.log(this)
  }
}
</script>
