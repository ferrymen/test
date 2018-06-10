<template>
  <Grid>
    <GridItem>
      <Section>Switch</Section>
      <Switcher v-model="switcherVal" :valueMap="switcherValMap" />{{switcherVal}}
      
      <Section>CheckIcon</Section>
      <CheckIcon :values.sync="checkIcon">点我{{checkIcon}}</CheckIcon>
      
      <Section>Checkers</Section>
      <Checker
        v-model="checkRadio"
        default-item-class="demo5-item"
        selected-item-class="demo5-item-selected">
        {{checkRadio}}
        <CheckerItem v-for="i in [1, 2, 3]" :key="i" :value="i">点我{{i}}</CheckerItem>
      </Checker>

      <Section>Picker Select</Section>
      <PopupPicker
        v-model="pickerSelectVM"
        :data="pickerSelectList"
        @on-show="onShow"
        @on-hide="onHide"
        @on-change="onChange"
        placeholder="请选择"
        :popupTitle="pickerSelectTitile"
        cancelText="取消"
        confirmText="确认"
        >
      </PopupPicker>

      <Section>Picker Date</Section>
      <Date     
        placeholder="请选择"
        cancelText="取消"
        confirmText="确认"
         title="datetime"
         v-model="date"
      >
      </Date>
    </GridItem>
  </Grid>
</template>

<script>
export default {
  data () {
    return {
      switcherVal: 'N',
      switcherValMap: ['N', 'Y'],
      checkIcon: false,
      checkRadio: 1,
      pickerSelectVM: ['iPhone'],
      pickerSelectList: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']],
      pickerSelectTitile: '手机机型',
      date: '',
    }
  },
  methods: {
    onShow () {
      console.log('on show')
    },
    onHide (type) {
      console.log('on hide', type)
    },
    onChange (val) {
      console.log('val change', val)
    },
    mobilePicker () {
      
    }
  }
}
</script>

<style>
.demo5-item {
    width: 100px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-right: 6px;
}

.demo5-item-selected {
    /* background: #ffffff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAAGXRFW…AABAPB5f+PlhLUpZMWuQcYMWLEyDN4ymqa5KS4+3G+KAEGACQmAGlKzr56AAAAAElFTkSuQmCC) no-repeat right bottom; */
    border-color: #ff4a00;
}
</style>
