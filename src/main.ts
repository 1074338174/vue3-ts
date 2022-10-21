import { createApp } from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
import router from './router'
import { store } from './store'
import './styles/index.scss'
import App from './App.vue'
import SvgIcon from '@/components/svgIcon/index.vue'
import 'virtual:svg-icons-register'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import i18n from '@/i18n/index'


const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.component("Svg-icon",SvgIcon)

app.use(router).use(store).use(i18n).mount('#app')
