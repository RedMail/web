<template lang="pug">
#detail
  mu-appbar.appbar(title="详情")
    mu-icon-button(icon='arrow_back', slot="left", @click="$router.back()")
  mu-content-block.content
    h2.mail-title {{mail.subject}}
    .mail-created_time
      span 发送时间：
      span {{$moment(mail.created_at).format('YYYY-MM-DD HH:mm:ss')}}
    .mail-from
      span 发件人：
      span {{mail.from}}
      span {{mail.fromname}}
    .mail-to
      span 收件人：
      span {{mail.to}}
      span {{mail.toname}}
    mu-sub-header 邮件内容：
    .mail-content(v-html="mail.html || '无'")
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  mounted () {
    var mail = this.mails.list[this.$route.params.index - 1]
    mail ? this.mail = mail : this.$router.replace('/')
  },
  data () {
    return {
      mail: {}
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
      'mails'
    ])
  }
}
</script>

<style lang="stylus">
.mail-title
  position relative
</style>
