import Vue from 'vue';
import VueRouter from 'vue-router';

const login = () => import( /* webpackChunkName: "login"*/ '@/views/login');
const index = () => import( /* webpackChunkName: "index"*/ '@/views/index');
const notFound = () => import( /* webpackChunkName: "notFound"*/ '@/views/404');

const user = () => import( /* webpackChunkName: "user"*/ '@/components/users/user');
const customer = () => import( /* webpackChunkName: "customer"*/ '@/components/users/customer');
const product = () => import( /* webpackChunkName: "product"*/ '@/components/users/product');
const price = () => import( /* webpackChunkName: "price"*/ '@/components/users/price');
const offer = () => import( /* webpackChunkName: "offer"*/ '@/components/users/offer');
const contract = () => import( /* webpackChunkName: "contract"*/ '@/components/users/contract');
const approval = () => import( /* webpackChunkName: "approval"*/ '@/components/users/approval');

const routes = [
  {
    name: 'index',
    path: '/index',
    component: index,
    children: [{
      name: 'user',
      path: 'user',
      component: user
    }, {
      name: 'customer',
      path: 'customer',
      component: customer
    },
    {
      name: 'product',
      path: 'product',
      component: product
    },
    {
      name: 'price',
      path: 'price',
      component: price
    },
    {
      name: 'offer',
      path: 'offer',
      component: offer
    },
    {
      name: 'contract',
      path: 'contract',
      component: contract
    },
    {
      name: 'approval',
      path: 'approval',
      component: approval
    }]
  },
  {
    name: 'login',
    path: '/login',
    component: login
  },
  {
    name: 'login',
    path: '/',
    redirect: '/login',
    component: login
  },
  {
    name: 'notFound',
    path: '*',
    component: notFound
  },
]
Vue.use(VueRouter);

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (sessionStorage && to.path !== '/login') {
    sessionStorage.getItem("isLogin") ? next() : next('/login')
    return;
  }
  next()
})

export default router;