import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    components: {
      alive: resolve => require(['views/index'], resolve)
    }
  },
  {
    path: '/detail/:index',
    components: {
      reset: resolve => require(['views/detail'], resolve)
    }
  },
  {
    path: '/send',
    components: {
      reset: resolve => require(['views/send'], resolve)
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
