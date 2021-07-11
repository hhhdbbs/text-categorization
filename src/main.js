import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Button from 'ant-design-vue/lib/button';
import 'ant-design-vue/dist/antd.css';
import echarts from 'echarts'
import axios from 'axios'
import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfont.js'
import './assets/css/all.css'
axios.defaults.withCredentials=true;

Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
require('echarts/extension/dataTool')

Vue.component(Button.name, Button);

// import elementResizeDetectorMaker from "element-resize-detector"
// import "./chart.resize.js"
// Vue.use(elementResizeDetectorMaker);
// Vue.prototype.$elementResizeDetectorMaker = elementResizeDetectorMaker;

// 引用 api 接口
import api from '@/api/api'
Vue.prototype.$api = api

//以下三行引入了element ui，以利用el-upload支持上传头像
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import { VueAxios } from './utils/http/request'
Vue.use(VueAxios)

//这里引入了一个mavonEditor库
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
