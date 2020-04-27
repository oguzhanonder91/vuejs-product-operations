import Vue from "vue";

export const setTradeResult = ({state, commit}, tradeResult) => {
  commit("updateTradeResult", tradeResult);
  let trade = {
    purchase: state.purchase,
    sale: state.sale
  };
  Vue.http.put("https://urunislemleri-ac043.firebaseio.com/tradeResult.json", trade)
    .then(response => {
    })
};

export const getTradeResult = ({commit}) => {
  Vue.http.get("https://urunislemleri-ac043.firebaseio.com/tradeResult.json")
    .then(response => {
      commit("updateTradeResult", response.data);
    })
};
