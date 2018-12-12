// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import echarts from 'echarts'
import axios from 'axios'
import 'babel-polyfill'

Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
router.afterEach((to,from,next) => {
  if(to.meta.index==0&&!from.meta.index){
    window.scrollTo(0,0);
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
