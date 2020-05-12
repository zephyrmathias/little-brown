import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Little Brown Book Shop - Homepage',
    },
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import(/* webpackChunkName: "about" */ '../views/Payment.vue'),
    meta: {
      title: 'Little Brown Book Shop - Payment',
    },
  },
  {
    path: '/summary',
    name: 'Summary',
    component: () => import(/* webpackChunkName: "about" */ '../views/Summary.vue'),
    meta: {
      title: 'Little Brown Book Shop - Summary',
    },
  },
];

const router = new VueRouter({
  routes,
});

router.afterEach((to) => {
  window.scrollTo(0, 0);
  if (to.meta?.title) {
    document.title = to.meta.title;
  }
});

export default router;
