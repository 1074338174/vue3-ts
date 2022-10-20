import { createApp } from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
import router from './router'
import { store } from './store'
import './styles/index.scss'
import App from './App.vue'
import SvgIcon from '@/components/svgIcon/index.vue'
import 'virtual:svg-icons-register';

const app = createApp(App);

app.component("Svg-icon",SvgIcon)

app.use(router).use(store).mount('#app')
