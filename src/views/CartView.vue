<template>
  <section>
    <div class="row justify-content-between">
      <div class="col-lg-7">
        <div>
          <div class="float-end">
            <button class="btn btn-dark" type="button"
            @click="deleteAllCarts" :disabled="cartData.carts.length === 0">清空購物車</button>
          </div>
          <div class="page-title">購物車</div>
        </div>
        <!-- 購物車 -->
        <div class="cart">
          <div class="cart-item-title text-center d-flex">
            <div class="cart-item-img">購買商品</div>
            <div class="cart-item-body row">
              <div class="col-4 cart-item-name"></div>
              <div class="col-2 cart-item-sale">單價</div>
              <div class="col-2 cart-item-qua">數量</div>
              <div class="col-2 cart-item-sale">小計</div>
              <div class="col-2 cart-item-delete"></div>
            </div>
          </div>
          <div v-if="cartData.total === 0" class="cart-item cart-item--none">
            <div class="fw-bold text-center">購物車目前尚無商品</div>
          </div>
          <div v-else>
            <div v-for="cartItem in cartData.carts" class="cart-item d-flex align-items-center" :key="cartItem.id">
              <div class="cart-item-img">
                <span class="img">
                  <img class="img-fluid" :src="cartItem.product.imageUrl" alt="">
                </span>
              </div>
              <div class="cart-item-body row align-items-center">
                <div class="col-12 col-lg-4 cart-item-name">
                  {{ cartItem.product.title }}
                </div>
                <div class="col-12 col-lg-2 cart-item-sale">$ {{ cartItem.product.price }}</div>
                <div class="col-12 col-lg-2 cart-item-qua">
                  <select class="form-select" name="cartItemQty" id="cartItemQty"
                  v-model="cartItem.qty" @change="updateCartItem(cartItem)"
                  :disabled="isLoading === cartItem.id">
                    <option v-for="num in 10" :value="num"
                    :key="`${num}-${cartItem.id}`">
                        {{ num }}
                    </option>
                </select>
                </div>
                <div class="col-12 col-lg-2 cart-item-subtotal fw-bold">$ {{ cartItem.total}}</div>
                <div class="col-1 col-lg-2 cart-item-delete">
                  <!-- 刪除商品按鈕 -->
                  <button class="btn btn-link text-dark fs-4" type="submit"
                  @click="deleteCartItem(cartItem.id)"
                  :disabled="isLoading === cartItem.id"
                  >
                    <div class="spinner-border spinner-border-sm" role="status"
                    v-if="isLoading === cartItem.id">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <div v-else>
                      <i class="bi bi-x"></i>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="cart-sale text-end">
            結帳金額&nbsp;
            <b class="is-warning"><small>$</small>&nbsp;{{ cartData.total }}</b>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="page-title">訂購資訊</div>
        <!-- 訂購表單 -->
        <v-form ref="form" v-slot="{ errors }" @submit="sendOrder">
          <div class="mb-3">
            <label for="Email" class="form-label">Email</label>
            <v-field name="email" type="email" class="form-control" id="Email"
            :class="{ 'is-invalid': errors['email'] }"
            v-model="form.user.email" rules="email|required"></v-field>
            <error-message class="invalid-feedback" name="email"></error-message>
          </div>
          <div class="mb-3">
            <label for="Name" class="form-label">收件者姓名</label>
            <v-field name="姓名" type="text" class="form-control" id="Name"
            :class="{ 'is-invalid': errors['姓名'] }"
            v-model="form.user.name" rules="required"></v-field>
            <error-message class="invalid-feedback" name="姓名"></error-message>
          </div>
          <div class="mb-3">
            <label for="Tel" class="form-label">收件者電話</label>
            <v-field name="電話" type="tel" class="form-control" id="Tel"
            :class="{ 'is-invalid': errors['電話'] }" v-model="form.user.tel"
            rules="required|min:8"></v-field>
            <error-message class="invalid-feedback" name="電話"></error-message>
          </div>
          <div class="mb-3">
            <label for="Address" class="form-label">收件者地址</label>
            <v-field name="地址" type="text" class="form-control" id="Address"
            :class="{ 'is-invalid': errors['地址'] }"
            v-model="form.user.address" rules="required"></v-field>
            <error-message class="invalid-feedback" name="地址"></error-message>
          </div>
          <div class="mb-3">
            <label for="Content" class="form-label">備註</label>
            <textarea class="form-control" id="Content" rows="3" v-model="form.message"></textarea>
          </div>
          <button type="submit" class="btn btn-dark w-100"
          :disabled="Object.keys(errors).length > 0 || cartData.carts.length === 0">
            送出訂購
          </button>
        </v-form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      cartData: {
        carts: []
      },
      isLoading: ''
    }
  },
  methods: {
    getCart () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url)
        .then((res) => {
          this.cartData = res.data.data
        })
    },
    deleteAllCarts () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`
      this.$http.delete(url)
        .then(res => {
          alert(res.data.message)
          this.getCart()
        })
    },
    deleteCartItem (id) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = id
      this.$http.delete(url)
        .then(res => {
          alert(res.data.message)
          this.getCart()
          this.isLoading = '' // 清空
        })
    },
    updateCartItem (item) {
      const data = {
        product_id: item.id,
        qty: item.qty
      }
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.isLoading = item.id
      this.$http.put(url, { data })
        .then(res => {
          this.getCart()
          this.isLoading = '' // 清空
        })
    },
    sendOrder () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.$http.post(url, { data: order })
        .then(res => {
          alert(res.data.message)
          this.$refs.form.resetForm()
          this.getCart()
        }).catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>
