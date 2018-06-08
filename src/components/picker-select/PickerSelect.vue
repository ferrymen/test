<template>
  <div class="c-picker-select">
    <div v-transfer>
      <div class="c-picker-select__trans">
        <Picker></Picker>
      </div>
    </div>
  </div>
</template>

<script>
import Transfer from '../../directives/transfer'
import { Picker } from '../picker'

export default {
  name: 'PickerSelect',
  directives: {
    Transfer
  },
  components: {
    Picker
  }
}
</script>
