import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Edit from '../views/Edit.vue'
import History from '../views/History.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { auth: true } // for authentication
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail,
    meta: { auth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { auth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { auth: false }
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit,
    meta: { auth: true }
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: { auth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched[0].meta.auth === true) {
    if (store.getters['auth/getToken']) {
      next()
    } else {
      alert('Login required')
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
