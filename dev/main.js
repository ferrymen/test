import '../src/style/main.scss'

import Vue from 'vue'
import VueRouter from 'vue-router'

import BellUI from '../src'
// import APP1 from './App1'
import APP from './App'
import routes from './routes'

Vue.use(BellUI)
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  render: (h) => h(APP)
})