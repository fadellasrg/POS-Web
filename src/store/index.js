// import { _ } from 'core-js'
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import moduleProducts from './modules/product'
import moduleAuth from './modules/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  state () {
    return {
      angka: 0,
      name: 'Fadella',
      // listUsers: [],
      listDetail: {}
    }
  },
  getters: {
    // setNama (state) {
    //   return state.name + ' Amirah'
    // },
    // getListUsers (state) {
    //   return state.listUsers
    // },
    getDetail (state) {
      return state.listDetail
    }
  },
  mutations: {
    // mutationTambah (state) {
    //   state.angka += 1
    // },
    // mutationKurang (state) {
    //   state.angka -= 1
    // },
    // mutationSetListUsers (state, payload) {
    //   state.listUsers = payload
    // },
    mutationDetail (state, payload) {
      state.listDetail = payload
    }
  },
  actions: {
    // actionTambah (context) {
    //   context.commit('mutationTambah')
    // },
    // actionKurang (context) {
    //   context.commit('mutationKurang')
    // },
    // actionGetUsersFromAPI ({ commit }) {
    //   axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
    //     commit('mutationSetListUsers', response.data)
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // },
    actionDetail (context, id) {
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then((response) => {
        context.commit('mutationDetail', response.data)
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  modules: {
    products: moduleProducts,
    auth: moduleAuth
  }
})

export default store
