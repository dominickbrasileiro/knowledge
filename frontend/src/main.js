import 'font-awesome/css/font-awesome.css';
import Vue from 'vue';

import './config/bootstrap';
import './config/messages';
import store from './config/store';
import router from './config/router';

import App from './App.vue';

Vue.config.productionTip = false;

// Temp
require('axios').defaults.headers.common.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW4iOnRydWUsImlhdCI6MTU5MjU0NTk0MywiZXhwIjoxNTkyNTQ3NzQzfQ.Brwrvb1Xjpf6570RFmSl4X_zKhgkuwj52ZYks72ZQac';

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount('#app');
