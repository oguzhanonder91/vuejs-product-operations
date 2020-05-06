import Vue from 'vue';
import VueResource from 'vue-resource';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App.vue';
import router from './util/router';
import store from './store/store';
import * as util from "./util/util";

Vue.use(VueResource);

Vue.http.options.root = "http://localhost:8081/";

Vue.http.interceptors.push((request, next) => {
  if (store.state.isLogin != null && store.state.isLogin && localStorage.getItem(util.token)) {
    request.headers.set('Authorization', 'Bearer ' + localStorage.getItem(util.token));
  }
})


Vue.filter("currency", (value) => {
  return parseFloat(value).toLocaleString(undefined, {minimumFractionDigits: 2}) + " TL"
});

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
});
