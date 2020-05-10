import store from '../store/store';
import router from '../util/router';

export const token = "mytoken";

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
}
