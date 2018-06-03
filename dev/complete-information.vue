<template>
  <Grid>
    <GridItem>
      <Card bg-color="primary" :aligns="['left', 'center@xs']">
        <p classes="u-font-size--xl">审批额度</p>
        <p classes="u-font-size--l">100000元</p>
      </Card>
      <Section>
        This is a section!
      </Section>
    </GridItem>
  </Grid>
</template>

<script>
import { CssModule } from 'bell-ui'

export default {
  mixins: [CssModule],
  created() {

  }
}
</script>

