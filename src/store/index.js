import Vue from 'vue'
import Vuex from 'vuex'
import moduleProducts from './modules/product'
import moduleAuth from './modules/auth'
import moduleHistory from './modules/history'

Vue.use(Vuex)

const store = new Vuex.Store({
  state () {
    return {
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    products: moduleProducts,
    auth: moduleAuth,
    history: moduleHistory
  }
})

export default store
