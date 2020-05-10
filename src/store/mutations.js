
export const updateTradeResult = (state, trade) => {
  state.count = trade.count;
  state.sale = trade.sale;
  state.purchase=trade.purchase;
  state.balance = trade.balance;
};

export const setIsLogin = (state,val) => {
  state.isLogin = val;
};


