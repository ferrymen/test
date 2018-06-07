<template>
  <Grid>
    <GridItem>
      <Card bg-color="primary" :aligns="['left', 'center@xs']">
        <p classes="u-font-size--l">审批额度</p>
        <p classes="u-font-size--xl" @click="confirm">100000元</p>
      </Card>
    </GridItem>
    <GridItem>
      <Wrapper>
        <Section>请认真核实你的个人信息，如若变更，请及时进行修改。</Section>
      </Wrapper>
    </GridItem>
    <GridItem>
      <List border="bottom">
          <ListItem>
            <Grid>
              <GridItem classes="u-1/2">实名认证</GridItem>
              <GridItem classes="u-1/2 u-align--right">已完成 ></GridItem>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid>
              <GridItem classes="u-1/2">基本信息</GridItem>
              <GridItem classes="u-1/2 u-align--right">
                <router-link to="/base-info">待完善 ></router-link>
              </GridItem>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid>
              <GridItem classes="u-1/2">补充信息</GridItem>
              <GridItem classes="u-1/2 u-align--right">待完善 ></GridItem>
            </Grid>
          </ListItem>
        </List>
    </GridItem>
    <GridItem classes="u-text-align--center u-mt--huge">
      <Button classes="u-9/10">继续申请</Button>
    </GridItem>
  </Grid>
</template>

<script>
import { CssModule } from 'bell-ui'

export default {
  mixins: [CssModule],
  created() {

  },
  methods: {
    confirm () {
      this.$UI.confirm.show({
        title: 'Title',
        body: 'Content'
      })
    }
  }
}
</script>

