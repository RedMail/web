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
    path: '/new',
    components: {
      reset: resolve => require(['views/new'], resolve)
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
