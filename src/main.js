import Vue from 'vue'
import App from './App'

import router from './router/routes'

import {i18n} from './translations/vue-i18n';

import {store} from './store/store.js'

//Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  store,
  router,
  i18n,
  render: h => h(App)
})
