export const getTradeResult = (state) => {
 return {
   purchase: state.purchase,
   sale : state.sale,
   balance : state.balance
 }
};

export const getIsLogin = (state) =>{
  return state.isLogin;
}
