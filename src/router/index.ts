import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/pages/StartPage.vue'),
  },
  {
    path: '/cards/:level',
    name: 'cards',
    component: () => import('@/pages/CardsPage.vue'),
    props: true, // ← обязательно! Это нужно, чтобы :level стал prop-ом
  },
]

const router = createRouter({
  history: createWebHistory('/en-card/'),
  routes,
})

export default router
