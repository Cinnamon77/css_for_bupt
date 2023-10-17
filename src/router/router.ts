// 导入路由组件
import type { RouteRecordRaw } from 'vue-router'
import main from '@/views/index.vue'
import mock from '@/views/mock/index.vue'
import charts from '@/views/charts/index.vue'
import login from '@/views/login/index.vue'
import layout from '@/layout/index.vue'
import { useUserStore } from '@/stores/user'
// 定义路由，每个路由都需要映射到一个组件
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    component: main,
    beforeEnter: (to, _, next) => {
      const token = to.query.jwt as string
      const userStore = useUserStore()
      if (token) {
        try {
          const userInfo = userStore.makeUserInfo(token)
          userStore.setUserInfo(userInfo, token)
        }
        catch {
          userStore.clearUserInfo()
        }
      }
      // else {
      //   userStore.clearUserInfo()
      // }
      next()
    },
  },
  {
    path: '/layout',
    name: 'layout',
    component: layout,
    children: [
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/index.vue'),
      },
      {
        path: '/recommand/query',
        name: 'recommandQuery',
        component: () => import('@/views/recommend/query/index.vue'),
      },
      {
        path: '/recommand/result',
        name: '/recommandResult',
        component: () => import('@/views/recommend/result/index.vue'),
      },
      {
        path: '/school/query',
        name: 'schoolQuery',
        component: () => import('@/views/school/query/index.vue'),
      },
      {
        path: '/school/result',
        name: 'schoolResult',
        component: () => import('@/views/school/result/index.vue'),
      },
      {
        path: '/school/introduce',
        name: 'schoolIntroduce',
        component: () => import('@/views/school/introduce/index.vue'),
      },
      {
        path: '/school/major',
        name: 'schoolMajor',
        component: () => import('@/views/school/major/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },

  {
    path: '/mock',
    name: 'mock',
    component: mock,
  },
  {
    path: '/charts',
    name: 'charts',
    component: charts,
  },
]
