<template>
  <div class="c-flex-box__item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FlexBoxItem'
}
</script>

<style>
.c-flex-box__item {
    -webkit-box-flex: 1;
    flex: 1;
    -webkit-flex: 1;
    min-width: 20px;
    width: 0%;
}

.c-flex-box__item:first-child {
    margin-left: 0!important;
    margin-top: 0!important;
}
</style>
