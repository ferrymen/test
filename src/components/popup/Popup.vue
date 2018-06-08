<template>
  <transition>
    <div class="c-popup">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Popup'
}
</script>
