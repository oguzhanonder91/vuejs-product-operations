import Vue from 'vue';
import VueResource from 'vue-resource';
import CoreUiVue from '@coreui/vue';
import App from './App.vue';
import router from './util/router';
import store from './store/store';
import * as util from "./util/util";
import { iconsSet as icons } from './assets/icons/icons.js'


Vue.use(VueResource);
Vue.use(CoreUiVue);

Vue.http.options.root = "http://localhost:8081/";
Vue.http.interceptors.push((request, next) => {
  if (store.state.isLogin != null && store.state.isLogin && util.common.getToken()) {
    request.headers.set('Authorization', 'Bearer ' + util.common.getToken());
  }
})


Vue.filter("currency", (value) => {
  return parseFloat(value).toLocaleString(undefined, {minimumFractionDigits: 2}) + " TL"
});

new Vue({
  el: '#app',
  router: router,
  store: store,
  icons : icons,
  render: h => h(App)
});
