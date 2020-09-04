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

Vue.use(VueRouter);


const routes = [

  {
    path: '/',
    redirect: '/dashboard',
    name: 'Home',
    component: () => System.import('../containers/TheContainer'),
    beforeEnter(to, from, next) {
      controlLogin(next);
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => System.import('../components/Dashboard'),
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
          /* {
             path: "productList",
             name: "ProductList",
             component: () => System.import('../components/ProductList'),
             beforeEnter(to, from, next) {
               controlLogin(next);
             }
           },*/
          {
            path: "purchase",
            name: "ProductPurchase",
            component: () => System.import('../components/ProductPurchase'),
            beforeEnter(to, from, next) {
              controlLogin(next);
            }
          },
          {
            path: "sell",
            name: "ProductSell",
            component: () => System.import('../components/ProductSell'),
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
    component: () => System.import('../components/UserConfirmation'),
    children: [
      { path: ":param" , component : () => System.import('../components/UserConfirmation')}
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => System.import('../components/Login'),
    beforeEnter(to, from, next) {
      initSet();
      if (store.getters.getIsLogin && util.common.getToken() != null) {
        next("/dashboard")
      } else {
        next();
        util.common.logoutSuccessfully();
      }
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () => System.import('../components/Register'),
  },
  {
    path: "*", redirect: "/dashboard",
  }

];

let controlLogin = (next) => {
  initSet();
  if (!store.getters.getIsLogin || util.common.getToken() == null) {
    next("/login");
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




