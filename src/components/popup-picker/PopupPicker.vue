<template>
  <div class="c-popup-picker">
    <div class="c-popup-picker__label" @click="onClick">
      <div class="c-popup-picker__text">
        <span v-if="value.length" class="c-popup-picker__value">{{value | array2string }}</span>
        <span v-if="!value.length && placeholder" v-text="placeholder" class="c-popup-picker__placeholder"></span>
      </div>
      <div class="c-popup-picker__icon">></div>
    </div>

    <div v-transfer>
      <Popup
        v-model="showValue"
      >
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
import array2string from '../../filters/array2String'
import { Picker } from '../picker'

const getObject = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}

export default {
  name: 'PopupPicker',
  directives: {
    Transfer
  },
  filters: {
    array2string
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
    placeholder: String,
    disabled: Boolean
  },
  data () {
    return {
      tempValue: getObject(this.value),
      showValue: false
    }
  },
  methods: {
    onHide (type) {
      this.showValue = false
      if (type) {
        this.closeType = true
        this.currentValue = getObject(this.tempValue)
      }
      if (!type) {
        this.closeType = false
        if (this.value.length > 0) {
          this.tempValue = getObject(this.currentValue)
        }
      }
    },
    onClick () {
      if (!this.disabled) {
        this.showValue = true
      }
    }
  }
}
</script>

<style>
  .c-popup-picker__label {
    padding: 10px 15px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .c-popup-picker__text {
    width: 100%;
    position: relative;
    text-align: right;
  }
  .c-popup-picker__icon {
    padding-right: 13px;
    position: relative;
    text-align: right;
    color: #999999;
  }
</style>
