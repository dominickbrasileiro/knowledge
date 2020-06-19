/* eslint-disable import/prefer-default-export */
import Vue from 'vue';

export function showError(e) {
  if (e && e.response && e.response.data && e.response.data.message) {
    const msg = e.response.data.message || e.response.data;
    Vue.toasted.global.defaultError({ msg });
  } else if (typeof e === 'string') {
    Vue.toasted.global.defaultError({ msg: e });
  } else {
    Vue.toasted.global.defaultError();
  }
}
