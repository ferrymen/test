<template>
  <div class="c-date">
    <slot>
      <div>
        <slot name="title">
          <p
            v-html="title"
          >
          </p>
        </slot>
      </div>
      <div class="c-date__value" style="text-align: right">
        <span
          class="c-date__value--placeholder"
          v-if="!currentValue && placeholder"
        >
          {{ placeholder }}
        </span>
        <span
          class="c-date__value--label"
          v-if="currentValue"
        >
          {{ currentValue }}
        </span>
        <span>></span>
      </div>
    </slot>
  </div>
</template>

<script>
import DatePicker from './date-picker'
import Uuid from '../../mixins/uuid'

export default {
  name: 'Date',
  mixins: [Uuid],
  props: {
    format: {
      type: String,
      default: 'YYYY-MM-DD',
      validator (val) {
        return true
      }
    },
    title: String,
    value: {
      type: String,
      default: ''
    },
    placeholder: String,
    minYear: Number,
    maxYear: Number,
    confirmText: String,
    cancelText: String,
    clearText: String,
    yearRow: {
      type: String,
      default: '{value}'
    },
    monthRow: {
      type: String,
      default: '{value}'
    },
    dayRow: {
      type: String,
      default: '{value}'
    },
    show: Boolean,
  },
  data () {
    return {
      currentValue: null
    }
  },
  computed: {
    pickerOptions () {
      const options = {
        trigger: '#c-date-' + this.uuid,
      }
      return options
    }
  },
  mounted () {
    const uuid = this.uuid
    this.$el.setAttribute('id', `c-date-${uuid}`)

    this.$nextTick(() => {
        this.render()

        if (this.show) {
          this.$nextTick(() => {
            this.picker && this.picker.show(this.currentValue)
          })
        }
      })
  },
  methods: {
    render () {
      this.$nextTick(() => {
        this.picker && this.picker.destroy()
        this.picker = new DatePicker(this.pickerOptions)
      })
    }
  }
}
</script>

<style>
.c-date-wrapper {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 10000;
  background-color: #fff;
  display: none;
  -webkit-transition: -webkit-transform 0.3s ease;
  transition: -webkit-transform 0.3s ease;
  transition: transform 0.3s ease;
  transition: transform 0.3s ease, -webkit-transform 0.3s ease;
  -webkit-transform: translateY(100%);
  transform: translateY(100%);
}

.c-date-header {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  width: 100%;
  box-align: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  background-image: -webkit-linear-gradient(top, #e7e7e7, #e7e7e7, transparent, transparent);
  background-image: linear-gradient(to bottom, #e7e7e7, #e7e7e7, transparent, transparent);
  background-position: bottom;
  background-size: 100% 1px;
  background-repeat: no-repeat;
}

.c-date-body {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  width: 100%;
  box-align: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 10px 0;
}
</style>

