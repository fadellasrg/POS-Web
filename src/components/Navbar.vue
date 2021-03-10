<template>
  <div>
    <nav id="side-bar" class="navbar navbar-light">
      <router-link to="/"
        ><img src="../assets/img/fork.png" class="img-fluid" alt="Food"
      /></router-link>
      <router-link to="/history"
        ><img
          src="../assets/img/clipboard.png"
          class="img-fluid"
          alt="Clipboard"
      /></router-link>
      <img
        style="margin-bottom: 28px;"
        v-b-modal.modal-center
        src="../assets/img/add.png"
      />
      <b-modal
        ref="my-modalAdd"
        hide-footer
        id="modal-center"
        centered
        title="Add Item"
      >
        <div style="height: 280px" class="container-fluid">
          <input
            type="text"
            v-model="form.name"
            class="form-control"
            placeholder="Name"
          />
          <input
            type="text"
            v-model="form.price"
            class="form-control"
            placeholder="Price"
          />
          <input
            type="text"
            v-model="form.image"
            class="form-control"
            placeholder="File Name"
          />
          <input
            @change="uploadFile($event)"
            type="file"
            class="form-control"
            placeholder="File"
          />
          <select
            v-model="form.id_category"
            style="margin-top: 10px; width: 100%"
            class="form-select form-select-lg mb-3"
          >
            <option disabled value="">Category</option>
            <option value="1">Dessert</option>
            <option value="2">Drink</option>
            <option value="3">Food</option>
          </select>
        </div>
        <button @click="onAdd()" class="btn add-btn">Add</button>
        <button @click="hideModal()" class="btn cancel-btn">Cancel</button>
      </b-modal>
      <img
        src="../assets/img/logout.png"
        @click="onLogout()"
        class="img-fluid"
        alt="Logout"
      />
    </nav>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {
        name: '',
        image: '',
        price: '',
        id_category: '',
        images: ''
      }
    }
  },
  methods: {
    ...mapActions({
      actionLogout: 'auth/logout',
      actionInsert: 'products/insertProducts',
      actionGetProductsFromAPI: 'products/actionGetProductsFromAPI'
    }),
    uploadFile (el) {
      this.form.images = el.target.files[0]
    },
    onAdd () {
      const fd = new FormData()
      fd.append('name', this.form.name)
      fd.append('image', this.form.image)
      fd.append('price', this.form.price)
      fd.append('id_category', this.form.id_category)
      fd.append('image', this.form.images)
      this.actionInsert(fd)
        .then(response => {
          console.log(response)
          if (response.code === 500) {
            alert(response.message)
          } else {
            this.$refs['my-modalAdd'].hide()
          }
          const data = {
            search: '',
            sort: '',
            page: ''
          }
          this.actionGetProductsFromAPI(data)
          // this.$router.go('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    onLogout () {
      this.actionLogout().then(response => {
        if (response) {
          this.$router.push('/login')
        }
      })
    },
    hideModal () {
      this.$refs['my-modalAdd'].hide()
    }
  }
}
</script>

<style scoped>
#side-bar img {
  margin-top: 2px;
  margin-left: 5px;
  margin-bottom: 35px;
  height: 32px;
  width: auto;
}
.add-btn {
  background-color: rgba(242, 79, 138, 0.8);
  width: 18%;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  border-radius: 6px;
  margin-right: 115px;
}
.cancel-btn {
  background-color: rgba(87, 202, 213, 0.8);
  width: 18%;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  border-radius: 6px;
  margin-right: 15px;
}
input {
  margin: 10px 0px 0px 0px;
}
button {
  margin-top: 20px;
  position: absolute;
  right: 15px;
  bottom: 20px;
}
</style>
