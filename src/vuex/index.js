import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态
const state = {
  user: {},
  mails: {
    count: Number,
    list: {}
  },
  snackbar: {
    show: false,
    message: '',
    timer: null
  }
}

const mutations = {
  USER (state, user) {
    state.user = user
  },
  MAILS (state, mails) {
    state.mails = mails
  },
  SNACKBAR (state, message) {
    if (state.snackbar.timer) clearTimeout(state.snackbar.timer)
    if (!message) {
      state.snackbar.show = false
      return
    }
    state.snackbar = {
      show: true,
      message: message,
      timer: setTimeout(() => { state.snackbar.show = false }, 2000)
    }
  }
}

const actions = {
  getMails ({ commit }) {
    Vue.http
      .get('/list/1')
      .then((data) => {
        commit('MAILS', data.body)
      }, (err) => {
        this.toogleSnackbar('登录失败，请稍后再试')
        console.log(err)
      })
  },
  toogleSnackbar ({ commit }, message) {
    commit('SNACKBAR', message)
  }
}

const getters = {
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
