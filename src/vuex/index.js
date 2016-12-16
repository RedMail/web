import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态
const state = {
  user: {},
  mails: {
    count: Number,
    list: []
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
    state.mails.count = mails.count
    state.mails.list = state.mails.list.concat(mails.list)
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
  getMails ({ commit }, page) {
    return Vue.http
      .get('/list/' + page)
      .then((data) => {
        commit('MAILS', data.body)
        return { state: 1 }
      }, (err) => {
        commit('SNACKBAR', '获取邮件失败，请稍后再试')
        return { state: 0, err: err }
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
