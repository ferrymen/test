/**
 * Get target DOM Node
 * @param {(Node|string|Boolean)} [node=document.body] DOM Node, CSS selector, or Boolean
 * @return {Node} The target that the el will be appended to
 */
function getTarget (node) {
  if (node === void 0) {
    return document.body
  }

  if (typeof node === 'string' && node.indexOf('?') === 0) {
    return document.body
  } else if (typeof node === 'string' && node.indexOf('?') > 0) {
    node = node.split('?')[0]
  }

  if (node === 'body' || node === true) {
    return document.body
  }

  return node instanceof window.Node ? node : document.querySelector(node)
}

export default {
  inserted (el, { value }, vnode) {
    el.className = el.className ? el.className + ' v-transfer' : 'v-transfer'
    const parentNode = el.parentNode

    var home = document.createComment('')
    var hasMovedOut = false

    if (value !== false) {
      parentNode.replaceChild(home, el) // moving out, el is no longer in the document
      getTarget(value).appendChild(el) // moving into new place
      hasMovedOut = true
    }

    if (!el.__transferData) {
      el.__transferData = {
        parentNode: parentNode,
        home: home,
        target: getTarget(value),
        hasMovedOut: hasMovedOut
      }
    }
  }
}