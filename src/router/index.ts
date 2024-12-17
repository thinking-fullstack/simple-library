import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/MainLayout/index.vue'
import BookList from '@/pages/Book/List.vue'
import BookDetail from '@/pages/Book/Detail.vue'
import BookView from '@/pages/Book/View.vue'
import Login from '@/pages/Login/index.vue'
import Register from '@/pages/Register/index.vue'
import { useUserStore } from '@/stores'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    meta: { requiresAuth: true, layout: MainLayout },
    children: [
      {
        path: '',
        component: BookList,
        meta: { title: 'Books' }
      },
      {
        path: 'new',
        component: BookDetail,
        meta: { title: 'Creat New Book' }
      },
      {
        path: ':id/edit',
        component: BookDetail,
        meta: { title: 'Edit Book' }
      },
      {
        path: ':id/view',
        component: BookView,
        meta: { title: 'View Book' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const { isAuthenticated, getMe, user } = useUserStore()

  if (to.meta.requiresAuth) {
    if (isAuthenticated) {
      if (!user) {
        try {
          await getMe()
        } catch (e) {
          return next('/login')
        }
      }
      return next()
    } else {
      return next('/login')
    }
  } else {
    if (isAuthenticated) {
      try {
        await getMe()
        return next('/')
      } catch (e) {
        next()
      }
    }
  }

  next()
})

export default router
