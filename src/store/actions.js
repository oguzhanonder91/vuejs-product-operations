import * as util from '../util/util';
import router from '../util/router';

export const setTradeResult = ({state, commit}, tradeResult) => {
  util.service.post("trade/createOrUpdate", tradeResult)
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
    util.notify.control(error)
  })
};


export const login = (vueContext, loginData) => {
  loginData.password = util.randomCode(loginData.password);
  loginData.username = util.randomCode(loginData.username);

  return util.service.post("auth/login", loginData)
    .then(response => {
      if (response) {
        vueContext.commit("setIsLogin", true);
        localStorage.setItem(util.token, response.data.token);
        localStorage.setItem(util.expiry, response.data.expirationDate);
        vueContext.dispatch("setTimeOutTimerExpiry", response.data.expirationDate);
        vueContext.dispatch("initApp");
        vueContext.dispatch("getTradeResult");
        router.push("/");
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
        localStorage.removeItem(util.expiry);
        router.push("/login");
      }
    }).catch(err=>{
      util.notify.control(err);
    });
};

export const userRegister = (vueContext, registerData) => {
  return util.service.post("user/registration", registerData)
    .then(response => {
      if (response) {
        return response;
      }
    }).catch(error => {
      registerData = {};
    })
};

export const setTimeOutTimerExpiry = (vueContext, expiry) => {
  setTimeout(() => {
    vueContext.dispatch("logout");
  }, expiry);
}

export const initIsLogin = (vueContext) => {
  let obj= {};
  obj.status = 401;
  if (localStorage.getItem(util.token)) {
    let now = new Date().getTime();
    let expiry = localStorage.getItem(util.expiry);
    if (now >= expiry) {
     util.notify.control(obj);
    } else {
      let timer = expiry - now;
      vueContext.commit("setIsLogin", true);
      vueContext.dispatch("setTimeOutTimerExpiry", timer)
    }
  } else {
    util.notify.control(obj);
  }
};

