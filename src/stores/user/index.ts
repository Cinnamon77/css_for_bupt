import { defineStore } from 'pinia'
import type { User } from '@/api-services'
import { STORAGE_TOKEN_KEY } from '@/stores/mutation-type'
import { decryptJWT, feature, getJWTDate } from '@/utils/axios-utils'
import { useLoginApi } from '@/api'

const accessTokenKey = STORAGE_TOKEN_KEY
const userInfoKey = 'userInfo'
const loginStateKey = 'loginState'
export const useUserStore = defineStore('user', {
  state: () => {
    const userInfo: User = null
    const loginState: Boolean = false
    const accessToken: string = null
    return {
      userInfo,
      loginState,
      accessToken,
    }
  },
  getters: {
    // 获取角色数组
    roles(state) {
      return state.userInfo?.roles?.reduce((pre, cur) => {
        if (cur.authority)
          pre.push(cur.authority)
        return pre
      }, [])
    },
  },
  actions: {
    makeUserInfo(token: string): User {
      const userInfo: User = {}
      const info = decryptJWT(token)
      userInfo.id = info.id
      userInfo.username = info.name
      userInfo.roles = []
      info.authorities?.forEach((e) => {
        userInfo.roles.push({ authority: e })
      })
      return userInfo
    },
    async signIn(values: User) {
      const [err, res] = await feature(useLoginApi().signIn(values))
      if (err) {
        if (err.response?.status === 404) {
          const url = new URL(err.response.request?.responseURL)
          if (url.searchParams.has('jwt')) {
            const token = url.searchParams.get('jwt')
            const info = this.makeUserInfo(token)
            this.setUserInfo(info, token)
            return
          }
        }
        this.clearUserInfo()
      }
      if (res)
        this.setUserInfo(res.data.data, res.data.msg)
    },
    async signOut() {
      await feature(useLoginApi().signOut(null))
      this.clearUserInfo()
    },
    init() {
      const accessToken = window.localStorage.getItem(accessTokenKey)
      if (accessToken) {
        // 判断 accessToken 是否过期
        const jwt: any = decryptJWT(accessToken)
        const exp = getJWTDate(jwt.exp as number)
        // token 已经过期
        if (new Date() >= exp)
          this.clearUserInfo()

        else
          this.loadUserInfo()
      }
      else {
        this.clearUserInfo()
      }
    },
    setUserInfo(data: User, token: string) {
      this.userInfo = data
      this.loginState = true
      window.localStorage.setItem(userInfoKey, JSON.stringify(this.userInfo))
      window.localStorage.setItem(loginStateKey, JSON.stringify(this.loginState))
      window.localStorage.setItem(accessTokenKey, token)
    },
    clearUserInfo() {
      this.userInfo = null
      this.loginState = false
      this.accessToken = null
      window.localStorage.removeItem(userInfoKey)
      window.localStorage.removeItem(loginStateKey)
      window.localStorage.removeItem(accessTokenKey)
    },
    loadUserInfo() {
      const userInfo = window.localStorage.getItem(userInfoKey)
      this.userInfo = userInfo != null && JSON.parse(userInfo)
      const loginState = window.localStorage.getItem(loginStateKey)
      this.loginState = loginState != null && JSON.parse(loginState)
      this.accessToken = window.localStorage.getItem(accessTokenKey)
    },
  },
})

