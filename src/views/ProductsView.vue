<template>
  <div class="products">
    <div class="page-title">產品列表</div>
    <div class="row">
      <div v-for="product in products" class="col-6 col-lg-3 mb-3" :key="product.id">
        <div class="product-item card">
          <div class="card-img">
            <span class="img">
              <img :src="product.imageUrl" class="card-img-top">
            </span>
          </div>
          <div class="pt-3">
            <h5 class="card-title mb-2">{{ product.title }}</h5>
            <div v-if="product.price === product.origin_price" class="card-text mb-3">
              <div class="fw-bold"><small>售價 $</small> {{ product.origin_price }}</div>
            </div>
            <div v-else class="card-text mb-3 d-flex">
              <div class="text-danger fw-bold me-2"><small>特價 $</small> {{ product.price }}</div>
              <div class="text-decoration-line-through fw-bold text-black-50"><small>售價 $</small> {{ product.origin_price }}</div>
            </div>
            <div class="row">
              <div class="col-8">
                <router-link :to="`/product/${product.id}`" custom v-slot="{ navigate }">
                  <button @click="navigate" role="link" class="btn btn-dark w-100" type="button">詳細資料</button>
                </router-link>
              </div>
              <div class="col-4">
                <button class="btn btn-danger w-100" type="button"
                @click="addToCart(product.id)"
                :disabled="isLoading === product.id">
                  <div class="spinner-border spinner-border-sm" role="status"
                  v-if="isLoading === product.id">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <div v-else>
                    <i class="bi bi-cart-plus"></i>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products: [],
      isLoading: ''
    }
  },
  methods: {
    getProducts () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.products
        })
    },
    addToCart (id, qty = 1) {
      const data = {
        product_id: id,
        qty
      }
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = id
      this.$http.post(url, { data })
        .then(res => {
          alert(res.data.message)
          this.isLoading = '' // 清空
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
