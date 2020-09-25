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


export const login = (vueContext, loginData) => {
  loginData.password = util.randomCode(loginData.password);
  loginData.username = util.randomCode(loginData.username);
  return util.service.post("auth/login", loginData)
    .then(response => {
      loginData.password = null;
      loginData.username = null;
      if (response) {
        util.common.loginSuccessfully(response.data);
        vueContext.dispatch("getTradeResult");
        util.common.routePush("dashboard");
        util.common.control(response);
      }
    }).catch(error => {
      loginData.password = null;
      loginData.username = null;
      util.common.control(error);
    });
};

export const logout = () => {
  return util.service.post("auth/logout")
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
  return util.service.post("user/registration", registerData)
    .then(response => {
      if (response) {
        return response;
      }
      util.common.control(response);

    }).catch(error => {
      registerData = {};
      util.common.control(error);
    })
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

