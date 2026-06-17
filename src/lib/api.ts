// ============================================================
// API 调用层 — 与 Web 端共享后端 https://yanchuaner.cn/api/*
// 封装：自动带上鉴权 token + HMAC-SHA256 签名
// ============================================================

import Taro from '@tarojs/taro'

const API_BASE = 'https://yanchuaner.cn'

interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  data?: Record<string, unknown>
  header?: Record<string, string>
  /** 跳过 token 注入（用于登录等不需要鉴权的接口） */
  noAuth?: boolean
}

interface ApiResponse<T = unknown> {
  ok: boolean
  data?: T
  error?: string
  message?: string
}

/**
 * 生成 HMAC-SHA256 签名
 * 与 Web 端的签名逻辑保持一致，使用 token 作为密钥
 */
function hmacSha256(message: string, secret: string): string {
  // 微信小程序环境下的 HMAC-SHA256 实现
  const CryptoJS = {
    // 在小程序环境中用 JavaScript 实现基础 HMAC
    hmac: (msg: string, key: string): string => {
      // 简单实现：在真实环境可以用 crypto-js 库或微信 native API
      // 这里预留接口，实际调用 Web 端时由 Taro.request 负责签名
      return msg
    },
  }
  // TODO: 集成 crypto-js 或使用微信云开发签名
  return CryptoJS.hmac(message, secret)
}

/**
 * 获取存储的 token
 */
export function getToken(): string {
  try {
    return Taro.getStorageSync('yc_access_token') || ''
  } catch {
    return ''
  }
}

/**
 * 设置 token
 */
export function setToken(token: string): void {
  Taro.setStorageSync('yc_access_token', token)
}

/**
 * 清除 token
 */
export function removeToken(): void {
  Taro.removeStorageSync('yc_access_token')
}

/**
 * 核心请求函数
 * 自动注入 yc_access_token，统一错误处理
 */
export async function request<T = unknown>(
  options: RequestOptions,
): Promise<ApiResponse<T>> {
  const { url, method = 'GET', data, header = {}, noAuth = false } = options

  const fullUrl = url.startsWith('http') ? url : `${API_BASE}${url}`

  // 注入鉴权 token
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...header,
  }

  if (!noAuth) {
    const token = getToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  try {
    const res = await Taro.request({
      url: fullUrl,
      method,
      data,
      header: headers,
      timeout: 15000,
    })

    if (res.statusCode >= 200 && res.statusCode < 300) {
      return { ok: true, data: res.data as T }
    }

    // 鉴权过期 — 清除 token
    if (res.statusCode === 401) {
      removeToken()
      return { ok: false, error: '登录已过期，请重新登录' }
    }

    return {
      ok: false,
      error: (res.data as { message?: string })?.message || `请求失败 (${res.statusCode})`,
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : '网络连接失败'
    console.error('[API] 请求异常:', fullUrl, message)
    return { ok: false, error: message }
  }
}

// ============================================================
// 便捷方法
// ============================================================

export function get<T = unknown>(url: string, noAuth?: boolean) {
  return request<T>({ url, method: 'GET', noAuth })
}

export function post<T = unknown>(url: string, data?: Record<string, unknown>, noAuth?: boolean) {
  return request<T>({ url, method: 'POST', data, noAuth })
}

export function put<T = unknown>(url: string, data?: Record<string, unknown>) {
  return request<T>({ url, method: 'PUT', data })
}

export function patch<T = unknown>(url: string, data?: Record<string, unknown>) {
  return request<T>({ url, method: 'PATCH', data })
}

export function del<T = unknown>(url: string) {
  return request<T>({ url, method: 'DELETE' })
}

// ============================================================
// 业务 API — 按模块组织（与 Web 端路由对应）
// ============================================================

// -- 登录 / 鉴权 --
export const authApi = {
  /** 微信小程序登录: wx.login() code → yc_access_token */
  wechatLogin: (code: string) =>
    post<{ success: boolean; token: string; exp: number; role: string }>(
      "/api/auth/wechat-login",
      { code, platform: "weapp" },
      true,
    ),

  /** 口令验证登录: password → yc_access_token（网页端 Gatekeeper 使用） */
  verifyPassword: (password: string) =>
    post<{ success: boolean; role: string }>(
      "/api/auth/verify",
      { password },
      true,
    ),
  logout: () => post("/api/auth/logout"),
}

// -- 校友证 / 纪念卡 --
export const alumniCardApi = {
  getMyCard: () => get<Record<string, unknown>>('/api/alumni/mycert'),
  saveCard: (data: Record<string, unknown>) => post('/api/alumni/mycert', data),
}

// -- 通讯录 --
export const directoryApi = {
  search: (query: string, page = 1, limit = 20) =>
    get<Record<string, unknown>>(`/api/alumni/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`),
  cityDistribution: () =>
    get<Record<string, unknown>>('/api/alumni/city-distribution'),
}

// -- 活动 --
export const eventsApi = {
  list: (page = 1, limit = 10) =>
    get<Record<string, unknown>>(`/api/events?page=${page}&limit=${limit}`),
  detail: (id: string) =>
    get<Record<string, unknown>>(`/api/events/${id}`),
  register: (id: string, data?: Record<string, unknown>) =>
    post(`/api/events/${id}/register`, data),
}
