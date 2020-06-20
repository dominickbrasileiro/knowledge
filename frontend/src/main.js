import 'font-awesome/css/font-awesome.css';
import Vue from 'vue';

import './config/bootstrap';
import './config/messages';
import store from './config/store';
import router from './config/router';

import App from './App.vue';

Vue.config.productionTip = false;

// Temp
require('axios').defaults.headers.common.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW4iOnRydWUsImlhdCI6MTU5MjYyNjg3NywiZXhwIjoxNTkyNjI4Njc3fQ.Dx_p0JI3iKfd53jYtwRc4RtBwvjhWAEf6wB66TfKli0';

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount('#app');
