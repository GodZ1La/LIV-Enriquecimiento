// Composables
import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/default-layout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home-view.vue')
      },
      {
        path: '/conversation/:sessionId',
        name: 'Virtual Agent Conversation',
        component: () => import(/* webpackChunkName: "home" */ '@/views/chat-view.vue')
      },
      {
        path: '/compPrueba',
        name: 'Probamos el componente',
        component: () => import('@/components/cardCarousel.vue')
      }
    ],
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    next()
  } else {
    next()
  }
})

export default router
