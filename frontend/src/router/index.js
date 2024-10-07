import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/registro',
    name: 'RegistroView',
    component: () => import(/* webpackChunkName: "registro" */ '../views/RegistroView.vue')
  },
  {
    path: '/tabla',
    name: 'TablaView',
    component: () => import(/* webpackChunkName: "tabla" */ '../views/TablaView.vue')
  },
  {
    path: '/carrousel',
    name: 'CarrouselView',
    component: () => import(/* webpackChunkName: "carrousel" */ '../views/CarrouselView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
