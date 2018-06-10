export function each (obj, fn) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (fn.call(obj[key], key, obj[key]) === false) {
        break
      }
    }
  }
}

export function getElement (expr) {
  return (typeof expr === 'string') ? document.querySelector(expr) : expr
}

export function toElement (html) {
  const tempContainer = document.createElement('div')
  tempContainer.innerHTML = html
  return tempContainer.firstElementChild
}

// parse Date String
export function parseDate (format, value) {
  const formatParts = format.split(/[^A-Za-z]+/)
  let valueParts = value.replace(/\s/g, '-').replace(/:/g, '-').replace(/\//g, '-').split('-')
  if (formatParts.length !== valueParts.length) {
    // if it is error date, use current date
    const date = formater(new Date(), format)
    valueParts = date.split(/\D+/)
  }

  let result = {}

  for (let i = 0; i < formatParts.length; i++) {
    if (formatParts[i]) {
      result[formatParts[i]] = valueParts[i]
    }
  }
  return result
}

export function removeElement (el) {
  el && el.parentNode.removeChild(el)
}

export function trimZero (val) {
  val = String(val)
  val = val ? parseFloat(val.replace(/^0+/g, '')) : ''
  val = val || 0
  val = val + ''
  return val
}

export function addZero (val) {
  val = String(val)
  return val.length < 2 ? '0' + val : val
}

export function parseRow (tmpl, value) {
  return tmpl.replace(/\{value\}/g, value)
}

export function getMaxDay (year, month) {
  year = parseFloat(year)
  month = parseFloat(month)
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28
  }
  return [4, 6, 9, 11].indexOf(month) >= 0 ? 30 : 31
}