import axios from 'axios'
const moduleProducts = {
  namespaced: true,
  state: () => {
    return {
      listProducts: [],
      listDetail: {},
      isLoading: false,
      isError: false,
      errMessage: '',
      data: {
        search: '',
        sort: ''
      },
      pagination: {}
    }
  },
  mutations: {
    setPagination (state, payload) {
      state.pagination = payload
    },
    mutationSetListProducts (state, payload) {
      state.listProducts = payload
    },
    mutationDetail (state, payload) {
      state.listDetail = payload
    },
    setIsLoading (state, payload) {
      state.isLoading = payload
    },
    setIsError (state, payload) {
      state.isError = payload
    },
    setErrorMsg (state, payload) {
      state.errMessage = payload
    }
  },
  actions: {
    actionGetProductsFromAPI (context, data) {
      axios.get(`${context.rootState.setURL}/products?searchParams=&search=${data.search}&param=price&sort=${data.sort}&page=${data.page}&limit=6`, { headers: { token: context.rootState.auth.token } }).then((response) => {
        if (response.data.code === 404) {
          context.commit('setIsError', true)
          context.commit('setErrorMsg', "Sorry, we couldn't find your menu")
        } else {
          context.commit('setIsError', false)
          context.commit('mutationSetListProducts', response.data.data)
          context.commit('setPagination', response.data.pagination)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    actionDetailProducts (context, id) {
      axios.get(`${context.rootState.setURL}/product/${id}`, { headers: { token: context.rootState.auth.token } }).then((response) => {
        context.commit('mutationDetail', response.data.data[0])
      }).catch((err) => {
        console.log(err)
      })
    },
    insertProducts (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${context.rootState.setURL}/products`, data, { headers: { token: context.rootState.auth.token } }).then((response) => {
          resolve(response.data.message)
        }).catch((err) => {
          console.log(err)
        })
      })
    },
    deleteProducts (context, id) {
      axios.delete(`${context.rootState.setURL}/products/${id}`, { headers: { token: context.rootState.auth.token } }).then((response) => {
        context.commit(response, id)
      }).catch((err) => {
        console.log(err)
      })
    },
    editProducts (context, data) {
      return new Promise((resolve, reject) => {
        axios.patch(`${context.rootState.setURL}/products/${data.id}`, data.fd, { headers: { token: context.rootState.auth.token } }).then((response) => {
          resolve(response.data)
          console.log(response.data)
        }).catch((err) => {
          console.log(err)
        })
      })
    }
  },
  getters: {
    getListProducts (state) {
      return state.listProducts
    },
    getDetailProducts (state) {
      return state.listDetail
    },
    getPagination (state) {
      return state.pagination
    },
    isError (state) {
      return state.isError
    },
    errMessage (state) {
      return state.errMessage
    }
  }
}

export default moduleProducts
