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
      <div class="col-md-7 col-sm-6 text-center">
        <div id="font-header">Menu Details</div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-1 text-center">
          <div v-if="btnStripShow">
            <componentNavbar />
          </div>
        </div>
        <div style="display: flex; justify-content: center" class="col-md-9">
          <div class="card" style="width: 18rem">
            <img
              class="card-img-top"
              :src="`${serverURL}/images/${getDetail.images}`"
              :alt="getDetail.image"
            />
            <div id="details" class="card-body">
              Name: {{ getDetail.name }} <br />
              Price: {{ getDetail.price }} <br />
              Category: {{ getDetail.category }} <br />
            </div>
            <button
              @click="deleteData()"
              id="delete-btn"
              type="button"
              class="btn"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
      serverURL: process.env.VUE_APP_URL
    }
  },
  computed: {
    ...mapGetters({
      getDetail: 'products/getDetailProducts'
    })
  },
  methods: {
    ...mapActions({
      actionDetail: 'products/actionDetailProducts',
      actionDelete: 'products/deleteProducts'
    }),
    deleteData () {
      const alert = confirm('Delete this product?')
      if (alert === true) {
        this.actionDelete(this.paramId)
        this.$router.push('/')
      }
    }
  },
  mounted () {
    this.actionDetail(this.paramId)
  }
}
</script>

<style scoped>
#details {
  padding: 5px;
  font-size: 20px;
  font-weight: bold;
}
#delete-btn {
  background-color: rgba(240, 51, 120, 0.8);
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  margin-top: 5px;
  width: 50%;
  margin: 20px;
  margin-left: 70px;
}
</style>
