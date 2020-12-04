import Vue from 'vue'
import VueRouter from 'vue-router'
import New from '../views/New.vue'
import All from '../views/All.vue'
import Player from '../views/Player.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'New',
    component: New
  },
  {
    path: '/all',
    name: 'All',
    component: All
  },
  {
    path: '/player/:playerId',
    name: 'Player',
    component: Player,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
