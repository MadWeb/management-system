import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '@/components/login'
import Register from '@/components/register'
import Home from '@/components/home'
import UserManage from '@/components/userManage'
import ConsumptionRecords from '@/components/consumptionRecords'
import Recharge from '@/components/recharge'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }, 
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect: '/userManage',
      children:[
        {
          path: '/userManage',
          name: 'userManage',
          component: UserManage
        },
        {
          path: '/consumptionRecords',
          name: 'consumptionRecords',
          component: ConsumptionRecords
        },
        {
          path: '/recharge',
          name: 'recharge',
          component: Recharge
        },
      ]
    }
  ]
})
