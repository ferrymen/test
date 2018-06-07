import { Confirm } from '../../components/confirm'

let $vm
const Plug = {
  install (Vue, options = {}) {
    const _Confirm = Vue.extend(Confirm)

    if (!$vm) {
      $vm = new _Confirm({
        el: document.createElement('div'),
        propsData: {
          title: 'Why'
        }
      })
      document.body.appendChild($vm.$el)
    }

    const confirm = {
      show (options) {
        Object.assign($vm, options)
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

    // $UI.confirm.show({
    //   title: 'How'
    // })
  }
}

export default Plug