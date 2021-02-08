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
    convertRP: number => {
      return number
        .toLocaleString('id', { style: 'currency', currency: 'IDR' })
        .replace(',00', '')
        .replace('Rp', 'Rp.')
    }
  },
  directives: {
    white: function (el, binding) {
      el.style = `color: ${binding.value.color}`
    }
  }
}

export default mixins
