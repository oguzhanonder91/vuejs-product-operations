import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App.vue';
import router from './util/router';
import store from './store/store';

Vue.use(VueResource);

Vue.filter("currency" , (value) =>{
  return parseFloat(value).toLocaleString(undefined, {minimumFractionDigits:2}) + " TL"
});

new Vue({
  el: '#app',
  router:router,
  store:store,
  render: h => h(App)
});
