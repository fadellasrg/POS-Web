<template>
  <div class="history">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2 col-sm-4">
          <nav class="navbar navbar-light">
            <img
              @click="btnStrip()"
              src="../assets/img/strip.png"
              class="img-thumbnail img-strip"
              alt="Menu"
            />
          </nav>
        </div>
        <div class="col-md-8 col-sm-6">
          <div class="text-center" style="font-size: 30px; font-weight: bold;">
            History
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-1 text-center">
          <div v-if="btnStripShow">
            <componentNavbar style="padding-left: 15px;" />
          </div>
        </div>
        <div class="col-md-11">
          <div
            class="container-fluid"
            style="box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);"
          >
            <div class="row">
              <div id="history-box" class="col text-justify first-box">
                <div class="first-history-text">Today's Income</div>
                <div class="history-number">Rp. 10.000</div>
                <div class="history-text">+2% Yesterday</div>
                <div id="dot">
                  <span class="bottom-dot"></span>
                  <span class="middle-dot"></span>
                  <span class="top-dot"></span>
                </div>
              </div>
              <div id="history-box" class="col text-justify second-box">
                <div class="first-history-text">Orders</div>
                <div class="history-number">3.270</div>
                <div class="history-text">+5% Last Week</div>
                <div id="dot">
                  <span class="bottom-dot"></span>
                  <span class="middle-dot"></span>
                  <span class="top-dot"></span>
                </div>
              </div>
              <div id="history-box" class="col text-justify third-box">
                <div class="first-history-text">This Year's Income</div>
                <div class="history-number">Rp. 100.000.000.000</div>
                <div class="history-text">+10% Last Year</div>
                <div id="dot">
                  <span class="bottom-dot"></span>
                  <span class="middle-dot"></span>
                  <span class="top-dot"></span>
                </div>
              </div>
            </div>
            <div class="row container-fluid" style="padding: 50px 0px 40px 0px">
              <div class="col-md-12">
                <div id="revenue">Revenue</div>
                <div
                  style="overflow: scroll; width: 100%; height: auto; padding-top: 20px"
                >
                  <div class="row">
                    <div style="padding: 0px 0px 20px 30px;" class="form-inline">
                      <input
                        type="text"
                        v-model="form.inputSearch"
                        placeholder="Invoice"
                      >
                    <button id="btn-search" class="btn" type="button" @click="action()">Search</button>
                    </div>
                  </div>
                  <table class="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Invoice</th>
                        <th scope="col">Cashier</th>
                        <th scope="col">Date</th>
                        <th scope="col">Orders</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <div v-if="historyIsError">{{ historyErrMsg }}</div>
                      <tr
                        v-else
                        v-for="(element, index) in gettersListHistory"
                        :key="index"
                      >
                        <td>#{{ element.invoice }}</td>
                        <td>{{ element.cashier }}</td>
                        <td>{{ element.date }}</td>
                        <td>{{ element.orders }}</td>
                        <td>
                          {{
                            convertRP(
                              Number(element.amount * 0.1) +
                                Number(element.amount)
                            )
                          }}
                        </td>
                        <td>
                          <button
                            id="btn-detail"
                            type="button"
                            class="btn"
                            @click="btnDetail(element.invoice)"
                            v-b-modal.modal-xl
                          >
                            Detail
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style="display: flex;" class="overflow-auto">
                  <b-pagination
                    style="align-self: flex-end;"
                    @input="action()"
                    v-model="paginationHistory.page"
                    pills
                    :total-rows="paginationHistory.totalData"
                    :per-page="paginationHistory.limit"
                    size="sm"
                  >
                  </b-pagination>
                </div>
                <b-modal
                  ref="my-modalHistory"
                  hide-footer
                  id="modal-xl"
                  size="xl"
                  centered
                  title="Detail History"
                >
                  <div
                    style="overflow: scroll; width: 100%; height: auto; padding-top: 20px"
                  >
                    <table class="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Invoice</th>
                          <th scope="col">Cashier</th>
                          <th scope="col">Date</th>
                          <th scope="col">Item</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Price</th>
                          <th scope="col">PPN</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in detailHistory" :key="index">
                          <td>{{ item.invoice }}</td>
                          <td>{{ item.cashier }}</td>
                          <td>{{ item.date }}</td>
                          <td>{{ item.name }}</td>
                          <td>{{ item.qty }}</td>
                          <td>{{ convertRP(item.price) }}</td>
                          <td>{{ convertRP(item.price * 0.1) }}</td>
                          <td>
                            {{
                              convertRP(
                                item.price * item.qty + item.price * 0.1
                              )
                            }}
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import componentNavbar from '../components/Navbar'
import dataMixins from '../helpers/mixins'
export default {
  mixins: [dataMixins],
  components: {
    componentNavbar
  },
  data () {
    return {
      form: {
        inputSearch: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      paginationHistory: 'history/getPagination',
      gettersListHistory: 'history/getListHistory',
      historyIsError: 'history/isError',
      historyErrMsg: 'history/errMessage',
      detailHistory: 'history/getDetailHistory'
    })
  },
  methods: {
    ...mapActions({
      actionGetHistory: 'history/actionGetHistoryFromAPI',
      actionDetail: 'history/actionDetailHistory'
    }),
    btnDetail (data) {
      this.actionDetail(data)
    },
    action () {
      const data = {
        search: this.form.inputSearch,
        page: this.paginationHistory.page ? this.paginationHistory.page : '1'
      }
      this.actionGetHistory(data)
    }
  },
  mounted () {
    this.action()
  }
}
</script>

<style>
#btn-detail {
  background-color: rgba(240, 51, 120, 0.8);
  color: rgba(255, 255, 255, 0.8);
  margin-top: 5px;
}
#history-box {
  width: auto;
  height: 170px;
  margin: 20px 40px 0px 10px;
  padding: 25px;
}
#revenue {
  font-size: 28px;
  font-weight: bold;
  padding: 10px 0px 20px 40px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
#history-box.first-box {
  background: linear-gradient(
    278.29deg,
    #fbb2b4 30.05%,
    rgba(255, 143, 178, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(255, 143, 178, 0.35));
  border-radius: 10px;
}
#history-box.second-box {
  background: linear-gradient(
    278.29deg,
    #29dfff 30.05%,
    rgba(41, 223, 255, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(41, 223, 255, 0.35));
  border-radius: 10px;
}
#history-box.third-box {
  background: linear-gradient(
    278.29deg,
    #ab84c8 30.05%,
    rgba(241, 201, 236, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(241, 201, 236, 0.5));
  border-radius: 10px;
}
#btn-search {
  font-size: 13px;
  position: relative;
  right: 0;
  left: 0px;
  border-radius: 0px;
  background-color: rgba(242, 79, 138, 0.8);
  /* width: 100%; */
  color: rgba(255, 255, 255, 0.8);
  /* margin-top: 10px; */
  height: 32px;
}
.img-strip {
  margin-top: 18px;
}
.first-history-text {
  font-size: 11px;
  font-weight: bold;
  padding-top: 20px;
}
.history-text {
  font-size: 11px;
  font-weight: bold;
}
.history-number {
  font-size: 25px;
  font-weight: bold;
}
.first-box #dot span {
  background: rgba(253, 211, 228, 0.3);
}
.second-box #dot span {
  background: rgba(207, 246, 253, 0.3);
}
.third-box #dot span {
  background: rgba(241, 201, 236, 0.15);
}
.bottom-dot {
  height: 70px;
  width: 70px;
  border-radius: 50%;
  right: 25px;
  top: 10px;
  position: absolute;
}
.top-dot {
  height: 70px;
  width: 70px;
  border-radius: 50%;
  right: 50px;
  top: 30px;
  position: absolute;
}
.middle-dot {
  height: 70px;
  width: 70px;
  border-radius: 50%;
  right: 75px;
  top: 50px;
  position: absolute;
}
</style>
