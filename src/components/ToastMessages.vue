<template>
  <div class="toast-container position-fixed bottom-0 end-0" style="z-index: 1500">
    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true"
      v-for="(msg, key) in messages" :key="key">
      <div class="toast-header">
        <span
          :class="`bg-${msg.style}`"
          class="p-2 rounded me-2 d-inline-block"
        ></span>
        <strong class="me-auto">{{ msg.title }}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"
        @click="toastClose"></button>
      </div>
      <div v-if="msg.content" class="toast-body">
        {{ msg.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      messages: []
    }
  },
  inject: ['emitter'],
  methods: {
    toastShow () {
      setTimeout(() => {
        this.messages.shift()
      }, 5000)
    },
    toastClose (index) {
      this.messages.splice(index, 1)
    }
  },
  mounted () {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message
      this.messages.push({ style, title, content })
      this.toastShow()
    })
  }
}
</script>
