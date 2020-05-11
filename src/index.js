require('es6-promise').polyfill();
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from "moment";
window.moment = moment;
Vue.use(ElementUI);

// import "@/static/js/tinymce.min.js";
// import "@/static/js/plugins/print/plugin.min.js";

import App from './App';
import router from './router/router'


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})