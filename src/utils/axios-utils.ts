/**
 * 当前版本：v1.1.0
 * 使用描述：https://editor.swagger.io 代码生成 typescript-axios 辅组工具库
 * 依赖说明：适配 axios 版本：v0.21.4
 * 视频教程：https://www.bilibili.com/video/BV1EW4y1C71D
 */

import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { showNotify } from 'vant'
import { Configuration } from '@/api-services'
import type { BaseAPI } from '@/api-services/base'
import { BASE_PATH } from '@/api-services/base'
import { STORAGE_TOKEN_KEY } from '@/stores/mutation-type'
import { useUserStore } from '@/stores/user'
// 如果是 Angular 项目，则取消下面注释即可
// import { environment } from './environments/environment';

/**
 * 接口服务器配置
 */
export const serveConfig = new Configuration({
  // 如果是 Angular 项目，则取消下面注释，并删除 process.env.NODE_ENV !== "production"
  // basePath: !environment.production
  // basePath: import.meta.env.VITE_SERVE,
  // process.env.NODE_ENV !== 'production'
  //   ? BASE_PATH// 开发环境服务器接口地址
  //   : BASE_PATH, // 生产环境服务器接口地址
})

// token 键定义
export const accessTokenKey = STORAGE_TOKEN_KEY
export const refreshAccessTokenKey = `x-${accessTokenKey}`

// 清除 token
export const clearAccessTokens = () => {
  // window.localStorage.removeItem(accessTokenKey)
  // window.localStorage.removeItem(refreshAccessTokenKey)
  const userStore = useUserStore()
  userStore.clearUserInfo()
  // 这里可以添加清除更多 Key =========================================
}

// 错误处理
export const throwError = (message: string) => {
  throw new Error(message)
}

// export type RequestError = AxiosError<{
//   message?: string
//   result?: any
//   errorMessage?: string
// }>

// 异常拦截处理器
const errorHandler = (error: RequestError): Promise<any> => {
  if (error.response) {
    const { data = {}, status, statusText } = error.response
    // 403 无权限
    if (status === 403) {
      showNotify({
        type: 'danger',
        message: (data && data.message) || statusText,
      })
      location.replace('/login')
    }
    // 401 未登录/未授权
    if (status === 401 && data.result && data.result.isLogin) {
      showNotify({
        type: 'danger',
        message: 'Authorization verification failed',
      })
      // 如果你需要直接跳转登录页面
      location.replace('/login')
    }
  }
  return Promise.reject(error)
}

/**
 * axios 默认实例
 */
export const axiosInstance: AxiosInstance = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000, // 请求超时时间
})

// 这里可以配置 axios 更多选项 =========================================

// axios 请求拦截
axiosInstance.interceptors.request.use(
  (conf) => {
    // 获取本地的 token
    const accessToken = window.localStorage.getItem(accessTokenKey)
    if (accessToken) {
      // 将 token 添加到请求报文头中
      conf.headers!.Authorization = `Bearer ${accessToken}`
      // 判断 accessToken 是否过期
      const jwt: any = decryptJWT(accessToken)
      const exp = getJWTDate(jwt.exp as number)

      if (new Date() >= exp)
        clearAccessTokens()

      // token 已经过期
      // if (new Date() >= exp) {
      // 获取刷新 token
      // const refreshAccessToken = window.localStorage.getItem(
      //   refreshAccessTokenKey,
      // )

      // // 携带刷新 token
      // if (refreshAccessToken)
      //   conf.headers!['X-Authorization'] = `Bearer ${refreshAccessToken}`
      // }
    }
    // 这里编写请求拦截代码 =========================================
    return conf
  }, errorHandler,
  // (error) => {
  //   // 处理请求错误
  //   if (error.request) {
  //   }

  //   // 这里编写请求错误代码

  //   return Promise.reject(error)
  // },
)

// axios 响应拦截
axiosInstance.interceptors.response.use(
  (res) => {
    // 检查并存储授权信息
    // checkAndStoreAuthentication(res)
    // 处理规范化结果错误
    const serve = res.data
    if (serve && serve.hasOwnProperty('errors') && serve.errors) {
      // 处理规范化 401 授权问题
      if (serve.errors === '401 Unauthorized')
        clearAccessTokens()

      throwError(
        !serve.errors
          ? 'Request Error.'
          : typeof serve.errors === 'string'
            ? serve.errors
            : JSON.stringify(serve.errors),
      )
      return
    }
    // location.replace('/')
    // 这里编写响应拦截代码 =========================================

    return res
  },
  (error) => {
    // 处理响应错误
    if (error.response) {
      // 获取响应对象并解析状态码
      const res = error.response
      const status: number = res.status

      // 检查并存储授权信息
      // checkAndStoreAuthentication(res)
      // 检查 401 权限
      if (status === 401) {
        // clearAccessTokens()
        showNotify({
          type: 'danger',
          message: res.data && res.data.msg,
        })
      }

      // 403 无权限
      if (status === 403) {
        showNotify({
          type: 'danger',
          message: (res.data && res.data.msg) || res.statusText,
        })
        location.replace('/login')
      }
    }
    // 这里编写响应错误代码

    return Promise.reject(error)
  },
)

/**
 * 检查并存储授权信息
 * @param res 响应对象
 */
export function checkAndStoreAuthentication(res: any): void {
  // 读取响应报文头 token 信息
  // const accessToken = res.headers[accessTokenKey]
  const accessToken = res.data.msg
  // const refreshAccessToken = res.headers[refreshAccessTokenKey]
  // 判断是否是无效 token
  // if (accessToken === 'invalid_token')
  if (accessToken === '注销成功' || accessToken === '注销失败')
    clearAccessTokens()

  // 判断是否存在刷新 token，如果存在则存储在本地
  else if (accessToken && accessToken !== 'invalid_token'
  )
    window.localStorage.setItem(accessTokenKey, accessToken)
    // window.localStorage.setItem(refreshAccessTokenKey)
}

/**
 * 包装 Promise 并返回 [Error, any]
 * @param promise Promise 方法
 * @param errorExt 自定义错误信息（拓展）
 * @returns [Error, any]
 */
export function feature<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object,
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt)
        return [parsedError, undefined]
      }

      return [err, undefined]
    })
}

/**
 * 获取/创建服务 API 实例
 * @param apiType BaseAPI 派生类型
 * @param configuration 服务器配置对象
 * @param basePath 服务器地址
 * @param axiosObject axios 实例
 * @returns 服务API 实例
 */
export function getAPI<T extends BaseAPI>(
  apiType: new (
    configuration?: Configuration,
    basePath?: string,
    axiosInstance?: AxiosInstance
  ) => T,
  configuration: Configuration = serveConfig,
  basePath: string = BASE_PATH,
  axiosObject: AxiosInstance = axiosInstance,
) {
  return new apiType(configuration, basePath, axiosObject)
}

/**
 * 解密 JWT token 的信息
 * @param token jwt token 字符串
 * @returns <any>object
 */
export function decryptJWT(token: string): any {
  token = token.replace(/_/g, '/').replace(/-/g, '+')
  const json = decodeURIComponent(escape(window.atob(token.split('.')[1])))
  return JSON.parse(json)
}

/**
 * 将 JWT 时间戳转换成 Date
 * @description 主要针对 `exp`，`iat`，`nbf`
 * @param timestamp 时间戳
 * @returns Date 对象
 */
export function getJWTDate(timestamp: number): Date {
  return new Date(timestamp * 1000)
}
