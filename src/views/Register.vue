<template>
  <div>
    <div class="container p-5 m-5">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="onSubmitRegister()">
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
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
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
  background-color: rgba(242, 79, 138, 0.8);
  width: 18%;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  border-radius: 6px;
  margin-right: 100px;
}
</style>
