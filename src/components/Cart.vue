<template>
  <div class="container-fluid">
    <div style="display: flex;" class="row cart">
      <div v-for="(item, index) in dataCartProducts" :key="index">
        <div class="row cart">
          <div class="col-md-4 col-sm-4 col-4">
            <img
              :src="`${serverURL}/images/${item.images}`"
              :alt="item.category"
              class="figure-img img-fluid rounded"
            />
          </div>
          <div class="col-md-4">
            {{ item.name }}
            <div class="btn-group" role="group">
              <button @click="btnMin(item.id_product)" type="button" class="btn btn-outline-primary">-</button>
              <button type="button" class="btn btn-outline-secondary" disabled>
                {{ item.qty }}
              </button>
              <button @click="btnPlus(item.id_product)" type="button" class="btn btn-outline-primary">+</button>
            </div>
          </div>
          <div class="col-md-4 col-sm-4 col-4 price">
            {{ item.price }}
            <button @click="deleteCart(item.id_product)" id="btnDelCart">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['dataCartProducts'],
  data () {
    return {
      serverURL: process.env.VUE_APP_URL,
      dataCart: this.dataCartProducts
    }
  },
  methods: {
    deleteCart (idProduct) {
      const newCart = this.dataCart.filter((el) => {
        return el.id_product !== idProduct
      })
      this.dataCart = newCart
      // console.log(this.dataCartProducts)
      console.log(this.dataCart)
      // console.log(newCart)
    }
  }
}
</script>

<style scoped>
#btnDelCart {
  background-color: rgba(240, 51, 120, 0.8);
  width: 80%;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  margin-top: 5px;
  border-radius: 6px;
}
</style>
