import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'startsida',
      component: () => import('../views/StartSida.vue')
    },
    {
      path: '/grupp',
      name: 'gruppspel',
      component: () => import('../views/GruppSpel.vue')
    },
    {
      path: '/slut',
      name: 'slutspel',
      component: () => import('../views/SlutSpel.vue')
    }
  ]
})

export default router
