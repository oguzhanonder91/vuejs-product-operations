import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/store';
import * as util from '../util/util';


const TheContainer = resolve => {
  require.ensure(['../containers/TheContainer'], () => {
    resolve(require("../containers/TheContainer"))
  })
};

const DashBoard = resolve => {
  require.ensure(['../components/Dashboard'], () => {
    resolve(require("../components/Dashboard"))
  })
};

const UserConfirmation = resolve => {
  require.ensure(['../components/UserConfirmation'], () => {
    resolve(require("../components/UserConfirmation"))
  })
};

const ProductPurchase = resolve => {
  require.ensure(['../components/ProductPurchase'], () => {
    resolve(require("../components/ProductPurchase"))
  })
};

const ProductSell = resolve => {
  require.ensure(['../components/ProductSell'], () => {
    resolve(require("../components/ProductSell"))
  })
};

const Login = resolve => {
  require.ensure(['../components/Login'], () => {
    resolve(require("../components/Login"))
  })
};


const Register = resolve => {
  require.ensure(['../components/Register'], () => {
    resolve(require("../components/Register"))
  })
};

const ForgotPassword = resolve => {
  require.ensure(['../components/ForgotPassword'], () => {
    resolve(require("../components/ForgotPassword"))
  })
};

const ChangePassword = resolve => {
  require.ensure(['../components/ChangePassword'], () => {
    resolve(require("../components/ChangePassword"))
  })
};

/*const DashBoard = () => System.import('../components/Dashboard');
const TheContainer = () => System.import('../containers/TheContainer');
const ProductPurchase = () => System.import('../components/ProductPurchase');
const ProductSell = () => System.import('../components/ProductSell');
const UserConfirmation = () => System.import('../components/UserConfirmation');
const Login = () => System.import('../components/Login');
const Register = () => System.import('../components/Register');
const ForgotPassword = () => System.import('../components/ForgotPassword');
const ChangePassword = () => System.import('../components/ChangePassword');*/

Vue.use(VueRouter);


const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Home',
    component: TheContainer,
    beforeEnter: (to, from, next) => {
      controlLoginAndMenuPermission(to, from, next).catch();
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashBoard,
        beforeEnter: (to, from, next) => {
          controlLoginAndMenuPermission(to, from, next).catch();
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
            beforeEnter: (to, from, next) => {
              controlLoginAndMenuPermission(to, from, next).catch();
            }
          },
          {
            path: "sell",
            name: "ProductSell",
            component: ProductSell,
            beforeEnter: (to, from, next) => {
              controlLoginAndMenuPermission(to, from, next).catch();
            }
          },
        ]
      }
    ]
  },
  {
    path: "/user/forgotPassword",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/user/registrationConfirm",
    name: "UserConfirmation",
    component: UserConfirmation,
    children: [
      {
        path: ":param1/:param2",
        component: UserConfirmation,
      }
    ]
  },
  {
    path: "/user/changePassword",
    name: "ChangePassword",
    component: ChangePassword,
    children: [
      {
        path: ":param1/:param2",
        component: ChangePassword,
      }
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
  let isLogin = await initSet().catch();
  if (!isLogin || util.common.getToken() === undefined) {
    util.common.logoutSuccessfully();
  } else if (store.getters.getShowPermissionMenus.includes(to.name)) {
    next()
  } else {
    router.go(-1);
  }
};

let initSet = async () => {
  if (store.getters.getIsLogin == null) {
    await store.dispatch("initIsLogin");
    if (store.getters.getIsLogin && store.getters.getUser == null) {
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




