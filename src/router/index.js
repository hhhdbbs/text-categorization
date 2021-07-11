import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/online",
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: ()=>import('@/views/homepage.vue'),
  },
  {
    path: '/online',
    name: 'online',
    component: ()=>import('@/views/online.vue'),
  }
]

const router = new VueRouter({
  routes
})

export default router
