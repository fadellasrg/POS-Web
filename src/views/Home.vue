<template>
  <div class="container-fluid">
      <div class="row">
          <div class="col-md-8">
              <nav class="navbar navbar-light">
                  <img @click="btnStrip()" src="../assets/img/strip.png" class="img-thumbnail" alt="Menu">
                  <div id="font-header" class="text-center">Food Items</div>
                  <div v-if="btnSearchShow">
                      <b-form-input v-model="form.inputSearch" @keyup="action()" type="text" placeholder="Search menu"></b-form-input>
                  </div>
                  <img @click="btnSearch()" src="../assets/img/search.png" class="img-thumbnail" alt="Search">
              </nav>
          </div>
          <div id="font-header" class="col-md-4 text-center" style="box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);">Cart
            <a href="#hrefCart">
              <span class="badge rounded-pill text-white">0</span>
            </a>
          </div>
      </div>

    <div class="container-fluid">
          <div class="row">
              <div class="col-md-1 text-center">
                <div v-if="btnStripShow">
                  <componentNavbar/>
                </div>
            </div>
              <div class="product col-md-7 col-12 text-center">
                <div class="container-fluid">
                  <div class="row">
                  <div id="optionSort" class="col-12 ml-4">
                    <select class="form-select p-1" @change="action()" v-model="form.sortProducts">
                      <option disabled value="">Price</option>
                      <option value="asc">Lower Price</option>
                      <option value="desc">Higher Price</option>
                    </select>
                  </div>
                    <div v-if="productsIsError">
                      {{productsErrMsg}}
                    </div>
                    <div v-else class="col-lg-4 col-md-6 col-6" v-for="(element, index) in gettersListProducts" :key="index">
                      <componentProducts :element = "element"/>
                      <!-- <componentProducts :element = "element" v-on:actionCart="actChild" /> -->
                      <!-- {{element.name}}
                      {{element.price}} -->
                    </div>
                    <div style="display: flex;" class="overflow-auto">
                      <b-pagination style="align-self: flex-end;" @input="action()"
                      v-model="productsPagination.page" pills
                      :total-rows="productsPagination.totalData"
                      :per-page="productsPagination.limit"
                      size="sm">
                      </b-pagination>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div id="hrefCart" class="col-md-4 col-sm-12 text-center" style="min-height: 100vh;">
                <div class="container-fluid">
                  <div style="display: flex" class="row cart">
                    <div v-for="(item, index) in dataCart" :key="index">
                        <div class="row cart">
                          <div class="col-md-4 col-sm-4 col-4">
                            <img :src="item.image" :alt="item.category" class="figure-img img-fluid rounded">
                          </div>
                          <div class="col-md-4 col-sm-4 col-4">{{item.name}}
                          <div class="btn-group" role="group">
                              <button @click="btnMin(item.id_product)" type="button" class="btn btn-outline-primary">-</button>
                              <button type="button" class="btn btn-outline-secondary" disabled>{{item.qty}}</button>
                              <button @click="btnPlus(item.id_product)" type="button" class="btn btn-outline-primary">+</button>
                            </div>
                          </div>
                          <div class="col-md-4 col-sm-4 col-4 price">{{ convertToRupiah (item.totalPrice) }}
                            <button id="btnDelete" @click="deleteCart(item.id_product)">Delete</button>
                        </div>
                      </div>
                    </div>
                    <div v-if="dataCart.length < 1" id="resize" class="col-md-12">
                      <img src="../assets/img/empty_cart.png" alt="Empty Cart">
                      <div style="padding: 0px 0px 0px 0px; font-weight: bold; font-size: 22px;">Your cart is empty</div>
                      <div style="padding: 0px 0px 20px 0px; color: rgba(190, 195, 202, 0.911); font-size: 14px;">Please add some items from the menu</div>
                      </div>
                    <footer style="align-self: flex-end">
                      <div v-if="dataCart.length > 0" class="col-md-12">Total : {{this.convertToRupiah(total)}}</div>
                      <div v-if="dataCart.length > 0" class="col-md-12">*Belum termasuk PPN</div>
                    </footer>
                  </div>
                    <button v-if="dataCart.length > 0" v-b-modal.my-modal v-on:click="checkout()" id="btn-checkoutPink" class="btn" type="button">Checkout
                      <b-modal ref="my-modal" hide-footer id="my-modal" centered title="Checkout">
                      <div class="row">
                        <div style="padding-bottom: 40px;" class="col-md-6">
                            <div style="font-size: 12px;">Cashier: Cashier 26</div>
                        </div>
                          <div class="col-md-6 text-right">
                            <div>Receipt no: #10932</div>
                          </div>
                      </div>
                      <div v-for="(item, index) in dataCart" :key="index" class="row">
                        <div class="col-md-6 col-sm-8 col-8 pop-menus">
                            <div>{{item.name}} {{item.qty}}x</div>
                        </div>
                        <div class="col-md-6 col-sm-4 col-4 text-right pop-price">
                            <div>{{convertToRupiah(item.price)}}</div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6 col-sm-8 col-8 pop-menus">
                            <div>PPN 10%</div>
                        </div>
                        <div class="col-md-6 col-sm-4 col-4 text-right pop-price">
                            <div>{{convertToRupiah(total * 0.1)}}</div>
                        </div>
                      </div>
                      <div class="row">
                      <div class="col-md-12 text-right">
                          <div style="padding-top: 20px; font-weight: bold">Total: {{convertToRupiah(total + (total * 0.1))}}</div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-12">
                          <div>Payment: Cash</div>
                      </div>
                  </div>
                  <div id="bottom-btn-checkout" class="container-fluid text-center">
                      <div class="row">
                          <div class="col-md-12">
                              <button id="pop-pink" class="btn" type="button" v-on:click="hideModal()">Print</button>
                          </div>
                          <div class="col-md-12">Or</div>
                          <div class="col-md-12">
                              <button id="pop-blue" class="btn" type="button" v-on:click="hideModal()">Send Email</button>
                          </div>
                      </div>
                  </div>
                    </b-modal>
                    </button>
                    <button v-if="dataCart.length > 0" v-on:click="cartCancel()" id="btn-checkoutBlue" class="btn" type="button">Cancel</button>
                  </div>
            </div> -->
          </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import dataMixins from '../helpers/mixins'
import componentNavbar from '../components/Navbar'
import componentProducts from '../components/Products'
export default {
  mixins: [dataMixins],
  name: 'Home',
  data () {
    return {
      btnSearchShow: false,
      form: {
        inputSearch: '',
        sortProducts: ''
      }
    }
  },
  components: {
    componentNavbar,
    componentProducts
  },
  computed: {
    ...mapGetters({
      productsPagination: 'products/getPagination',
      gettersListProducts: 'products/getListProducts',
      productsIsError: 'products/isError',
      productsErrMsg: 'products/errMessage'
    })
  },
  methods: {
    ...mapActions({
      actionGetProductsFromAPI: 'products/actionGetProductsFromAPI'
    }),
    btnSearch: function () {
      this.btnSearchShow = !this.btnSearchShow
    },
    action: function () {
      const data = {
        search: this.form.inputSearch,
        sort: this.form.sortProducts,
        page: this.productsPagination.page ? this.productsPagination.page : '1'
      }
      this.actionGetProductsFromAPI(data)
    }
  },
  mounted () {
    this.action()
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap');
#font-header{
  font-size: 30px;
  font-weight: bold;
}
#optionSort{
  display: flex;
  justify-content: left;
}
#optionSort select{
  color: white;
  /* background-color: rgba(19, 117, 117, 0.911); */
  background-color: rgba(242,79,138, 0.8);
  border-radius: 12px;
}
#product{
  padding: 20px
}
#product img{
  height: 130px;
  width: 170px;
}
#resize img{
  padding: 40px 0px 0px 0px;
  height: 180px;
  width: auto;
}
div{
  font-family: 'Noto Sans JP', sans-serif;
}
.row .text-center{
  padding: 20px 0px 20px 0px;
}
.product.col-md-7{
  background-color: rgba(190, 195, 202, 0.3);
  box-shadow: 0px 4px 2px rgba(0, 0, 0, 0.25);
  padding-left: 15px;
}
.price{
  font-weight: bold;
}
.rounded-pill{
  background-color: rgba(16, 220, 235, 0.911);
}
/* .itemTitle{
  font-weight: bold;
  padding-bottom: 20px;
  font-size: 20px;
  right: 0;
  top: 0;
} */
/* .total{
  position: absolute;
  right: 0px;
  left: 8px;
  bottom: 70px;
} */
#btn-checkoutPink{
  /* position: absolute; */
  position: relative;
  right: 0;
  left: 8px;
  bottom: 6%;
  border-radius: 0px;
  background-color: rgba(242,79,138, 0.8);
  width: 100%;
  color: rgba(255,255,255, 0.8);
  margin-top: 10px;
}
#btn-checkoutBlue{
  /* position: absolute; */
  position: relative;
  right: 0;
  left: 8px;
  bottom: 2%;
  border-radius: 0px;
  background-color: rgba(87,202,213, 0.8);
  width: 100%;
  color: rgba(255,255,255, 0.8);
  margin-top: 4px;
}
.cart img{
  padding-left: 10px;
  padding-bottom: 10px;
  height: 100px;
  width: 120px;
}
.cart div{
  font-weight: bold;
  font-size: 16px;
}
.cart .price{
  font-size: 15px;
  padding: 40px 0px 0px 50px;
}
.cart .btn-group button{
    font-weight: bold;
    background: rgba(130, 222, 58, 0.2);
    border: 1px solid rgba(130, 222, 58, 0.8);
    color: rgba(130,222,58,1);
    box-sizing: border-box;
    padding: 4px 9px 4px 9px;
    margin-top: 30px;
    margin-bottom: 20px;
}
.cart .btn-group .btn-outline-secondary{
    background-color: rgba(255,255,255, 0.8);
}
#btnDelete{
  background-color: rgba(240, 51, 120, 0.8);
  width: 80%;
  color: rgba(255,255,255, 0.8);
  margin: 0;
  margin-top: 5px;
  border-radius: 6px;
}
#pop-pink{
  background-color: rgba(242,79,138, 0.8);
  width: 100%;
  color: rgba(255,255,255, 0.8);
  margin-top: 20px;
  border-radius: 6px;
}
#pop-blue{
    background-color: rgba(87,202,213, 0.8);
    width: 100%;
    color: rgba(255,255,255, 0.8);
    margin: 0;
    border-radius: 6px;
}
.pop-menus div{
    padding-bottom: 8px;
    font-weight: bold;
}
.pop-price div{
    padding-bottom: 8px;
    font-weight: bold;
}
footer div{
  position: relative;
  bottom: 10%;
  font-weight: bold;
  font-size: 15px;
}
/* @media (min-width: 300px) and (max-width: 767px) {
  .product.col-7{
  }
} */
</style>
