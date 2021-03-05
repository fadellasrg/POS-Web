<template>
  <div>
    <!-- <div class="container p-5 m-5">
      <div class="card">
        <div class="card-body"> -->
          <form @submit.prevent="onSubmitLogin()" class="box">
            <img src="../assets/img/mugs.png" alt="" style="width: 100%;" class="mb-3">
            <!-- <div style="font-size: 30px; color: white;">Login</div> -->
            <input
              v-model="email"
              type="text"
              class="form-control mb-2"
              placeholder="Email"
            />
            <input
              v-model="password"
              type="password"
              class="form-control mb-2"
              placeholder="Password"
            />
            <button type="submit" class="btn login-btn">Login</button>
            <router-link to="/register" v-white="{ color: 'white' }">
            Register
            </router-link>
          </form>
        </div>
      <!-- </div>
    </div>
  </div> -->
</template>

<script>
import { mapActions } from 'vuex'
import dataMixins from '../helpers/mixins'
export default {
  mixins: [dataMixins],
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({
      actionLogin: 'auth/login'
    }),
    onSubmitLogin () {
      const data = {
        email: this.email,
        password: this.password
      }
      this.actionLogin(data)
        .then(response => {
          if (response.code === 404 || response.code === 500) {
            alert(response.message)
          } else {
            this.$router.push('/')
          }
        })
        .catch(err => {
          alert(err)
        })
    }
  }
}
</script>

<style scoped>
.login-btn {
  background-color: white;
  width: 100%;
  color: black;
  margin-top: 20px;
  border-radius: 6px;
  margin-bottom: 20px;
}
.box {
  width: 350px;
  padding: 40px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f192a1;
  text-align: center;
  border-radius: 10px;
}
.box input {
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid rgb(255, 255, 255);
  padding: 14px 10px;
  width: 250px;
  outline: none;
  color: black;
  border-radius: 24px;
}
</style>
