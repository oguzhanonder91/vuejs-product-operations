import * as util from '../util/util'

export const setTradeResult = ({state, commit}, tradeResult) => {
  util.service.post("trade/create", tradeResult)
    .then(response => {
      if (response) {
        commit("updateTradeResult", response.data);
      }
    });
};

export const getTradeResult = ({commit}) => {
  util.service.get("trade/result")
    .then(response => {
      if (response) {
        commit("updateTradeResult", response.data);
      }
    }).catch(error => {
    util.notify.control(commit, error)
  })
};


export const login = (vueContext, loginData) => {
  let password = loginData.password;
  let username = loginData.username;
  let rndUser = Math.random().toString(36).substr(2, 6);
  let rndPass = Math.random().toString(36).substr(2, 6);
  loginData.password = btoa(btoa(password + util.rndData + rndPass));
  loginData.username = btoa(btoa(username + util.rndData + rndUser));

  return util.service.post("auth/login", loginData)
    .then(response => {
      if (response) {
        vueContext.commit("setIsLogin", true);
        localStorage.setItem(util.token, response.data.token);
        return response;
      }
    }).catch(error => {
      loginData.password = null;
      loginData.username = null;
    });
};

export const logout = (vueContext) => {
  return util.service.post("auth/logout")
    .then(res => {
      if (res) {
        vueContext.commit("setIsLogin", false);
        localStorage.removeItem(util.token);
        return res;
      }
    });

};

export const userRegister = (vueContext, registerData) => {
  return util.service.post("user/registration", registerData)
    .then(response => {
      if (response) {
        return response;
      }
    })
};

export const initIsLogin = (vueContext) => {
  if (localStorage.getItem(util.token)) {
    vueContext.commit("setIsLogin", true)
  } else {
    vueContext.commit("setIsLogin", false)
  }
};
