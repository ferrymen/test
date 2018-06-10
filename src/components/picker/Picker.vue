<template>
  <div class="c-picker">
    <FlexBox>
      <FlexBoxItem v-for="(one, index) in currentData" :key="index">
        <div class="c-picker__item" :id="`cid-picker__item--${uuid}-${index}`"></div>
      </FlexBoxItem>
    </FlexBox>
  </div>
</template>

<script>
import './scroller.css'
import Manager from './chain'
import Scroller from './scroller'

export default {
  name: 'Picker',
  props: {
    value: Array,
    data: Array,
    itemClass: {
      type: String,
      default: 'scroller-item'
    },
    columns: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      currentData: this.data,
      currentValue: this.value,
      count: 0,
      uuid: '',
      scroller: []
    }
  },
  watch: {
    value (val) {
      // console.log(val)
    },
    currentValue (val ,oldVal) {
      // console.log(val)
      // this.$emit('input', val)
      // // render all the scroller for chain datas
      // if (this.columns !== 0) {
      //   if (val.length > 0) {
      //     if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
      //       this.currentData = this.store.getColumns(val)
      //       this.$nextTick(function () {
      //         this.render(this.currentData, val)
      //       })
      //     }
      //   }
      // } else {
      //   if (val.length) {
      //     for (let i = 0; i < val.length; i++) {
      //       if (this.scroller[i] && this.scroller[i].value !== val[i]) {
      //         this.scroller[i].select(val[i])
      //       }
      //     }
      //   } else {
      //     this.render(this.currentData, [])
      //   }
      // }
    },
    data (val) {

    },
    currentData (newData) {

    }
  },
  created () {
    if (this.columns !== 0) {
      const length = this.columns
      this.store = new Manager(this.data, length, this.fixedColumns || this.columns)
      this.currentData = this.store.getColumns(this.value)
    }
  },
  mounted () {
    this.uuid = Math.random().toString(36).substring(3, 8)
    this.$nextTick(() => {
      this.render(this.currentData, this.currentValue)
    })
  },
  methods: {
    getId (i) {
      return `#cid-picker__item--${this.uuid}-${i}`
    },
    render (data, value) {
      this.count = this.currentData.length
      const _this = this
      if (!data || !data.length) {
        return
      }
      let count = this.currentData.length
      if (value.length < count) {
        for (let i = 0; i < count; i++) {
          if (process.env.NODE_ENV === 'development' &&
            typeof data[i][0] === 'undefined' &&
            isArray(this.data) &&
            this.data[0] &&
            typeof this.data[0].value !== 'undefined' &&
            !this.columns) {
            console.error('[VUX error] 渲染出错，如果为联动模式，需要指定 columns(列数)')
          }
          this.$set(_this.currentValue, i, data[i][0].value || data[i][0])
        }
      }

      for (let i = 0; i < data.length; i++) {
        /**
        * Still don't know why this happens
        */
        if (!document.querySelector(_this.getId(i))) {
          return
        }
        _this.scroller[i] && _this.scroller[i].destroy()
        _this.scroller[i] = new Scroller(_this.getId(i), {
          data: data[i],
          defaultValue: value[i] || data[i][0].value,
          itemClass: _this.itemClass,
          onSelect (value) {
            console.log(value)
            _this.$set(_this.currentValue, i, value)
          }
        })
        console.log(_this.currentValue)
        if (_this.currentValue) {
          _this.scroller[i].select(value[i])
        }
      }
    }
  }
}
</script>

<style>
.scroller-component {
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
  z-index: 1;
}

.scroller-mask {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  margin: 0 auto;
  width: 100%;
  z-index: 3;
  transform: translateZ(0px);
  background-image:
    -webkit-linear-gradient(top, rgba(255,255,255,0.95), rgba(255,255,255,0.6)),
    -webkit-linear-gradient(bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.6));
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
    -webkit-linear-gradient(top, #d0d0d0, #d0d0d0, transparent, transparent),
    -webkit-linear-gradient(bottom, #d0d0d0, #d0d0d0, transparent, transparent);
  background-image:
    linear-gradient(to bottom, #d0d0d0, #d0d0d0, transparent, transparent),
    linear-gradient(to top, #d0d0d0, #d0d0d0, transparent, transparent);
  background-position: top, bottom;
  background-size: 100% 1px;
  background-repeat: no-repeat;
}
.scroller-item {
  line-clamp: 1;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
