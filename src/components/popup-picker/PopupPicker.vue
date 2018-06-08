<template>
  <div class="c-popup-picker">
    <div v-transfer>
      <Popup>
        <div class="c-popup-picker-container">
          <PopupHeader>
            
          </PopupHeader>
          <Picker>
            
          </Picker>
        </div>
      </Popup>
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
