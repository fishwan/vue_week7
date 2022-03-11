<template>
  <div
    class="modal fade"
    id="orderModal"
    tabindex="-1"
    aria-labelledby="orderModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="orderModalLabel">訂單</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <h3>用戶資料</h3>
              <ul v-if="tempOrder.user" class="list-group list-group-flush">
                <li class="list-group-item">姓名：{{ tempOrder.user.name }}</li>
                <li class="list-group-item">Email：{{ tempOrder.user.email }}</li>
                <li class="list-group-item">電話：{{ tempOrder.user.tel }}</li>
                <li class="list-group-item">地址：{{ tempOrder.user.address }}</li>
              </ul>
            </div>
            <div class="col-md-8">
              <h3>訂單細節</h3>
              <ul class="list-group list-group-flush mb-3">
                <li class="list-group-item">訂單編號：{{ tempOrder.id }}</li>
                <li class="list-group-item">下單時間：{{ $filters.date(tempOrder.create_at) }}</li>
                <li class="list-group-item">
                  付款時間：
                  <span v-if="tempOrder.paid_date">{{ tempOrder.paid_date }}</span>
                  <span v-else>--</span>
                </li>
                <li class="list-group-item">
                  付款狀態：
                  <span
                    :class="{
                      'text-success': tempOrder.is_paid,
                      'text-danger': !tempOrder.is_paid,
                    }"
                  >{{ tempOrder.is_paid ? "已付款" : "未付款" }}</span>
                </li>
                <li class="list-group-item">總金額：{{ tempOrder.total }} 元</li>
              </ul>
              <h3>選購商品</h3>
              <table class="table">
                <thead>
                  <th>產品名稱</th>
                  <th>產品數量</th>
                  <th>購買價格</th>
                </thead>
                <tbody>
                  <tr
                    v-for="tempOrderProdct in tempOrder.products"
                    :key="tempOrderProdct.product.id"
                  >
                    <td>{{ tempOrderProdct.product.title }}</td>
                    <td>{{ tempOrderProdct.qty }}/{{ tempOrderProdct.product.unit }}</td>
                    <td>{{ tempOrderProdct.final_total }} 元</td>
                  </tr>
                </tbody>
              </table>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"
                  v-model="tempOrder.is_paid"
                >
                <label class="form-check-label" for="defaultCheck1">
                  <span v-if="tempOrder.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-dark" @click="$emit('update-order', tempOrder)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: ['order'],
  data () {
    return {
      orderModal: '',
      tempOrder: {},
      isPaid: false
    }
  },
  watch: {
    order () {
      this.tempOrder = this.order
    }
  },
  methods: {
    openOrderModal () {
      this.orderModal.show()
    },
    closeOrderModal () {
      this.orderModal.hide()
    }
  },
  mounted () {
    this.orderModal = new Modal(this.$refs.modal)
  }
}
</script>
