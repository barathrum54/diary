import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Today',
    component: () => import( '../views/Today.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import( '../views/History.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  }
]
import {requiredAuth} from "@/router/middleware/auth.middleware";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach(requiredAuth);


export default router
