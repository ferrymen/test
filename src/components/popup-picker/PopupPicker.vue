<template>
  <div class="c-popup-picker">
    <div v-transfer>
      <Popup>
        <div class="c-popup-picker-container">
          <PopupHeader
            :left-text="cancelText"
            :right-text="confirmText"
            :title="popupTitle"
             @on-click-left="onHide(false)"
             @on-click-right="onHide(true)">
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
  name: 'PopupPicker',
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
    },
    title: String,
    cancelText: String,
    confirmText: String,
    popupTitle: String,
  },
  data () {
    return {
      tempValue: getObject(this.value)
    }
  },
  methods: {
    onHide (type) {

    }
  }
}
</script>
