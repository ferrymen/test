<template>
  <Grid>
    <GridItem>
      <Card bg-color="primary" :aligns="['left', 'center@xs']">
        <p classes="u-font-size--xl">审批额度</p>
        <p classes="u-font-size--l">100000元</p>
      </Card>
      <Wrapper>
        This is a wrapper!
      </Wrapper>
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

