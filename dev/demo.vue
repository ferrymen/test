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
      checkRadio: 1
    }
  }
}
</script>
