import Vue from 'vue';
import Router from 'vue-router';

import { newsRoutes } from './news';

// import { AppPageNotFound } from './shared/components';

Vue.use(Router);

const appRoutes = [
  {
    path: '/',
    redirect: { name: 'NewsHeadlines' }
  },
  {
    path: '*',
    redirect: { name: 'NewsHeadlines' }
    // name: 'page-not-found',
    // component: AppPageNotFound
  }
];

const routes = [...newsRoutes, ...appRoutes];

export default new Router({
  mode: 'history',
  routes
});


