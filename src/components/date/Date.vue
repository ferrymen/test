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

.c-date-header .c-date-item,
.c-date-body .c-date-item {
  box-sizing: border-box;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  color: #828282;
  /* color: #FF9900; */
  font-size: 16px;
  height: 44px;
  line-height: 44px;
  cursor: pointer;
}

.c-date-cancel {
  text-align: left;
  padding-left: 15px;
}

.c-date-confirm {
    text-align: right;
    padding-right: 15px;
    color: #FF9900 !important;
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

.c-date-mask {
  z-index: 998;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  opacity: 0;
  transition: opacity 0.2s ease-in;
  background-color: #000;
  z-index: 9999;
}

/* .scroller-mask {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  margin: 0 auto;
  width: 100%;
  z-index: 3;
  background-image:
    linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.6)),
    linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.6));
  background-position: top, bottom;
  background-size: 100% 102px;
  background-repeat: no-repeat;
} */


/* .scroller-component {
  display: block;
  position: relative;
  height: 238px;
  overflow: hidden;
  width: 100%;
}

.scroller-content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: -1;
}

.scroller-mask {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  margin: 0 auto;
  width: 100%;
  z-index: 3;
  background-image:
    linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.6)),
    linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.6));
  background-position: top, bottom;
  background-size: 100% 102px;
  background-repeat: no-repeat;
}

.scroller-item {
  text-align: center;
  font-size: 16px;
  height: 34px;
  line-height: 34px;
  color: #000;
}

.scroller-indicator {
  width: 100%;
  height: 34px;
  position: absolute;
  left: 0;
  top: 102px;
  z-index: 3;
  background-image:
    linear-gradient(to bottom, #d0d0d0, #d0d0d0, transparent, transparent),
    linear-gradient(to top, #d0d0d0, #d0d0d0, transparent, transparent);
  background-position: top, bottom;
  background-size: 100% 1px;
  background-repeat: no-repeat;
} */
</style>

