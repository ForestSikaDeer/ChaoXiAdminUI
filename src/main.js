import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets



import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// main.js
import * as echarts from "echarts"
Vue.prototype.$echarts = echarts
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
