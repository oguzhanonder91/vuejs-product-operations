import Vue from 'vue';
import VueRouter from 'vue-router';
import ProductList from '../components/ProductList';
import ProductPurchase from '../components/ProductPurchase';
import ProductSell from '../components/ProductSell';
import Login from '../components/Login';
import Register from '../components/Register';
import store from '../store/store';
import * as util from '../util/util';


Vue.use(VueRouter);


const routes = [

  {
    path: "/",
    name: "ProductList",
    component: ProductList,
    beforeEnter(to, from, next) {
      controlLogin(next);
    }
  },
  {
    path: "/purchase",
    name: "ProductPurchase",
    component: ProductPurchase,
    beforeEnter(to, from, next) {
      controlLogin(next);
    }
  },
  {
    path: "/sell",
    name: "ProductSell",
    component: ProductSell,
    beforeEnter(to, from, next) {
      controlLogin(next);
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter(to, from, next) {
      let isLogin = store.state.isLogin;
      if (isLogin == null || !localStorage.getItem(util.token)) {
        store.dispatch("initIsLogin")
      }
      if (store.state.isLogin) {
        next("/")
      } else
        next()
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "*", redirect: "/",
  }

];

let controlLogin = (next) => {
  let isLogin = store.state.isLogin;
  if (isLogin == null || !localStorage.getItem(util.token)) {
    store.dispatch("initIsLogin")
  }
  if (!store.state.isLogin) {
    next("/login")
  } else
    next()
}

const router = new VueRouter({
  routes: routes,
  mode: "history"
});


export default router;




