<template>
  <Grid>
    <GridItem>
      <Card bg-color="primary" :aligns="['left', 'center@xs']">
        <p classes="u-font-size--xl">审批额度</p>
        <p classes="u-font-size--l">100000元</p>
      </Card>
    </GridItem>
    <GridItem>
      <Wrapper>
        <List>
          <ListItem>
            <Grid>
              <GridItem classes="u-1/2">实名认证</GridItem>
              <GridItem classes="u-1/2 u-align--right">></GridItem>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid>
              <GridItem classes="u-1/2">基本信息</GridItem>
              <GridItem classes="u-1/2 u-align--right">></GridItem>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid>
              <GridItem classes="u-1/2">补充信息</GridItem>
              <GridItem classes="u-1/2 u-align--right">></GridItem>
            </Grid>
          </ListItem>
        </List>
      </Wrapper>
    </GridItem>
    <GridItem>
      <Button>继续申请</Button>
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

