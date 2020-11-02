import * as util from '../util/util';

export const setTradeResult = ({state, commit}, tradeResult) => {
  util.service.post("trade/createOrUpdate", tradeResult)
    .then(response => {
      if (response) {
        commit("updateTradeResult", response.data);
      }
      util.common.control(response);
    }).catch(error => {
    util.common.control(error)
  });
};

export const getTradeResult = ({commit}) => {
  util.service.get("trade/result")
    .then(response => {
      if (response) {
        commit("updateTradeResult", response.data);
      }
      util.common.control(response);
    }).catch(error => {
    util.common.control(error)
  })
};

export const registerConfirm = (vueContext, param) => {
  return util.service.get("user/registrationConfirm/" + param)
    .then(response => {
      if (response) {
        util.common.control(response);
        return response;
      }
    }).catch(error => {
      util.common.control(error)
    })
};

export const getUserAndMenus = (vueContext) => {
  return util.service.get("user/menus")
    .then(response => {
      if (response) {
        vueContext.commit("setUser", response.data);
        vueContext.commit("setShowMenus", response.data.menus);
        util.common.control(response);
      }

    }).catch(error => {
      util.common.control(error);
    })
}

export const login = (vueContext, loginData) => {
  loginData.password = util.randomCode(loginData.password);
  loginData.username = util.randomCode(loginData.username);
  util.service.post("auth/login", loginData)
    .then(async response => {
      if (response) {
        util.common.loginSuccessfully(response.data);
        await vueContext.dispatch("getUserAndMenus");
        vueContext.dispatch("getTradeResult");
        util.common.routePush("dashboard");
        util.common.control(response);
      }
    }).catch(error => {
    loginData.password = null;
    loginData.username = null;
    util.common.control(error);
  });
  util.common.setNull(loginData);
};

export const logout = () => {
  util.service.post("auth/logout")
    .then(res => {
      if (res) {
        util.common.logoutSuccessfully();
        util.common.control(res);
      }
    }).catch(err => {
    util.common.control(err);
  });
};

export const userRegister = (vueContext, registerData) => {
  registerData.password = util.randomCode(registerData.password);
  registerData.matchingPassword = util.randomCode(registerData.matchingPassword);
  util.service.post("user/registration", registerData)
    .then(response => {
      if (response) {
        let toast = util.common.successToast("Lütfen mailinizi kontrol edin...");
        util.common.control(response, toast);
        util.common.routePush("login");
        return response;
      }

    }).catch(error => {
    util.common.control(error);
  });
  util.common.setNull(registerData);
};

export const setTimeOutTimerExpiry = (vueContext, expiry) => {
  setTimeout(() => {
    vueContext.dispatch("logout");
  }, expiry);
}

export const initIsLogin = (vueContext) => {
  let obj = {};
  obj.status = 401;
  if (util.common.getToken()) {
    let result = util.common.calculateTime(localStorage.getItem(util.expiry));
    if (result.now >= result.expiry) {
      util.common.control(obj);
    } else {
      let timer = result.timer;
      vueContext.commit("setIsLogin", true);
      vueContext.dispatch("setTimeOutTimerExpiry", timer)
    }
  } else {
    util.common.control(obj);
  }
};

