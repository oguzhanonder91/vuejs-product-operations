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

// Mutationslar senkron çalışır. Mutations da state de değişiklik yapılır.
// Actionslar asenkron çalışıyor.

const actions = {
  getAllProduct({commit}) {
    util.service.get("product/all")
      .then(response => {
        if (response) {
          commit("refreshProducts", response.data);
        }
        util.common.control(response);
      }).catch(error => {
      util.common.control(error)
    })
  },
  saveProduct({dispatch, commit}, product) {
    util.service.post("product/create", product)
      .then((response) => {
        if (response) {
          commit("updateProductList", response.data);
          let tradeResult = {
            purchase: response.data.price,
            sale: 0,
            count: response.data.total
          };
          dispatch("setTradeResult", tradeResult);
        }
        let toast = util.common.successToast("İşlem Başarılı Şekilde Gerçekleşti...");
        util.common.control(response, toast);

      }).catch(error => {
      util.common.control(error)
    })
  },
  sellProduct({commit, dispatch}, product) {
    let sellCount = product.sellCount;
    util.service.put("product/sell", product)
      .then(response => {
        if (response) {
          let tradeResult = {
            purchase: 0,
            sale: response.data.sellPrice,
            count: sellCount
          };
          product.remaining = response.data.remaining;
          product.sellCount = response.data.sellCount;
          product.sellPrice = response.data.sellPrice;
          product.profit = response.data.profit;
          dispatch("setTradeResult", tradeResult);
          util.common.routePush("");
        }

      }).catch(error => {
      util.common.control(error)
    });
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
