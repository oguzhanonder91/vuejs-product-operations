import Vue from 'vue';
import CoreUiVue from '@coreui/vue';
import App from './App.vue';
import router from './util/router';
import store from './store/store';
import { iconsSet as icons } from './assets/icons/icons.js'


Vue.use(CoreUiVue);

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
