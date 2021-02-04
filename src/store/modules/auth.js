import axios from 'axios'
const moduleAuth = {
  namespaced: true,
  state: () => {
    return {
      token: localStorage.getItem('token') || ''
    }
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    }
  },
  actions: {
    register (context, data) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/register', data).then((response) => {
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
        axios.post('http://localhost:3000/login', data).then((response) => {
          localStorage.setItem('token', response.data.token)
          context.commit('setToken', response.data.token)
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    logout (context) {
      return new Promise((resolve) => {
        localStorage.removeItem('token')
        context.commit('setToken', null)
        resolve(true)
      })
    }
  },
  getters: {
    getToken (state) {
      return state.token
    }
  }
}

export default moduleAuth
