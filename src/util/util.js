import store from '../store/store';
import router from '../util/router';
import Vue from "vue";

export const token = "mytoken";
export const rndData = "ond75";

export const notify = {
  control(commit, error) {
    if (error.status === 401) {
      commit("setIsLogin", false);
      localStorage.removeItem(token);
      if (!store.isLogin) {
        router.push("/login");
      }
    }
  }
};

export const randomCode =  function (data) {
  let rndKey = Math.random().toString(36).substr(2, 6);
  return btoa(btoa(data + rndData + rndKey));
};

export const service = {

  get(url){
    return Vue.http.get(url);
  },

  put (url , data){
    return Vue.http.put(url, data);

  },

  post (url,data){
    return Vue.http.post(url, data);
  },

  delete(url,data){
    return Vue.http.delete(url, data);
  }

}



