const mixins = {
  data () {
    return {
      btnStripShow: false
    }
  },
  methods: {
    btnStrip () {
      this.btnStripShow = !this.btnStripShow
    },
    convertRP: (number) => {
      return number.toLocaleString('id', { style: 'currency', currency: 'IDR' }).replace(',00', '').replace('Rp', 'Rp.')
    }
  }
}

export default mixins
