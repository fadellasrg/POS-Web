// import axios from 'axios'
// const moduleUsers = {
//   namespaced: true,
//   state: () => {
//     return {
//       listUsers: []
//     }
//   },
//   mutations: {
//     mutationSetListUsers (state, payload) {
//       state.listUsers = payload
//     }
//   },
//   actions: {
//     actionGetUsersFromAPI ({ commit }) {
//       axios.get('http://localhost:3000/products?searchParams=&search=&param=&sort=&page=&limit=').then((response) => {
//         commit('mutationSetListUsers', response.data)
//       }).catch((err) => {
//         console.log(err)
//       })
//     }
//   },
//   getters: {
//     getListUsers (state) {
//       return state.listUsers
//     }
//   }
// }

// export default moduleUsers
