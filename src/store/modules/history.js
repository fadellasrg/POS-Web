import axios from 'axios'
const moduleHistory = {
  namespaced: true,
  state: () => {
    return {
      listHistory: [],
      listDetail: {},
      data: {
        search: ''
      },
      isError: false,
      errMessage: '',
      pagination: {}
    }
  },
  mutations: {
    setPagination (state, payload) {
      state.pagination = payload
    },
    mutationDetail (state, payload) {
      state.listDetail = payload
    },
    mutationListHistory (state, payload) {
      state.listHistory = payload
    },
    setIsError (state, payload) {
      state.isError = payload
    },
    setErrorMsg (state, payload) {
      state.errMessage = payload
    }
  },
  actions: {
    actionGetHistoryFromAPI (context, data) {
      axios.get(`http://localhost:3000/history?searchParams=&search=${data.search}&param=&sort=&page=${data.page}&limit=`, { headers: { token: context.rootState.auth.token } }).then((response) => {
        // console.log(response.data)
        if (response.data.code === 404) {
          context.commit('setIsError', true)
          context.commit('setErrorMsg', 'Data unavailable')
        } else {
          context.commit('setIsError', false)
          context.commit('mutationListHistory', response.data.data)
          context.commit('setPagination', response.data.pagination)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    actionDetailHistory (context, data) {
      axios.get(`http://localhost:3000/detailHistory/${data}`, { headers: { token: context.rootState.auth.token } }).then((response) => {
        context.commit('mutationDetail', response.data.data)
      }).catch((err) => {
        console.log(err)
      })
    },
    insertHistory (context, data) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/history', data, { headers: { token: context.rootState.auth.token } }).then((response) => {
          resolve(response.data)
        }).catch((err) => {
          console.log(err)
        })
      })
    }
  },
  getters: {
    getListHistory (state) {
      return state.listHistory
    },
    getPagination (state) {
      return state.pagination
    },
    isError (state) {
      return state.isError
    },
    errMessage (state) {
      return state.errMessage
    },
    getDetailHistory (state) {
      return state.listDetail
    }
  }
}

export default moduleHistory
