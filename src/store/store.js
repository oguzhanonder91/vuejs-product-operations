import Vue from 'vue';
import Vuex from 'vuex';
import product from './modules/product';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

 const store = new Vuex.Store({
  state: {
    purchase: 0.0,
    sale: 0.0,
    balance: 0.0,
    isLogin : null,
    user : null
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: {
    product
  }
});

 export default store;

