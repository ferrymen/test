<template>
  <div class="c-modal">
    <div
      :class="maskClasses"
    >
    </div>
    <div
      :class="wrapperClasses"
    >
      Modal
    </div>
  </div>
</template>

<script>
import Style from '../../style/06_components/_modal.scss'

export default {
  name: 'Modal',
  data () {
    return {
      maskClasses: {
        [Style['c-modal__mask']]: true,
      },
      wrapperClasses: {
        [Style['c-modal__wrapper']]: true
      },
    }
  }
}
</script>
