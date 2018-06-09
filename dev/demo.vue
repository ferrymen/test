<template>
  <Grid>
    <GridItem>
      <Section>Switch</Section>
      <Switcher v-model="switcherVal" :valueMap="switcherValMap" />{{switcherVal}}
      
      <Section>CheckIcon</Section>
      <CheckIcon :values.sync="checkIcon">点我{{checkIcon}}</CheckIcon>
      
      <Section>Checkers</Section>
      <Checker v-model="checkRadio">
        {{checkRadio}}
        <CheckerItem v-for="i in [1, 2, 3]" :key="i" :value="i">点我{{i}}</CheckerItem>
      </Checker>

      <Section>Picker Select</Section>
      <Button @on-click="mobilePicker" label="Mobile Picker" />
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
