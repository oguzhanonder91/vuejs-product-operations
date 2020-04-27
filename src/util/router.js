import Vue from 'vue';
import VueRouter from 'vue-router';
import ProductList from '../components/ProductList';
import ProductPurchase from '../components/ProductPurchase';
import ProductSell from '../components/ProductSell';


Vue.use(VueRouter);


 const routes = [

  {
    path: "/",
    name: "ProductList",
    component: ProductList
  },
  {
    path: "/purchase",
    name: "ProductPurchase",
    component: ProductPurchase
  }, {
    path: "/sell",
    name: "ProductSell",
    component: ProductSell
  },
  {
    path: "*", redirect: "/"
  }

];

  const router = new VueRouter({
    routes:routes,
    mode: "history"
  });

  export default router;




