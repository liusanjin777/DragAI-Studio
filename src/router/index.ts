import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layouts/page/default.vue'
import Flow from '@/views/Flow.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Flow,
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
