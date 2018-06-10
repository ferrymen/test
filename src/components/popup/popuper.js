const passiveSupported = require('../../libs/passive_supported')

window.__$Popups = window.__$Popups || {}

const Popuper = function (option) {
  this.uuid = Math.random().toString(36).substring(3, 8)
  this.params = {}

  if (Object.prototype.toString.call(option) === '[object Object]') {
    this.params = {
      hideOnBlur: option.hideOnBlur,
      onOpen: option.onOpen || function () {},
      onClose: option.onClose || function () {},
      showMask: option.showMask
    }
  }

  if (!!document.querySelectorAll('.c-popup-mask').length <= 0) {
    this.divMask = document.createElement('a')
    this.divMask.className = 'c-popup-mask'
    this.divMask.dataset.uuid = ''
    this.divMask.href = 'javascript:void(0)'
    document.body.appendChild(this.divMask)
  }

  let div
  if (!option.container) {
    div = document.createElement('div')
  } else {
    div = option.container
  }

  div.className += ` c-popup-dialog c-popup-dialog-${this.uuid}`

  this.div = div

  if (!option.container) {
    document.body.appendChild(div)
  }

  this.container = document.querySelector('.c-popup-dialog-' + this.uuid)
  this.mask = document.querySelector('.c-popup-mask')
  this.mask.dataset.uuid += `,${this.uuid}`

  this._bindEvents()

  option = null
  
  this.containerHandler = () => {
    this.mask && !/show/.test(this.mask.className) && setTimeout(() => {
      !/show/.test(this.mask.className) && (this.mask.style['zIndex'] = -1)
    }, 200)
  }

  this.container && this.container.addEventListener('webkitTransitionEnd', this.containerHandler)
  this.container && this.container.addEventListener('transitionend', this.containerHandler)
}

Popuper.prototype.onClickMask = function () {
  this.params.hideOnBlur && this.params.onClose()
}

Popuper.prototype._bindEvents = function () {
  if (this.params.hideOnBlur) {
    this.mask.addEventListener('click', this.onClickMask.bind(this), false)
    this.mask.addEventListener('touchmove', e => e.preventDefault(), passiveSupported ? {passive: false} : false)
  }
}

Popuper.prototype.show = function () {
  if (this.params.showMask) {
    this.mask.classList.add('c-popup-show')
    this.mask.style['zIndex'] = 500
  }
  this.container.classList.add('c-popup-show')
  this.params.onOpen && this.params.onOpen(this)
  window.__$Popups[this.uuid] = 1
}

Popuper.prototype.hide = function (shouldCallback = true) {
  this.container.classList.remove('c-popup-show')
  if (!document.querySelector('.c-popup-dialog.c-popup-show')) {
    this.mask.classList.remove('c-popup-show')
    setTimeout(() => {
      this.mask && !/show/.test(this.mask.className) && (this.mask.style['zIndex'] = -1)
    }, 400)
  }
  shouldCallback === false && this.params.onClose && this.params.hideOnBlur && this.params.onClose(this)
  this.isShow = false
  delete window.__$Popups[this.uuid]
}

Popuper.prototype.destroy = function () {
  this.mask.dataset.uuid = this.mask.dataset.uuid.replace(new RegExp(`,${this.uuid}`, 'g'), '')
  if (!this.mask.dataset.uuid) {
    this.mask.removeEventListener('click', this.onClickMask.bind(this), false)
    this.mask && this.mask.parentNode && this.mask.parentNode.removeChild(this.mask)
  } else {
    this.hide()
  }
  this.container.removeEventListener('webkitTransitionEnd', this.containerHandler)
  this.container.removeEventListener('transitionend', this.containerHandler)
  delete window.__$Popups[this.uuid]
}

export default Popuper