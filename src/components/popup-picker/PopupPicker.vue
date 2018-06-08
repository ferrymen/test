<template>
  <div class="c-popup-picker">
    <div v-transfer>
      <Popup>
        <div class="c-popup-picker-container">
          <PopupHeader>
            
          </PopupHeader>
          <Picker
            v-model="tempValue"
            :data="data"
          >

          </Picker>
        </div>
      </Popup>
    </div>
  </div>
</template>

<script>
import Transfer from '../../directives/transfer'
import { Picker } from '../picker'

const getObject = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}

export default {
  name: 'PickerSelect',
  directives: {
    Transfer
  },
  components: {
    Picker
  },
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      tempValue: getObject(this.value)
    }
  }
}
</script>
