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



