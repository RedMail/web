import Vue from 'vue'
import store from './vuex/'
import router from './router/'
import VueResource from 'vue-resource'
import moment from 'moment'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'material-design-icons/iconfont/material-icons.css'
import App from './App'

moment.locale('zh-cn')
Vue.prototype.$moment = moment
Vue.use(MuseUI)
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  store,
  router,
  ...App
}).$mount('#app')
