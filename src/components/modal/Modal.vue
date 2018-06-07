<template>
  <div class="c-modal" v-show="show">
    <div
      :class="maskClasses"
    >
    </div>
    <div
      :class="wrapperClasses"
    >
      <div :class="headerClasses">
        <slot name="header"></slot>
      </div>
      <div :class="bodyClasses">
        <slot></slot>
      </div>
      <div :class="footerClasses">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Style from '../../style/06_components/_modal.scss'

export default {
  name: 'Modal',
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      maskClasses: {
        [Style['c-modal__mask']]: true,
      },
      wrapperClasses: {
        [Style['c-modal__wrapper']]: true
      },
      headerClasses: {
        [Style['c-modal__header']]: true,
      },
      bodyClasses: {
        [Style['c-modal__body']]: true,
      },
      footerClasses: {
        [Style['c-modal__footer']]: true,
      },
    }
  }
}
</script>
