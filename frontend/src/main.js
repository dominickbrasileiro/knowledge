import 'font-awesome/css/font-awesome.css';
import Vue from 'vue';

import './config/bootstrap';
import store from './config/store';
import router from './config/router';

import App from './App.vue';

Vue.config.productionTip = false;

// Temp
require('axios').defaults.headers.common.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW4iOmZhbHNlLCJpYXQiOjE1OTI0MjUxNjksImV4cCI6MTU5MjQyNjk2OX0.ig85ifpIPyxIkmAKU36mLtDAmFdzHMJuyl4AYkNZiJo';

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount('#app');
