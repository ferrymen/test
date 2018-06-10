<template>
  <div class="c-flex-box c-flex-row">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FlexBox'
}
</script>

<style>
.c-flex-box {
  width: 100%;
  text-align: left;
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  box-align: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.c-flex-row {
  box-direction: row;
  box-orient: horizontal;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  flex-direction: row;
}
</style>

