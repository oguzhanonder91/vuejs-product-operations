export const updateTradeResult = (state, trade) => {
  state.count = trade.count;
  state.sale = trade.sale;
  state.purchase = trade.purchase;
  state.balance = trade.balance;
};

export const setIsLogin = (state, val) => {
  state.isLogin = val;
};

export const toggleSidebarDesktop = (state) => {
  const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow);
  state.sidebarShow = sidebarOpened ? false : 'responsive'
};

export const toggleSidebarMobile = (state) => {
  const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow);
  state.sidebarShow = sidebarClosed ? true : 'responsive'
};

export const set = (state, [variable, value]) => {
  state[variable] = value
};

