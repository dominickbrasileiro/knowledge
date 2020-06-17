import 'font-awesome/css/font-awesome.css';
import Vue from 'vue';

import './config/bootstrap';
import store from './config/store';
import router from './config/router';

import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount('#app');
