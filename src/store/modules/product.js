import axios from 'axios'
const moduleProducts = {
  namespaced: true,
  state: () => {
    return {
      listProducts: [],
      detail: {},
      isLoading: false,
      isError: false,
      errMessage: '',
      data: {
        search: '',
        sort: ''
      }
    }
  },
  mutations: {
    mutationSetListProducts (state, payload) {
      state.listProducts = payload
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
      axios.get(`http://localhost:3000/products?searchParams=&search=${data.search}&param=price&sort=${data.sort}&page=&limit=100`, { headers: { token: context.rootState.auth.token } }).then((response) => {
        if (response.data.code === 404) {
          context.commit('setIsError', true)
          context.commit('setErrorMsg', "Sorry, we couldn't find your menu")
        } else {
          context.commit('setIsError', false)
          context.commit('mutationSetListProducts', response.data.data)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    insertProducts (context, data) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/products', data, { headers: { token: context.rootState.auth.token } }).then((response) => {
          resolve(response.data.message)
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
    isError (state) {
      return state.isError
    },
    errMessage (state) {
      return state.errMessage
    }
  }
}

export default moduleProducts
