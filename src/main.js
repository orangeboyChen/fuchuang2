import '@babel/polyfill'
import 'mutationobserver-shim'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

import * as echarts from 'echarts'


import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/common.css'


const app = createApp(App)
installElementPlus(app)

axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });

axios.defaults.baseURL = 'http://api.fuchuang2.nowcent.cn'
app.config.globalProperties.$axios = axios

const app2 = app.use(store).use(router).use(VueAxios, axios).mount('#app')
app2.echarts = echarts


