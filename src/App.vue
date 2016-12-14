<template lang="pug">
#app
  keep-alive
    router-view(name="alive")
  router-view(name="reset")
  mu-snackbar(v-if="snackbar.show", :message="snackbar.message", action="关闭", @actionClick="toogleSnackbar()")
</template>

<script>
import { mapState, mapActions  } from 'vuex'

export default {
  mounted () {
    this.$nextTick(() => {

    })
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'toogleSnackbar'
    ])
  },
  computed: {
    ...mapState([
      'user',
      'snackbar'
    ])
  }
}
</script>

<style lang="stylus">
.appbar
  position fixed
  top 0

.content
  padding-top 56px
  @media (min-width: 480px)
    padding-top 64px

.pull-right
  float right
  &:after
    content "."
    display block
    height 0
    clear both
    visibility hidden

/*动画样式*/
.fade-enter-active, .fade-leave-active
  transition opacity .5s ease

.fade-enter, .fade-leave-active
  opacity 0

.slide-left-enter, .slide-right-leave-active
  opacity 0
  transform translate(100%, 0)

.slide-left-leave-active, .slide-right-enter
  opacity 0
  transform translate(-100%, 0)
</style>
