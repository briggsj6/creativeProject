import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Inspiration from '../views/Inspiration.vue'
import Comment from '../views/Comment.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/inspiration',
    name: 'Inspiration',
    component: Inspiration
  },
  {
    path: '/comment/:id',
    name: 'comment',
    component: Comment,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router