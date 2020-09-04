import store from '../store/store';
import router from '../util/router';
import Vue from "vue";

export const token = "mytoken";
export const expiry = "expiryDate";
export const diffTime = "diffTime";
export const rndData = "ond75";

export const common = {
  control(error) {
    if (error.status === 401) {
      this.logoutSuccessfully();
      if (!store.getters.getIsLogin) {
        this.routePush("login");
      }
    }
  },
  logoutSuccessfully(){
    store.commit("setIsLogin", false);
    localStorage.removeItem(token);
    localStorage.removeItem(expiry);
    localStorage.removeItem(diffTime);
  },
  loginSuccessfully(res){
    store.commit("setIsLogin", true);
    let diff = parseInt(new Date().getTime() - res.issuedAt) ;
    localStorage.setItem(token, res.token);
    localStorage.setItem(expiry, parseInt(res.expirationDate));
    localStorage.setItem(diffTime,diff);
    let result = this.calculateTime(parseInt(res.expirationDate));
    store.dispatch("setTimeOutTimerExpiry", result.timer);
  },
  getToken(){
    return localStorage.getItem(token);
  },
  calculateTime(expiry){
    let issued = parseInt(localStorage.getItem(diffTime));
    let result = {};
    let now = new Date().getTime();
    let expiryVal = expiry-issued;
    let timer = expiryVal - now  ;
    result.now = now;
    result.timer = timer;
    result.expiry = expiryVal;
    return result ;
  },
  routePush (path){
    try {
      router.push("/"+path)
    }catch (e) {
    }
  }
};

export const randomCode = function (data) {
  let rndKey = Math.random().toString(36).substr(2, 6);
  return btoa(btoa(data + rndData + rndKey));
};

export const service = {

  get(url) {
    return Vue.http.get(url)
  },

  put(url, data) {
    return Vue.http.put(url, data)

  },

  post(url, data) {
    return Vue.http.post(url, data)
  },

  delete(url, data) {
    return Vue.http.delete(url, data);
  }

}



