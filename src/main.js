import { createApp } from 'vue'
import App from './App.vue'
import axios from './utils/request'
import router from './router/index'
import ElementPlus from 'element-plus'
import TDesign from 'tdesign-vue-next'
import { createPinia }from 'pinia';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(TDesign)
app.use(createPinia())
app.mount('#app')
app.component('QuillEditor', QuillEditor)
app.config.globalProperties.$axios = axios