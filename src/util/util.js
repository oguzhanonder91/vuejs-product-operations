import store from '../store/store';
import router from '../util/router';
import Vue from "vue";

export const token = "mytoken";
export const expiry = "expiryDate";
export const diffTime = "diffTime";
export const rndData = "ond75";
export const toastType = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  FORBIDDEN: 'forbidden'
};

export const toastIcon = {
  SUCCESS: 'cilCheck',
  WARNING: 'cilWarning',
  ERROR: 'cilXCircle',
  FORBIDDEN: 'cilUserX'
};


export const common = {
  control(result, paramToast) {
    let toast = paramToast;
    switch (result.status) {
      case 200 :
      case 201 :
        if (toast !== undefined) {
          store.commit("setMyToast", toast);
        }
        break;
      case 401 :
        this.logoutSuccessfully();
        if (result.body !== undefined && result.body.message !== undefined) {
          toast = this.prepareToast("Login Hatası", toastType.ERROR, result.body.message, true);
          store.commit("setMyToast", toast);
        }
        break;
      case 403 :
        toast = this.prepareToast("Erişim Engeli", toastType.FORBIDDEN, "Bu işlem için yetkiniz bulunmamaktadır.", true);
        store.commit("setMyToast", toast);
        break;
      case 404 :
        if (result.body !== undefined && result.body.details !== undefined) {
          toast = this.prepareToast("Not Found", toastType.WARNING, result.body.details, true);
          store.commit("setMyToast", toast);
        }
        break;
      case 500 :
        toast = this.prepareToast("Hata", toastType.ERROR, "İşlem Gerçekleştirilemedi. Bir Hata Oluştu", true);
        store.commit("setMyToast", toast);
        break;
    }
    this.setLoadingFalse();
  },
  logoutSuccessfully() {
    store.commit("setIsLogin", false);
    localStorage.removeItem(token);
    localStorage.removeItem(expiry);
    localStorage.removeItem(diffTime);
    if (router.currentRoute.name !== "Login") {
      this.routePush("login");
    }
  },
  loginSuccessfully(res) {
    store.commit("setIsLogin", true);
    let diff = parseInt(new Date().getTime() - res.issuedAt);
    localStorage.setItem(token, res.token);
    localStorage.setItem(expiry, parseInt(res.expirationDate));
    localStorage.setItem(diffTime, diff);
    let result = this.calculateTime(parseInt(res.expirationDate));
    store.dispatch("setTimeOutTimerExpiry", result.timer);
  },
  getToken() {
    return localStorage.getItem(token);
  },
  calculateTime(expiry) {
    let issued = parseInt(localStorage.getItem(diffTime));
    let result = {};
    let now = new Date().getTime();
    let expiryVal = expiry - issued;
    let timer = expiryVal - now;
    result.now = now;
    result.timer = timer;
    result.expiry = expiryVal;
    return result;
  },
  routePush(path) {
    try {
      router.push("/" + path)
    } catch (e) {
    }
  },
  setLoadingFalse() {
    store.commit("setIsLoading", false);
  },
  setLoadingTrue() {
    store.commit("setIsLoading", true);
  },
  prepareToast(header, type, message, show) {
    let toast = store.getters.getMyToast;
    toast.header = header;
    toast.type = type;
    toast.message = message;
    toast.show = show;
    if (type === toastType.ERROR) {
      toast.icon = toastIcon.ERROR;
    } else if (type === toastType.SUCCESS) {
      toast.icon = toastIcon.SUCCESS;
    } else if (type === toastType.FORBIDDEN) {
      toast.icon = toastIcon.FORBIDDEN;
    } else {
      toast.icon = toastIcon.WARNING;
    }
    return toast;
  },
  prepareMenus(values) {
    let menus = [];
    let children = [];
    let val;
    let child;
    if (values) {
      for (val in values) {
        let menu = {};
        if (values[val].code === "dashboard") {
          menu._name = "CSidebarNavItem"
        } else {
          menu._name = "CSidebarNavDropdown"
        }
        menu.name = values[val].name;
        menu.icon = values[val].icon;
        menu.to = values[val].path;
        menu.orderItem = values[val].orderItem;
        if (values[val].children.length > 0) {
          for (child in values[val].children) {
            let childMenu = {};
            childMenu.name = values[val].children[child].name;
            childMenu.to = values[val].children[child].path;
            childMenu.orderItem = values[val].children[child].orderItem;
            childMenu.code = values[val].children[child].code;
            childMenu.icon = values[val].children[child].icon;
            children.push(childMenu);
          }
          menu.items = children;
        }
        menus.push(menu);
      }
    }
    return menus;
  }


};

export const randomCode = function (data) {
  let rndKey = Math.random().toString(36).substr(2, 6);
  return btoa(btoa(data + rndData + rndKey));
};

export const service = {

  get(url) {
    common.setLoadingTrue();
    return Vue.http.get(url)
  },

  put(url, data) {
    common.setLoadingTrue();
    return Vue.http.put(url, data)
  },

  post(url, data) {
    common.setLoadingTrue();
    return Vue.http.post(url, data);
  },

  delete(url, data) {
    common.setLoadingTrue();
    return Vue.http.delete(url, data);
  }

}



