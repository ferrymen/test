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

<style>
.c-popup {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #eee;
  z-index: 501;
  -webkit-transition-property: -webkit-transform;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  max-height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>

