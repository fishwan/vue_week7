<template>
  <div
    class="modal fade"
    id="deleteProductModal"
    tabindex="-1"
    aria-labelledby="deleteProductModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="deleteProductModalLabel">刪除{{ item.title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          確認刪除<span class="fw-bold text-danger">{{ item.title }}</span>嗎（刪除後無法恢復）？
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" @click="$emit('del-item')">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: ['item'],
  emits: ['del-item'],
  data () {
    return {
      deleteModal: ''
    }
  },
  methods: {
    openDelModal () {
      this.deleteModal.show()
    },
    closeDelModal () {
      this.deleteModal.hide()
    }
  },
  mounted () {
    this.deleteModal = new Modal(this.$refs.modal)
  }
}
</script>
