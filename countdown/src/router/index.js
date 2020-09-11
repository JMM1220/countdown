import Vue from 'vue'
import Router from 'vue-router'
import CountDown from '@/pages/CountDown'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CountDown',
      component: CountDown
    }
  ]
})
