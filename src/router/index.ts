import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
import StartPage from '@/pages/StartPage.vue'
import CardsPage from '@/pages/CardsPage.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'start',
        component: StartPage,
      },
      {
        path: 'cards/:level',
        name: 'cards',
        component: CardsPage,
        props: true,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory('/en-card/'),
  routes,
})

export default router
