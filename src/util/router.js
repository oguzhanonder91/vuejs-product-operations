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
      controlLoginAndMenuPermission(to, from, next);
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashBoard,
        beforeEnter(to, from, next) {
          controlLoginAndMenuPermission(to, from, next);
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
              controlLoginAndMenuPermission(to, from, next);
            }
          },
          {
            path: "sell",
            name: "ProductSell",
            component: ProductSell,
            beforeEnter(to, from, next) {
              controlLoginAndMenuPermission(to, from, next);
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
    component: Login
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

let controlLoginAndMenuPermission = async (to, from, next) => {
  let isLogin = await initSet();
  if (!isLogin || util.common.getToken() === undefined) {
    util.common.logoutSuccessfully();
  } else if (store.getters.getShowPermissionMenus.includes(to.name)) {
    next()
  }else{
    router.go(-1);
  }
};

let initSet = async () => {
  if (store.getters.getIsLogin == null) {
    store.dispatch("initIsLogin");
    if (store.getters.getUser == null) {
      await store.dispatch("getUserAndMenus");
    }
  }
  return store.getters.getIsLogin;
};

const router = new VueRouter({
  routes: routes,
  mode: "history",
  linkActiveClass: 'active',
  scrollBehavior: () => ({y: 0}),
});


export default router;




