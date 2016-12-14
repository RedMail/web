<template lang="pug">
#send
  mu-appbar.appbar(title="发送邮件")
    mu-icon-button(icon='arrow_back', slot="left", @click="$router.back()")
  mu-content-block.content
    mu-text-field(v-model="mailForm.to", label="收件人", :labelFloat="true", hintText="输入收件人", icon="person", :fullWidth="true")
    mu-text-field(v-model="mailForm.subject", label="标题", :labelFloat="true", hintText="输入标题", icon="title", :fullWidth="true")
    mu-text-field(v-model="mailForm.html", label="内容", :labelFloat="true", hintText="输入邮件内容", icon="mail", :fullWidth="true", :multiLine="true", :rows="3")
    mu-float-button.send-button(icon="send", secondary, @click="sendMail")
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      mailForm: {
        to: '',
        subject: '',
        html: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'toogleSnackbar'
    ]),
    sendMail () {
      this.$http
        .post('http://redmail.site/send', {
          to: this.mailForm.to,
          subject: this.mailForm.subject,
          html: this.mailForm.html
        })
        .then((data) => {
          this.toogleSnackbar('发送成功')
          this.mailForm = {}
        }, (err) => {
          this.toogleSnackbar('发送失败，请稍后再试')
          console.log(err)
        })
    }
  }
}
</script>

<style lang="stylus">
.send-button
  position fixed
  bottom 20px
  right 20px
</style>
