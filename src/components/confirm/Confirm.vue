<template>
  <div class="c-confirm">
    <Modal />
  </div>
</template>

<script>
import Style from '../../style/06_components/_confirm.scss'
import { Modal } from '../modal'

export default {
  name: 'Confirm',
  components: {
    Modal
  }
}
</script>
