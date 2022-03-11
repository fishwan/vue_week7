<template>
  <div>
    <VLoading :active="isLoading" :z-index="1060"></VLoading>
    <div class="d-grid gap-2 d-md-flex justify-content-between mb-4">
      <h1>產品列表</h1>
      <button type="button" class="btn btn-dark" @click="openModal(true)">建立新產品</button>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">產品</th>
          <th scope="col" width="100">原價</th>
          <th scope="col" width="100">售價</th>
          <th scope="col" width="100">狀態</th>
          <th scope="col" width="120"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="itemProduct in products" :key="itemProduct.id">
          <td>{{ itemProduct.title }}</td>
          <td>{{ itemProduct.origin_price }}</td>
          <td>{{ itemProduct.price }}</td>
          <td>
            <span
              :class="{
                'text-success': itemProduct.is_enabled,
                'text-danger': !itemProduct.is_enabled,
              }"
            >{{ itemProduct.is_enabled ? "啟用" : "未啟用" }}</span>
          </td>
          <td>
            <div class="btn-group btn-group-sm" role="group" aria-label="Basic outlined example">
              <button
                type="button"
                class="btn btn-dark"
                @click="openModal(false, itemProduct)"
              >編輯</button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="openDelModal(itemProduct)"
              >刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationModule :pages="pagination" @get-data="getData"></PaginationModule>
    <!-- 產品MODAL -->
    <ProductModal
    ref="productModal"
    :product="tempProduct" :isNew="isNew"
    @update-product="updateProduct">
    </ProductModal>
    <!-- 刪除產品MODAL -->
    <DelModal ref="deleteModal"
    :item="tempProduct"
    @del-item="deleteProduct">
    </DelModal>
  </div>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue'
import DelModal from '@/components/DelModal.vue'
import PaginationModule from '@/components/PaginationModule.vue'

export default {
  components: { ProductModal, PaginationModule, DelModal },
  data () {
    return {
      products: {},
      tempProduct: {},
      pagination: {},
      status: {},
      isNew: false,
      isLoading: false,
      currentPage: 1
    }
  },
  methods: {
    getData (page = 1) {
      this.currentPage = page
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      this.isLoading = true
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.isLoading = false
        })
    },
    updateProduct (product) {
      this.tempProduct = product
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`
      let method = 'post'
      let status = '新增產品'
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
        method = 'put'
        status = '修改產品'
      }
      this.$http[method](url, { data: this.tempProduct })
        .then((res) => {
          this.$messageState(res, status)
          this.$refs.productModal.closeProductModal()
          this.getData(this.currentPage)
        }).catch((err) => {
          this.$messageState(err.response, status)
        })
    },
    deleteProduct () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.$http.delete(url)
        .then((res) => {
          this.$messageState(res, '刪除')
          this.$refs.deleteModal.closeDelModal()
          this.getData(this.currentPage)
        }).catch((err) => {
          this.$messageState(err.response, '刪除')
        })
    },
    openModal (isNew, product) {
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = { ...product }
        this.isNew = false
      }
      this.$refs.productModal.openProductModal()
    },
    openDelModal (product) {
      this.tempProduct = { ...product }
      this.$refs.deleteModal.openDelModal()
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
