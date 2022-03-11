import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min, max } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import { date } from '@/methods/filters'
import $messageState from '@/methods/messageState'

import App from './App.vue'
import router from './router'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)

configure({
  generateMessage: localize({ zhTW: zhTW })
})
setLocale('zhTW')

const app = createApp(App)
app.config.globalProperties.$filters = { date }
// 將 $messageState 加入全域下，這樣在其他地方就能直接使用
app.config.globalProperties.$messageState = $messageState
app.use(router)
app.use(VueAxios, axios)

app.component('VLoading', Loading)
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)

app.mount('#app')
