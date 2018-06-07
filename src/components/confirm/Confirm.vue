<template>
  <div class="c-confirm">
    <Modal v-model="showValue">
      <div slot="header">{{title}}</div>
      <div>{{body}}</div>
      <div slot="footer"
        :class="{[Style['c-confirm__footer']]: true}"
        >
        <a href="javascript:;"
          :class="{[Style['c-confirm__button']]: true, [Style['c-confirm__button--default']]: true}"
          @click="_onCancel">cancel</a>
        <a href="javascript:;" 
          :class="{[Style['c-confirm__button']]: true, [Style['c-confirm__button--primary']]: true}">confirm</a>
      </div>
    </Modal>
  </div>
</template>

<script>
import Style from '../../style/06_components/_confirm.scss'
import { Modal } from '../modal'

export default {
  name: 'Confirm',
  data () {
    return {
      Style,
      showValue: false
    }
  },
  props: {
    title: String,
    body: String
  },
  components: {
    Modal
  },
  methods: {
    _onCancel () {
      if (!this.showValue) {
        return
      }
      this.showValue = false
      this.$emit('on-cancel')
    }
  }
}
</script>
