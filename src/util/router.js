import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/store';
import * as util from '../util/util';

/*const ProductList = resolve  =>{
  require.ensure(['../components/ProductList'] , () =>{
    resolve (require("../components/ProductList"))
  })
}

const ProductPurchase = resolve  =>{
  require.ensure(['../components/ProductPurchase'] , () =>{
    resolve (require("../components/ProductPurchase"))
  })
}


const ProductSell = resolve  =>{
  require.ensure(['../components/ProductSell'] , () =>{
    resolve (require("../components/ProductSell"))
  })
}

const Login = resolve  =>{
  require.ensure(['../components/Login'] , () =>{
    resolve (require("../components/Login"))
  })
}


const Register = resolve  =>{
  require.ensure(['../components/Register'] , () =>{
    resolve (require("../components/Register"))
  })
}
*/
const DashBoard = () => System.import('../components/Dashboard');
const TheContainer = () => System.import('../containers/TheContainer');
const ProductPurchase = () => System.import('../components/ProductPurchase');
const ProductSell = () => System.import('../components/ProductSell');
const UserConfirmation = () => System.import('../components/UserConfirmation');
const Login = () => System.import('../components/Login');
const Register = () => System.import('../components/Register');


Vue.use(VueRouter);


const routes = [

  {
    path: '/',
    redirect: '/dashboard',
    name: 'Home',
    component: TheContainer,
    beforeEnter(to, from, next) {
      controlLogin(next);
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashBoard,
        beforeEnter(to, from, next) {
          controlLogin(next);
        }
      },
      {
        path: 'product',
        redirect: '/product/purchase',
        name: 'Product',
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: "purchase",
            name: "ProductPurchase",
            component: ProductPurchase,
            beforeEnter(to, from, next) {
              controlLogin(next);
            }
          },
          {
            path: "sell",
            name: "ProductSell",
            component: ProductSell,
            beforeEnter(to, from, next) {
              controlLogin(next);
            }
          },
        ]
      }
    ]
  },
  {
    path: "/user/registrationConfirm",
    name: "UserConfirmation",
    component: UserConfirmation,
    children: [
      {path: ":param", component: UserConfirmation}
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter(to, from, next) {
      initSet();
      if (store.getters.getIsLogin && util.common.getToken() != null) {
        next("/dashboard")
      } else {
        next();
      }
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "*", redirect: "/dashboard",
  }

];

let controlLogin = (next) => {
  initSet();
  if (!store.getters.getIsLogin || util.common.getToken() == null) {
    util.common.logoutSuccessfully();
  } else
    next()
};

let initSet = () => {
  let isLogin = store.getters.getIsLogin;
  if (isLogin == null) {
    store.dispatch("initIsLogin")
  }
};

const router = new VueRouter({
  routes: routes,
  mode: "history",
  linkActiveClass: 'active',
  scrollBehavior: () => ({y: 0}),
});


export default router;




