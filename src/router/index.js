import Vue from 'vue'
import VueRouter from 'vue-router'  

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/pokemon/:id',
    name: 'pokemon',
    component: () => import('../views/PokemonView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
