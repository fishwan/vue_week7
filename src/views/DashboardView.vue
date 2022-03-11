<template>
  <div>
    <Navbar />
    <ToastMessages></ToastMessages>
    <main class="container-fluid">
      <router-view v-if="checkSuccess" />
    </main>
  </div>
</template>

<script>
import emitter from '@/methods/eventBus'
import Navbar from '@/components/DashboardNavbar.vue'
import ToastMessages from '@/components/ToastMessages.vue'

export default {
  components: { Navbar, ToastMessages },
  data () {
    return {
      checkSuccess: false
    }
  },
  provide () {
    return {
      emitter
    }
  },
  methods: {
    checkLogin () {
      const url = `${process.env.VUE_APP_API}/api/user/check`
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = `${token}`
      this.$http.post(url)
        .then((res) => {
          this.$messageState(res, '登入')
          this.checkSuccess = true
        }).catch((err) => {
          this.$router.push('/login')
          this.$messageState(err.response, '錯誤訊息')
        })
    }
  },
  created () {
    this.checkLogin()
  }
}
</script>
