import { isString, isObject } from "util";

import { INJECT_ATTR } from './config'
import parseClass from './parse-class'

export default function createElement(_) {
  const args = [].slice.call(arguments, 1)
  let {
    functional = false,
    createElement: h,
    context = {},
    styles = context.$style || {}
  } = _

  if (isString(styles)) {
    styles = (
      functional ? (context.injections || {})[styles] : context[styles]
    ) || {}
  }

  if (functional) {
    context = context.props || {}
  }

  const data = args[1]
  if (isObject(data)) {
    if (!data.staticClass) {
      data.staticClass = ''
    }
    if (!data.attrs) {
      data.attrs = {}
    }
    const modules = data[INJECT_ATTR] || data.attrs[INJECT_ATTR] || ''

    if (modules.length) {
      const _modules = Array.isArray(modules) ? modules : [modules]

      for (let i in _modules) {
        const _module = _modules[i]

        if (_module && typeof _module === 'string') {
          const classExpressions = _module.split(/\s+/g)
          for (let i in classExpressions) {
            const classExpression = classExpressions[i]

            let {
              className,
              binding,
              bindingValue,
              role
            } = parseClass(classExpression)

            if (bindingValue) {
              className = context[binding]
              binding = undefined
            }

            if ((binding ? context[binding] : true) && styles[className]) {
              data.staticClass += ` ${styles[className]}`
              data.staticClass = data.staticClass.trim()
            }

            if (role) {
              data.attrs[`data-component-${role}`] = ''
            }
          }
        }
      }
    }

    // remove styleName attr
    delete data[INJECT_ATTR]
    delete data.attrs[INJECT_ATTR]
  }

  return h.apply(null, args)
}