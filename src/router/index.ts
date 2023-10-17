// https://router.vuejs.org/zh/
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { storeToRefs } from 'pinia'

import { routes } from './router'
import { useUserStore } from '@/stores/user'
NProgress.configure({ showSpinner: true, parent: '#app' })

// 创建路由实例并传递 `routes` 配置
const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_PUBLIC_PATH),
  routes,
})

router.beforeEach((_to, _from, next) => {
  NProgress.start() // start progress bar
  const userStore = useUserStore()
  const { loginState } = storeToRefs(userStore)
  // 没有登陆之前默认登陆状态是false
  if (!loginState.value)
    // 从localStore加载存储的状态
    userStore.init()
  // 如果不是主页并且没有登陆
  if (_to.name !== 'main' && !loginState.value) {
    if (_to.name === 'login')
      next()
    else
      router.push({ name: 'login', query: { path: _to.path } })
  }
  else { next() }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

// 导出路由实例，并在 `main.ts` 挂载
export default router
