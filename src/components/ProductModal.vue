<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    ref="modal"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="productModalLabel">
            <div v-if="isNew">新增產品</div>
            <div v-else>編輯產品</div>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <!-- 圖片區 -->
            <div class="col-md-4">
                <div class="mb-3">
                  <h4>主要圖片</h4>
                  <!-- 輸入網址 -->
                  <label for="productAlbumImg" class="form-label">輸入網址</label>
                  <input type="text" class="form-control mb-3" id="productAlbumImg" v-model="tempProduct.imageUrl" placeholder="輸入圖片網址">
                  <!-- 上傳圖片 -->
                  <label for="uploadProductImg" class="form-label">上傳圖片</label>
                  <div class="mb-3">
                    <input type="file" name="file-to-upload" id="uploadProductImg" class="form-control"
                    @change="uploadImages"
                    ref="fileInput">
                  </div>
                  <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
                </div>
                <h4>多圖新增</h4>
                <div v-if="Array.isArray(tempProduct.imagesUrl)">
                  <div v-for="(imgUrl , key) in tempProduct.imagesUrl" :key="key + '12345'">
                    <input type="text" class="form-control mb-3" v-model="tempProduct.imagesUrl[key]" placeholder="輸入圖片網址">
                    <img class="mb-3 img-fluid" :src="tempProduct.imagesUrl[key]" alt="">
                  </div>
                  <div class="d-grid gap-2">
                    <button v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]"
                    type="button" class="btn btn-outline-primary btn-sm" @click="tempProduct.imagesUrl.push('')">新增圖片</button>
                    <button v-else type="button" class="btn btn-outline-danger btn-sm" @click="tempProduct.imagesUrl.pop()">刪除圖片</button>
                  </div>
                </div>
                <div v-else>
                  <div class="d-grid">
                    <button type="button" class="btn btn-outline-primary btn-sm"
                    @click="createImages">新增圖片</button>
                  </div>
                </div>
            </div>
            <!-- 右邊資料區 -->
            <div class="col-md-8">
              <div class="mb-3">
                <label for="productTitle" class="form-label">標題</label>
                <input type="text" v-model="tempProduct.title" class="form-control" name="productTitle" id="productTitle" placeholder="標題">
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="productCategory" class="form-label">分類</label>
                  <input type="text" v-model="tempProduct.category" class="form-control" name="productCategory" id="productCategory" placeholder="分類">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="productUnit" class="form-label">單位</label>
                  <input type="text" v-model="tempProduct.unit" class="form-control" name="productUnit" id="productUnit" placeholder="單位">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="productOriginPrice" class="form-label">原價</label>
                  <input type="number" v-model.number="tempProduct.origin_price" class="form-control" name="productOriginPrice" id="productOriginPrice" placeholder="原價">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="productPrice" class="form-label">售價</label>
                  <input type="number" v-model.number="tempProduct.price" class="form-control" name="productPrice" id="productPrice" placeholder="售價">
                </div>
              </div>
              <hr>
              <div class="mb-3">
                <label for="productDescription" class="form-label">產品描述</label>
                <textarea class="form-control" v-model="tempProduct.description" name="productDescription" id="productDescription" placeholder="請輸入產品描述"></textarea>
              </div>
              <div class="mb-3">
                <label for="productContent" class="form-label">說明內容</label>
                <textarea class="form-control" v-model="tempProduct.content" name="productContent" id="productContent" placeholder="請輸入說明內容"></textarea>
              </div>
              <div class="form-check">
                <input class="form-check-input" v-model="tempProduct.is_enabled" :true-value="true" :false-value="false" type="checkbox" id="productIsEnabled" >
                <label class="form-check-label" for="productIsEnabled">
                是否啟用
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-dark" @click="$emit('update-product', tempProduct)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: ['product', 'isNew'],
  emits: ['update-product'],
  watch: {
    product () {
      this.tempProduct = this.product
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = []
      }
      if (!this.tempProduct.imageUrl) {
        this.tempProduct.imageUrl = ''
      }
    }
  },
  data () {
    return {
      productModal: '',
      tempProduct: {}
    }
  },
  methods: {
    openProductModal () {
      this.productModal.show()
    },
    closeProductModal () {
      this.productModal.hide()
    },
    createImages () {
      this.tempProduct.imagesUrl = []
      this.tempProduct.imagesUrl.push('')
    },
    uploadImages () {
      const file = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', file)
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`
      this.$http.post(url, formData, {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          if (res.data.success) {
            this.tempProduct.imageUrl = res.data.imageUrl
            this.$refs.fileInput.value = ''
            this.$messageState(res, '上傳圖片')
          } else {
            this.$refs.fileInput.value = ''
            this.$messageState(res, '上傳圖片')
          }
        }).catch((err) => {
          this.$messageState(err.response, '上傳圖片')
        })
    }
  },
  mounted () {
    this.productModal = new Modal(this.$refs.modal)
  }
}
</script>
