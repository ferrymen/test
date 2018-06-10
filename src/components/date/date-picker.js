import Scroller from '../picker/scroller'
import { each, getElement, toElement, parseDate, removeElement, trimZero, addZero, parseRow, getMaxDay } from './util'

const TEMPLATE = `<div class="c-date-wrapper">
  <div class="c-date-header">
    <div class="c-date-item dp-left vux-datetime-cancel" data-role="cancel">cancel</div>
    <div class="c-date-item vux-datetime-clear" data-role="clear"></div>
    <div class="c-date-item dp-right vux-datetime-confirm" data-role="confirm">done</div>
  </div>
  <div class="c-date-body">
    <div class="c-date-item" data-role="year"></div>
    <div class="c-date-item" data-role="month"></div>
    <div class="c-date-item" data-role="day"></div>
  </div>
</div>`

const NOW = new Date()

const DEFAULT_CONFIG = {
  trigger: null,
  format: 'YYYY-MM-DD',
  template: TEMPLATE,
  renderInline: false,
  orderMap: {},
  value: NOW.getFullYear() + '-' + (NOW.getMonth() + 1) + '-' + NOW.getDate(),
  yearRow: '{value}',
  monthRow: '{value}',
  dayRow: '{value}',
}

const TYPE_MAP = {
  year: ['YYYY'],
  month: ['MM', 'M'],
  day: ['DD', 'D'],
}

let CURRENT_PICKER

function renderScroller (el, data, value, fn) {
  data = data.map(one => {
    one.value = one.value + ''
    return one
  })
  return new Scroller(el, {
    data,
    defaultValue: value + '',
    onSelect: fn
  })
}

function DatePicker (config) {
  const self = this
  self.config = {}

  self.value = config.value || ''

  each(DEFAULT_CONFIG, function (key, val) {
    self.config[key] = config[key] || val
  })

  this.renderInline = self.config.renderInline

  if (config.defaultSelectedValue && !config.value) {
    self.config.value = config.defaultSelectedValue
  }

  if (typeof this.config.startDate === 'string') {
    this.config.startDate = new Date(this.config.startDate.replace(/-/g, '/'))
  }

  if (typeof this.config.endDate === 'string') {
    this.config.endDate = new Date(this.config.endDate.replace(/-/g, '/'))
  }

  if (this.config.startDate && !this.config.endDate) {
    this.config.endDate = new Date('2030/12/31')
  }

  if (!this.config.startDate && this.config.endDate) {
    this.config.startDate = new Date(`${this.config.minYear}/01/01`)
  }

  if (!this.renderInline) {
    let trigger = self.config.trigger

    this.triggerHandler = function (e) {
      e.preventDefault()
      self.show(self.value)
    }

    if (trigger) {
      trigger = self.trigger = getElement(trigger)
      this.trigger = trigger
      this.trigger && this.trigger.addEventListener('click', this.triggerHandler, false)
    }
  }
}

DatePicker.prototype = {
  _show (newValueMap) {
    const self = this
    self._setText()
    self.container.style.display = 'block'

    if (this.renderInline) {
      self.container.classList.add('c-date-view')
    }

    each(TYPE_MAP, function (type) {
      self[type + 'Scroller'] && self[type + 'Scroller'].select(type === 'noon' ? newValueMap[type] : trimZero(newValueMap[type]), false)
    })

    setTimeout(function () {
      self.container.style['-webkit-transform'] = 'translateY(0)'
      self.container.style.transform = 'translateY(0)'
    }, 0)
  },
  show (value) {
    const self = this
    const config = self.config

    CURRENT_PICKER = self

    const valueMap = self.valueMap = parseDate(config.format, value || config.value)
    let newValueMap = {}

    each(TYPE_MAP, function (type, list) {
      newValueMap[type] = list.length === 1 ? valueMap[list[0]] : (valueMap[list[0]] || valueMap[list[1]])
    })

    if (self.container) {
      self._show(newValueMap)
    } else {
      let template = config.template

      for (let i in config.orderMap) {
        template = template.replace(`data-role="${i}"`, `data-role="${i}" style="order:${config.orderMap[i]}"`)
      }

      const container = self.container = toElement(template)

      if (config.isOneInstance) {
        container.id = 'c-date-instance'
      }

      if (!self.renderInline) {
        document.body.appendChild(container)

        self.container.style.display = 'block'
      } else {
        document.querySelector(self.config.trigger).appendChild(container)
      }

      each(TYPE_MAP, function (type) {
        const div = self.find('[data-role=' + type + ']')
        if (newValueMap[type] === undefined) {
          removeElement(div)
          return
        }

        let data

        if (type == 'day') {
          data = self._makeData(type, trimZero(newValueMap.year), trimZero(newValueMap.month))
        } else {
          data = self._makeData(type)
        }

        self[type + 'Scroller'] = renderScroller(div, data, trimZero(newValueMap[type]), function (currentValue) {
          setTimeout(function () {
            config.onSelect.call(self, type, currentValue, self.getValue())
          }, 0)

          let currentDay

          if (type === 'year') {
            const currentMonth = self.monthScroller ? self.monthScroller.value : config.currentMonth
            self._setMonthScroller(currentValue, currentMonth)
            if (self.dayScroller) {
              currentDay = self.dayScroller.value
              self._setDayScroller(currentValue, currentMonth, currentDay)
            }
          } else if (type === 'month') {
            const currentYear = self.yearScroller ? self.yearScroller.value : config.currentYear
            if (self.dayScroller) {
              currentDay = self.dayScroller.value
              self._setDayScroller(currentYear, currentValue, currentDay)
            }
          }
        })
      })

      if (!self.renderText && !self.renderInline) {
        if (self.config.confirmText) {
          self.find('[data-role=confirm]').innerText = self.config.confirmText
        }

        if (self.config.cancelText) {
          self.find('[data-role=cancel]').innerText = self.config.cancelText
        }
        if (self.config.clearText) {
          self.find('[data-role=clear]').innerText = self.config.clearText
        }
        self.renderText = true
      }

      this._show(newValueMap)
    }
  },
  find (selector) {
    return this.container.querySelector(selector)
  },
  _makeData (type, year, month, day) {
    const config = this.config
    const valueMap = this.valueMap
    const list = TYPE_MAP[type]
    let data = []
    let min
    let max

    if (type === 'year') {
      min = config.minYear
      max = config.maxYear
      if (this.reMakeData) {
        const { minYear, maxYear } = getYears(this.config.startDate, this.config.endDate)
        min = minYear
        max = maxYear
      }
    } else if (type === 'month') {
      min = 1
      max = 12
      if (this.reMakeData) {
        const { minMonth, maxMonth } = getMonths(this.config.startDate, this.config.endDate, this.yearScroller.value * 1)
        min = Math.max(min, minMonth)
        max = Math.min(max, maxMonth)
      }
    } else if (type === 'day') {
      min = 1
      max = getMaxDay(year, month)
      if (this.reMakeData) {
        const { minDay, maxDay } = getDays(this.config.startDate, this.config.endDate, this.yearScroller.value * 1, this.monthScroller.value * 1)
        min = Math.max(min, minDay)
        max = Math.min(max, maxDay)
      }
    } else if (type === 'hour') {
      min = this.config.minHour
      max = this.config.maxHour
    } else if (type === 'minute') {
      min = 0
      max = 59
    }
    for (let i = min; i <= max; i++) {
      let name
      if (type === 'year') {
        name = parseRow(config.yearRow, i)
      } else {
        const val = valueMap[list[0]] ? addZero(i) : i
        name = parseRow(config[type + 'Row'], val)
      }
      data.push({
        name: name,
        value: i
      })
    }

    if (type === 'noon') {
      data.push({
        name: '上午',
        value: 'AM'
      })
      data.push({
        name: '下午',
        value: 'PM'
      })
    }

    if (type === 'hour' && this.config.hourList) {
      data = this.config.hourList.map(hour => {
        return {
          name: parseRow(config['hourRow'], hour),
          value: Number(hour)
        }
      })
    }

    if (type === 'day' && this.config.computeDaysFunction) {
      const rs = this.config.computeDaysFunction({
        year,
        month,
        min,
        max
      }, generateRange)
      if (rs) {
        data = rs.map(day => {
          return {
            name: parseRow(config['dayRow'], addZero(day)),
            value: Number(day)
          }
        })
      }
    }

    if (type === 'hour' && this.config.computeHoursFunction) {
      const isTodayVal = isToday(new Date(`${year}/${month}/${day}`), new Date())
      const rs = this.config.computeHoursFunction(`${year}-${month}-${day}`, isTodayVal, generateRange)
      data = rs.map(hour => {
        // #2296
        return {
          name: parseRow(config['hourRow'], hour),
          value: Number(hour)
        }
      })
    }

    if (type === 'minute' && this.config.minuteList) {
      data = this.config.minuteList.map(minute => {
        return {
          name: parseRow(config['minuteRow'], minute),
          value: Number(minute)
        }
      })
    }
    return data
  },
   // after year change
   _setMonthScroller (currentValue, month) {
    if (!this.monthScroller) {
      return
    }
    const self = this
    this.monthScroller.destroy()
    const div = self.find('[data-role=month]')
    self.monthScroller = renderScroller(div, self._makeData('month'), month, function (currentValue) {
      self.config.onSelect.call(self, 'month', currentValue, self.getValue())
      const currentYear = self.yearScroller ? self.yearScroller.value : self.config.currentYear
      if (self.dayScroller) {
        const currentDay = self.dayScroller.value
        self._setDayScroller(currentYear, currentValue, currentDay)
      }
      if (self.yearScroller && self.monthScroller && self.hourScroller) {
        self._setHourScroller(currentYear, currentValue, self.dayScroller.value, self.hourScroller.value)
      }
    })
  },
  _setDayScroller (year, month, day) {
    if (!this.dayScroller) {
      return
    }
    const self = this
    const maxDay = getMaxDay(year, month)
    if (day > maxDay) {
      day = maxDay
    }
    self.dayScroller.destroy()
    const div = self.find('[data-role=day]')
    self.dayScroller = renderScroller(div, self._makeData('day', year, month), day, function (currentValue) {
      self.config.onSelect.call(self, 'day', currentValue, self.getValue())
      self.hourScroller && self._setHourScroller(year, month, currentValue, self.hourScroller.value)
    })
  },
  _setText () {
    if (typeof V_LOCALE !== 'undefined' && V_LOCALE === 'MULTI' && !this.config.renderInline) { // eslint-disable-line
      const trigger = this.trigger
      if (trigger) {
        const confirmText = trigger.getAttribute('data-confirm-text')
        const cancelText = trigger.getAttribute('data-cancel-text')
        this.find('[data-role=confirm]').innerText = confirmText
        this.find('[data-role=cancel]').innerText = cancelText
      }
    }
  },
}

export default DatePicker