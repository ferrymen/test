<template>
  <div class="c-popup-header">
    <div class="c-popup-header__left"  @click="$emit('on-click-left')">
      <slot name="left-text">{{ leftText }}</slot>
    </div>
    <div class="c-popup-header__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="c-popup-header__right" @click="$emit('on-click-right')">
      <slot name="right-text">{{ rightText }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupHeader',
   props: {
    leftText: String,
    rightText: String,
    title: String
  },
  created () {
    console.log(this)
  }
}
</script>

<style>
.c-popup-header {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    background-color: #fbf9fe;
}

.c-popup-header__left {
    padding-left: 15px;
    color: #828282;
}

.c-popup-header__title {
  -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    text-align: center;
    color: #222;
}

.c-popup-header__right {
    padding-right: 15px;
    color: #FF9900;
}
</style>

