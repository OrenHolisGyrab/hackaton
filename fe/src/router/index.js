import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/Dashboard.vue'
          ),
      },
      {
        path: '/vypujcky',
        name: 'Vypujcky',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        children: [
          {
            path: 'aktivni',
            name: 'Aktivni',
            component: () => import('@/views/vypujcky/Aktivni.vue'),
          },
          {
            path: 'historie',
            name: 'Historie',
            component: () => import('@/views/vypujcky/Historie.vue'),
          },
          {
            path: 'polozky',
            name: 'Polozky',
            component: () => import('@/views/vypujcky/Polozky.vue'),
          },
        ]
      },
      {
        path: '/uzivatele',
        name: 'Uzivatele',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        children: [
          {
            path: 'opravneni',
            name: 'Opravnenia role',
            component: () => import('@/views/uzivatele/Opravneni.vue'),
          },
        ]
      },
    ],
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
