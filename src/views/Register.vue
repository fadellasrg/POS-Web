<template>
  <div>
    <form @submit.prevent="onSubmitRegister()" class="box">
      <div style="font-size: 30px; color: white;">Register</div>
      <input
        v-model="name"
        type="text"
        class="form-control mb-2"
        placeholder="Name"
      />
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
      <select
        v-model="access"
        style="margin-top: 10px; width: 100%"
        class="form-select form-select-lg mb-3"
      >
        <option disabled value="">Access</option>
        <option value="0">Admin</option>
        <option value="1">Cashier</option>
      </select>
      <button type="submit" class="btn register-btn">Register</button>
      <router-link to="/login" v-white="{ color: 'white' }">
        Login
      </router-link>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import dataMixins from '../helpers/mixins'
export default {
  mixins: [dataMixins],
  data () {
    return {
      name: '',
      email: '',
      password: '',
      access: ''
    }
  },
  methods: {
    ...mapActions({
      actionRegister: 'auth/register'
    }),
    onSubmitRegister () {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        access: this.access
      }
      this.actionRegister(data)
        .then(response => {
          console.log(response)
          if (response.code === 500) {
            alert(response.message)
          } else {
            this.$router.push('/login')
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
.register-btn {
  background-color: rgba(255, 255, 255, 0.8);
  width: 100%;
  color: rgba(242, 79, 138, 0.8);
  margin: 0;
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
  background: rgba(242, 79, 138, 0.8);
  text-align: center;
  border-radius: 50px;
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
  color: white;
  border-radius: 24px;
}
</style>
