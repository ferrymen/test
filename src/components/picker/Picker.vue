<template>
  <div class="c-picker">
    <FlexBox>
      <FlexBoxItem v-for="(one, index) in currentData" :key="index"></FlexBoxItem>
    </FlexBox>
  </div>
</template>

<script>
import Manager from './chain'

export default {
  name: 'Picker',
  props: {
    value: Array,
    data: Array
  },
  data () {
    return {
      currentData: this.data,
      currentValue: this.value
    }
  },
  created () {
    if (this.columns !== 0) {
      const length = this.columns
      this.store = new Manager(this.data, length, this.fixedColumns || this.columns)
      this.currentData = this.store.getColumns(this.value)
    }
    console.log(this.currentData)
  }
}
</script>
