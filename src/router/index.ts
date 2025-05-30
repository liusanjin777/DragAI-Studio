import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layouts/page/default.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'content',
          component: async () => await import('../views/LayoutTestView.vue')
        },
        {
          path: 'list',
          name: 'list',
          component: async () => await import('../views/LayoutTestTable.vue')
        }
      ]
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

export default router
