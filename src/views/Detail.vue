<template>
    <div>
        <h1>Detail {{paramId}}</h1>
        {{getDetail}}
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      paramId: this.$route.params.id
    }
  },
  computed: {
    ...mapGetters({
      getDetail: 'getDetail'
    })
  },
  methods: {
    ...mapActions({
      actionDetail: 'actionDetail'
    })
  },
  mounted () {
    this.actionDetail(this.paramId)
  }
}
</script>
