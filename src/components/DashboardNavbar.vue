<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">後台</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/admin/products" class="nav-link">產品列表</router-link>
          <router-link to="/admin/orders" class="nav-link">訂單列表</router-link>
          <a href="#" @click.prevent="logout" class="nav-link">登出</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout () {
      const url = `${process.env.VUE_APP_API}/logout`
      this.$http.post(url)
        .then(() => {
          this.$router.push('/login')
        })
    }
  }
}
</script>
