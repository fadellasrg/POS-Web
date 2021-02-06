<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2 col-sm-4">
        <nav class="navbar navbar-light">
          <img
            @click="btnStrip()"
            src="../assets/img/strip.png"
            class="img-thumbnail mt-3"
            alt="Menu"
          />
        </nav>
      </div>
      <div class="col-md-8 col-sm-6 text-center">
        <div id="font-header">Edit Product</div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-1 text-center">
          <div v-if="btnStripShow">
            <componentNavbar />
          </div>
        </div>
        <div style="display: flex; justify-content: center;" class="col-md-10">
          <div id="cardEdit">
            <div class="card">
              <div class="card-body">
                <input
                  type="text"
                  v-model="getDetail.name"
                  class="form-control"
                  placeholder="Name"
                />
                <input
                  type="text"
                  v-model="getDetail.price"
                  class="form-control"
                  placeholder="Price"
                />
                <input
                  type="text"
                  v-model="getDetail.image"
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
                  v-model="getDetail.id_category"
                  style="margin-top: 10px; width: 100%"
                  class="form-select form-select-lg mb-3"
                >
                  <option disabled value="">Category</option>
                  <option value="1">Dessert</option>
                  <option value="2">Drink</option>
                  <option value="3">Food</option>
                </select>
              </div>
              <button @click="onEdit()" class="btn add-btn">Save</button>
              <button @click="onCancel()" class="btn cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import dataMixins from '../helpers/mixins'
import componentNavbar from '../components/Navbar'
export default {
  mixins: [dataMixins],
  components: {
    componentNavbar
  },
  data () {
    return {
      paramId: this.$route.params.id,
      form: {
        name: '',
        image: '',
        price: '',
        images: '',
        id_category: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      gettersListProducts: 'products/getListProducts',
      getDetail: 'products/getDetailProducts'
    })
  },
  methods: {
    ...mapActions({
      actionEdit: 'products/editProducts',
      actionDetail: 'products/actionDetailProducts'
    }),
    uploadFile (el) {
      this.getDetail.images = el.target.files[0]
    },
    onEdit () {
      const fd = new FormData()
      fd.append('name', this.getDetail.name)
      fd.append('image', this.getDetail.image)
      fd.append('price', this.getDetail.price)
      fd.append('id_category', this.getDetail.id_category)
      fd.append('image', this.getDetail.images)
      const data = {
        id: this.paramId,
        fd: fd
      }
      this.actionEdit(data)
        .then(response => {
          if (response.code === 500) {
            alert(response.message)
          } else {
            alert(response.message)
            this.$router.push('/')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    onCancel () {
      this.$router.push('/')
    }
  },
  mounted () {
    this.actionDetail(this.paramId)
  }
}
</script>

<style scoped>
#cardEdit {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
.add-btn {
  background-color: rgba(242, 79, 138, 0.8);
  width: 90%;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 10px;
  border-radius: 6px;
  margin-left: 20px;
}
.cancel-btn {
  background-color: rgba(87, 202, 213, 0.8);
  width: 90%;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
  border-radius: 6px;
  margin-left: 20px;
}
</style>
