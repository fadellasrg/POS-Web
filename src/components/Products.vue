<template>
  <div>
    <div id="product" class="col-12 text-justify">
      <img
        @click="addToCart(element)"
        :src="`${serverURL}/images/${element.images}`"
        class="figure-img img-fluid rounded"
        :alt="element.image"
      />
      <div>{{ element.name }}</div>
      <div class="price">{{ convertRP(element.price) }}</div>
      <router-link :to="'/detail/' + element.id_product">
        <button id="detail-btn" type="button" class="btn">Detail</button>
      </router-link>
      <router-link :to="'/edit/' + element.id_product">
        <button id="edit-btn" class="btn" type="button">Edit</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import dataMixins from '../helpers/mixins'
export default {
  mixins: [dataMixins],
  props: ['element'],
  data () {
    return {
      serverURL: process.env.VUE_APP_URL
    }
  },
  methods: {
    addToCart (element) {
      this.$emit('actionCart', element)
    }
  }
}
</script>

<style>
#detail-btn {
  background-color: rgba(240, 51, 120, 0.8);
  /* width: 40%; */
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  margin-top: 5px;
}
#edit-btn {
  background-color: rgba(87, 202, 213, 0.8);
  /* width: 40%; */
  color: rgba(255, 255, 255, 0.8);
  margin-top: 5px;
  margin-left: 5px;
}
svg {
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
}
#content::after {
  content: "";
  width: 165px;
  height: 130px;
  background-color: #333;
  position: absolute;
  top: 20px;
  left: 20px;
  right: 0;
  bottom: 0;
  opacity: 0.5;
  border-radius: 5px;
}
</style>
