const mixins = {
  data () {
    return {
      btnStripShow: false
    }
  },
  methods: {
    btnStrip () {
      this.btnStripShow = !this.btnStripShow
    }
  }
}

export default mixins
