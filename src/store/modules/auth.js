import axios from 'axios'
const moduleAuth = {
  namespaced: true,
  state: () => {
    return {
      token: localStorage.getItem('token') || '',
      name: localStorage.getItem('name') || ''
    }
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    setName (state, payload) {
      state.name = payload
    }
  },
  actions: {
    register (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${context.rootState.setURL}/register`, data).then((response) => {
          localStorage.setItem('token', response.data.token)
          context.commit('setToken', response.data.token)
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    login (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${context.rootState.setURL}/login`, data).then((response) => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('name', response.data.name)
          context.commit('setToken', response.data.token)
          context.commit('setName', response.data.name)
          resolve(response.data)
          console.log(response.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    logout (context) {
      return new Promise((resolve) => {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        context.commit('setToken', null)
        context.commit('setName', null)
        resolve(true)
      })
    }
  },
  getters: {
    getToken (state) {
      return state.token
    },
    getName (state) {
      return state.name
    }
  }
}

export default moduleAuth
