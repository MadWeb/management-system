import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/reset.css';
import router from './router'
Vue.prototype.$http = axios;

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
