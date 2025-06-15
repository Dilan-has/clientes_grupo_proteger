import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/modules/pages/principal/Home.vue'

export const router = createRouter({
  history: createWebHashHistory(import.meta.url),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/affiliates',
      name: 'affiliates',
      component: () => import('@/modules/pages/principal/Search_affiliate.vue')
    },
    {
      path: '/clients',
      name: 'clients',
      component: () => import('@/modules/pages/principal/Search_client.vue')
    },
    {
      path: '/edit_affiliate/:id',
      name: 'edit_affiliate',
      component: () => import('@/modules/pages/form/Edit_affiliate.vue')
    },
    {
      path: '/edit_client/:id',
      name: 'edit_client',
      component: () => import('@/modules/pages/form/Edit_client.vue')
    },
    {
      path: '/edit_credential/:id',
      name: 'edit_credential',
      component: () => import('@/modules/pages/form/Edit_credential.vue')
    },
    {
      path: '/create_client',
      name: 'create_client',
      component: () => import('@/modules/pages/form/Create_client.vue')
    },
    {
      path: '/create_affiliate',
      name: 'create_affiliate',
      component: () => import('@/modules/pages/form/Create_affiliate.vue')
    },
    {
      path: '/create_credential/:id',
      name: 'create_credential',
      component: () => import('@/modules/pages/form/Create_credential.vue')
    }
  ]
})
