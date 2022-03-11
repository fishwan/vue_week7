<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <!-- 上一頁 -->
      <li class="page-item" :class="{ disabled: !pages.has_pre }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="$emit('get-data', pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <!-- 頁碼 -->
      <li
        class="page-item"
        :class="{ active: page === pages.current_page }"
        v-for="page in pages.total_pages"
        :key="page + '123'"
      >
        <a class="page-link" href="#" @click.prevent="$emit('get-data', page)">{{ page }}</a>
      </li>
      <!-- 下一頁 -->
      <li class="page-item" :class="{ disabled: !pages.has_next }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="$emit('get-data', pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages']
}
</script>
