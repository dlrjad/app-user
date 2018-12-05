import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import router from './router/routes'
import {i18n} from './translations/vue-i18n';
import {store} from './store/store.js'

Vue.use(BootstrapVue);

//Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  store,
  router,
  i18n,
  render: h => h(App)
})
