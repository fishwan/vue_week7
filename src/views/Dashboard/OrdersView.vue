<template>
  <div>
    <VLoading :active="isLoading" :z-index="1060"></VLoading>
    <div class="d-grid gap-2 d-md-flex justify-content-between mb-4">
      <h1>訂單列表</h1>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">購買時間</th>
          <th scope="col">Email</th>
          <th scope="col">購買款項</th>
          <th scope="col">應付金額</th>
          <th scope="col">是否付款</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ $filters.date(order.create_at) }}</td>
          <td>
            {{ order.user.email }}
          </td>
          <td>
            <div v-for="product in order.products" :key="product.product.id">
              {{ product.product.title }}
              <span class="fw-bold">{{ product.qty }}</span>
              {{ product.product.unit }}
            </div>
          </td>
          <td>
            {{ order.total }} 元
          </td>
          <td>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch"
              v-model="order.is_paid"
              :id="`SwitchPaid${order.id}`"
              @change="updateOrder(order)" />
              <label class="form-check-label" :for="`SwitchPaid${order.id}`">
                <span>{{ order.is_paid ? "已付款" : "未付款" }}</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-sm" role="group" aria-label="Basic outlined example">
              <button
                type="button"
                class="btn btn-dark"
                @click="openModal(order)"
              >檢視</button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="openDelModal(order)"
              >刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationModule :pages="pagination" @get-data="getData"></PaginationModule>
    <!-- 訂單 MODAL -->
    <OrderModal ref="orderModal"
    :order="tempOrder"
    @update-order="updateOrder">
    </OrderModal>
    <!-- 刪除 MODAL -->
    <DelModal ref="deleteModal"
    :item="tempOrder"
    @del-item="deleteOrder">
    </DelModal>
  </div>
</template>

<script>
import PaginationModule from '@/components/PaginationModule.vue'
import OrderModal from '@/components/OrderModal.vue'
import DelModal from '@/components/DelModal.vue'

export default {
  components: { OrderModal, PaginationModule, DelModal },
  data () {
    return {
      orders: {},
      tempOrder: {},
      pagination: {},
      isLoading: false,
      currentPage: 1
    }
  },
  methods: {
    getData (page = 1) {
      this.currentPage = page
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders/?page=${page}`
      this.isLoading = true
      this.$http.get(url)
        .then((res) => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
          this.isLoading = false
        })
    },
    openModal (item) {
      this.tempOrder = { ...item }
      this.$refs.orderModal.openOrderModal()
    },
    updateOrder (item) {
      this.tempOrder = item
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
      const paidState = {
        is_paid: item.is_paid
      }
      this.$http.put(url, { data: paidState })
        .then((res) => {
          this.$messageState(res, '更新付款狀態')
          this.$refs.orderModal.closeOrderModal()
          this.getData(this.currentPage)
        }).catch((err) => {
          this.isLoading = false
          this.$messageState(err.response, '更新付款狀態')
        })
    },
    deleteOrder () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
      this.$http.delete(url)
        .then((res) => {
          this.$messageState(res, '刪除')
          this.$refs.deleteModal.closeDelModal()
          this.getData(this.currentPage)
        }).catch((err) => {
          this.$messageState(err.response, '刪除')
        })
    },
    openDelModal (item) {
      this.tempOrder = { ...item }
      this.$refs.deleteModal.openDelModal()
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
