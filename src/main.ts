import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'

import App from './App.vue'
import router from '@/router'
import { AlertPlugin } from '@/plugins/alert'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(Vue3Toastify, {
  autoClose: 3000,
  clearOnUrlChange: false,
  containerId: 'toast-container'
} as ToastContainerOptions)
app.use(AlertPlugin)

app.mount('#app')
