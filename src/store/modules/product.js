import Vue from 'vue';
import router from '../../util/router';
import * as util from "../../util/util";

const state = {
  products: [],

}

const getters = {
  getProductList(state) {
    return state.products;
  },

  // getterslara parametre gönderme
  getProduct: (state) => (id) => {
    return state.products.find(product => product.id === id);
  },
}

const mutations = {
  updateProductList(state, product) {
    state.products.push(product);
  },
  refreshProducts(state, inComing) {
    state.products = inComing;
  }
};

// Mutationslar senkron çalışır.
// Actionslar asenkron çalışıyor.

const actions = {
  initApp({commit}) {
    util.service.get("product/all")
      .then(response => {
        commit("refreshProducts", response.data);
      }).catch(error => {
      util.notify.control(commit, error)
    })
  },
  saveProduct({dispatch, commit}, product) {
    util.service.post("product/create",product)
      .then((response) => {
        commit("updateProductList", response.data);
        let tradeResult = {
          purchase: response.data.price,
          sale: 0,
          count: response.data.count
        };
        dispatch("setTradeResult", tradeResult);
        router.push("/");
      }).catch(error => {
      util.notify.control(commit, error)
    })
  },
  sellProduct({commit, dispatch}, product) {
    util.service.put("product/update",product)
      .then(response => {
        let tradeResult = {
          purchase: 0,
          sale: response.data.price,
          count: response.data.count
        };
        product.count = response.data.count;
        dispatch("setTradeResult", tradeResult);
        router.push("/");
      }).catch(error => {
      util.notify.control(commit, error)
    });
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
