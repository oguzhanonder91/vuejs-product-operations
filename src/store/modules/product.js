import Vue from 'vue';
import router from '../../util/router';

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
    let products = [];
    for (let key in inComing) {
      let obj = {};
      obj.id = key;
      obj.title = inComing[key].title;
      obj.price = inComing[key].price;
      obj.count = inComing[key].count;
      obj.description = inComing[key].description;
      products.push(obj);
    }
    state.products = products;
  }
};

// Mutationslar senkron çalışır.
// Actionslar asenkron çalışıyor.

const actions = {
  initApp({commit}) {
    Vue.http.get("https://urunislemleri-ac043.firebaseio.com/products.json")
      .then(response => {
        commit("refreshProducts", response.data);
      })
  },
  saveProduct({dispatch, commit}, product) {
    Vue.http.post("https://urunislemleri-ac043.firebaseio.com/products.json", product)
      .then((response) => {
        product.id = response.data.name;
        commit("updateProductList", product);
        let tradeResult = {
          purchase: product.price,
          sale: 0,
          count: product.count
        };
        dispatch("setTradeResult", tradeResult);
        router.push("/");
      })
  },
  sellProduct({commit, dispatch}, product) {
    let count = product.sellCount;
    delete product.sellCount;
    Vue.http.put("https://urunislemleri-ac043.firebaseio.com/products/" + product.id + ".json", product)
      .then(response => {
        let tradeResult = {
          purchase: 0,
          sale: product.price,
          count: count
        };
        dispatch("setTradeResult", tradeResult);
        router.push("/");
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
