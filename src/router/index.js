import { createRouter, createWebHistory } from 'vue-router'
import login from '../pages/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    }
    // {
    //   path: '/home',
    //   name: 'home',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../pages/Home.vue')
    // }
  ]
})

export default router
