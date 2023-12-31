import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Domovská obrazovka',
    component: DefaultLayout,
    redirect: '/vypujcky/personal-active',
    children: [
      {
        path: 'scan/:code?',
        props: true,
        name: 'scanner',
        component: () => import('@/views/vypujcky/Scanner'),
      },
      {
        path: '/vypujcky',
        name: 'Výpůjčky',
        redirect: '/vypujcky/aktivni',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        children: [
          {
            path: 'personal-active',
            name: 'Osobní aktivní',
            component: () => import('@/views/vypujcky/Personal.vue'),
          },
          {
            path: 'personal-historic',
            name: 'Osobní historie',
            component: () => import('@/views/vypujcky/PersonalHistoric.vue'),
          },
          {
            path: 'aktivni',
            name: 'Aktivní',
            component: () => import('@/views/vypujcky/Aktivni.vue'),
          },
          {
            path: 'aktivni/create/:code?',
            name: 'Create',
            props: true,
            component: () => import('@/views/vypujcky/Aktivni.vue'),
          },
          {
            path: 'aktivni/return/:id?',
            name: 'Return',
            props: true,
            component: () => import('@/views/vypujcky/Aktivni.vue'),
          },
          {
            path: 'historie',
            name: 'Historie',
            component: () => import('@/views/vypujcky/Historie.vue'),
          },
          {
            path: 'polozky',
            name: 'Položky',
            component: () => import('@/views/vypujcky/Polozky.vue'),
          },
        ]
      },
      {
        path: '/uzivatele',
        name: 'Uživatele',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        children: [
          {
            path: 'opravneni',
            name: 'Uživatelé',
            component: () => import('@/views/uzivatele/Users.vue'),
          },
        ]
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/pages/Login.vue'),
  },
  {
    path: '/',
    redirect: '/404',
    name: 'Views',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
      },
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
