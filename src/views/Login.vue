<template>
    <div>
        <div class="container p-5 m-5">
            <div class="card">
                <div class="card-body">
                  <form @submit.prevent="onSubmitLogin()">
                    <input v-model="email" type="text" class="form-control mb-2" placeholder="Email">
                    <input v-model="password" type="password" class="form-control mb-2" placeholder="Password">
                    <button type="submit" class="btn login-btn">Login</button>
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
      this.actionLogin(data).then((response) => {
        console.log(response)
        if (response.code === 404 || response.code === 500) {
          alert(response.message)
        } else {
          this.$router.push('/')
        }
      }).catch((err) => {
        alert(err)
      })
    }
  }
}
</script>

<style scoped>
.login-btn{
    background-color: rgba(242,79,138, 0.8);
    width: 18%;
    color: rgba(255,255,255, 0.8);
    margin: 0;
    border-radius: 6px;
    margin-right: 100px;
}
</style>
