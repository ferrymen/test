import { Confirm } from '../../components/confirm'

let $vm
const Plug = {
  install (Vue, options = {}) {
    const _Confirm = Vue.extend(Confirm)

    if (!$vm) {
      $vm = new _Confirm({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    const confirm = {
      show (options) {
        $vm.showValue = true
      },
      hide () {
        $vm.showValue = false
      },
      isVisible () {
        return $vm.showValue
      }
    }
    Vue.prototype.$UI.confirm = confirm
  }
}

export default Plug