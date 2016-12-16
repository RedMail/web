<template lang="pug">
#index
  mu-appbar.appbar(title="首页")
    mu-icon-button(icon='menu', slot="left")
    mu-icon-menu(icon="more_vert", slot="right")
      mu-menu-item(title="登录", @click="openLogin")
  mu-content-block.content(ref="scroller")
    mu-list
      router-link(v-for="(mail, index) in mails.list", :to="'/detail/' + (index + 1)")
        mu-list-item(:title="mail.subject")
          mu-avatar(slot="leftAvatar") {{mail.from.substr(0, 1).toUpperCase()}}
          span(slot="describe") {{mail.text}}
        mu-divider(inset)
    router-link(to="/new")
      mu-float-button.turn-to-send(icon="create", secondary)
    mu-infinite-scroll(:scroller="scroller", :loading="loading", @load="loadMore()", loadingText="正在加载...")
    mu-dialog(:open="showLogin", title="登录", @close="closeLogin")
      mu-text-field(v-model="id", label="账号", :labelFloat="true", hintText="输入账号", icon="person", :fullWidth="true")
      mu-text-field(v-model="pwd", label="密码", :labelFloat="true", hintText="输入密码", icon="fingerprint", :fullWidth="true", type="password")
      mu-flat-button(slot="actions", @click="closeLogin", primary, label="取消")
      mu-flat-button(slot="actions", @click="login", primary, label="确定")
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'index',
  mounted () {
    this.scroller = this.$refs.scroller.$el
  },
  activated () {
    this.$refs.scroller.$el.scrollLeft = this.position.x
    this.$refs.scroller.$el.scrollTop = this.position.y
  },
  data () {
    return {
      id: '',
      pwd: '',
      showLogin: true,
      page: 1,
      scroller: null,
      loading: false,
      position: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    ...mapState([
      'user',
      'mails'
    ])
  },
  methods: {
    ...mapActions([
      'getMails',
      'toogleSnackbar'
    ]),
    openLogin () {
      this.showLogin = true
    },
    closeLogin () {
      this.showLogin = false
    },
    login () {
      this.getMails(this.page)
      this.showLogin = false
      this.$store.commit('USER')
    },
    async loadMore () {
      this.loading = true
      if (this.mails.count <= this.page * 10) {
        this.loading = false
        this.toogleSnackbar('没有更多邮件')
        return
      }
      this.page++
      var result = await this.getMails(this.page)
      this.loading = false
      if (result.state !== 1) return this.page--
    }
  },
  beforeRouteLeave (to, from, next) {
    this.position = {
      x: this.$refs.scroller.$el.scrollLeft,
      y: this.$refs.scroller.$el.scrollTop
    }
    next()
  }
}
</script>

<style lang="stylus">
.turn-to-send
  position fixed
  bottom 20px
  right 20px
</style>
