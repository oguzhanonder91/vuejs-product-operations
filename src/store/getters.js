export const getTradeResult = (state) => {
  return {
    purchase: state.purchase,
    sale: state.sale,
    balance: state.balance
  }
};

export const getIsLogin = (state) => {
  return state.isLogin;
};

export const getIsLoading = (state) => {
  return state.isLoading;
};

export const getMyToast = (state) => {
  return state.myToast;
};

export const getUser = (state) => {
  return state.user;
};

export const getShowMenus = (state) => {
  return state.showMenus;
};
export const getShowPermissionMenus = (state) => {
  return state.permissionMenuCodes;
}
