export function includes(arrayLike, element, fromIndex = 0) {
  for (let i = fromIndex, len = arrayLike.length; i < len; i++) {
    if (arrayLike[i] === element) {
      return true
    }
  }
  return false
}

const camelCaseCache = Object.create(null)
export function camelCase(value) {
  if (camelCaseCache[value]) return camelCaseCache[value]
  let result = ''
  let shouldUpperCase = false
  for (let i = 0, len = value.length; i < len; i++) {
    const char = value[i]
    if (char === '-') {
      shouldUpperCase = true
    } else {
      result += (result && shouldUpperCase) ? char.toUpperCase() : char
      shouldUpperCase = false
    }
  }
  camelCaseCache[value] = result
  return result
}