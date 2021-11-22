import Vue from 'vue'
import VueRouter from 'vue-router'
import NewsHeadlines from '../views/NewsHeadlines.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'NewsHeadlines',
    component: NewsHeadlines
  },
  {
    path: '/details',
    name: 'NewsDetails',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/NewsDetails.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
