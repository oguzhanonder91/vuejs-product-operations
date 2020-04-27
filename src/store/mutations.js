export const updateTradeResult = (state, trade) => {
  if(trade.count){
    state.purchase += parseFloat(trade.purchase) * parseInt(trade.count);
    state.sale += parseFloat(trade.sale) * parseInt(trade.count);
  }else{
    state.purchase += parseFloat(trade.purchase);
    state.sale += parseFloat(trade.sale) ;
  }
  state.balance = parseFloat(state.sale) - parseFloat(state.purchase);
};

