import Vue from "vue";
import * as util from '../util/util'

export const setTradeResult = ({state, commit}, tradeResult) => {
  Vue.http.post("trade/create", tradeResult)
    .then(response => {
      commit("updateTradeResult", response.data);
    })
};

export const getTradeResult = ({commit}) => {
  Vue.http.get("trade/result")
    .then(response => {
      commit("updateTradeResult", response.data);
    }).catch(error=>{
     util.notify.control(commit,error)
  })
};


export const login = (vueContext, loginData) => {
  return Vue.http.post('auth/login', loginData)
    .then(response => {
      vueContext.commit("setIsLogin",true);
      localStorage.setItem(util.token, response.data.token);
    });
};

export const logout = (vueContext) => {
  return Vue.http.post('auth/logout').then(res => {
    vueContext.commit("setIsLogin",false);
    localStorage.removeItem(util.token);
  });

};

export const userRegister = (vueContext, registerData) => {
  return Vue.http.post('user/registration', registerData)
    .then(response => {

    });
};

export const initIsLogin = (vueContext) => {
  if (localStorage.getItem(util.token)) {
    vueContext.commit("setIsLogin",true)
  }else{
    vueContext.commit("setIsLogin",false)
  }
};
