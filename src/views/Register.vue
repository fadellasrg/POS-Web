<template>
  <div>
    <form @submit.prevent="onSubmitRegister()" class="box">
      <img src="../assets/img/mugs.png" alt="" style="width: 100%;" class="mb-2">
      <!-- <div style="font-size: 30px; color: black;">Register</div> -->
      <input
        v-model="name"
        type="text"
        class="form-control mb-2"
        placeholder="Name" required
      />
      <input
        v-model="email"
        type="email"
        class="form-control mb-2"
        placeholder="Email" required
      />
      <input
        v-model="password"
        type="password"
        class="form-control mb-2"
        placeholder="Password" required
      />
      <select
        v-model="access"
        style="margin-top: 10px; width: 100%"
        class="form-select form-select-lg mb-3" required
      >
        <option disabled value="">Access</option>
        <option value="0">Admin</option>
        <option value="1">Cashier</option>
      </select>
      <button type="submit" class="btn register-btn">Register</button>
      <router-link to="/login" style="color: white;">
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
  color: black;
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
