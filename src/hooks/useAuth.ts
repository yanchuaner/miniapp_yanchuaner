// ============================================================
// 鉴权 Hook — 管理 yc_access_token 的获取/存储/刷新
// 与 Web 端的 Gatekeeper + verify-token 机制一致
// ============================================================

import { useState, useEffect, useCallback } from 'react'
import Taro from '@tarojs/taro'
import { getToken, setToken, removeToken, authApi } from '@/lib/api'

interface AuthState {
  /** 是否已登录 */
  isLoggedIn: boolean
  /** 是否正在检查登录状态 */
  checking: boolean
  /** 当前 token */
  token: string
}

/**
 * 微信小程序一键登录
 * 流程: wx.login → /api/auth/wechat-login → 存储 token
 */
export function useAuth(): AuthState & {
  login: () => Promise<boolean>
  logout: () => void
} {
  const [state, setState] = useState<AuthState>({
    isLoggedIn: false,
    checking: true,
    token: '',
  })

  // 启动时检查登录状态
  useEffect(() => {
    checkLogin()
  }, [])

  const checkLogin = useCallback(async () => {
    setState(s => ({ ...s, checking: true }))

    const storedToken = getToken()
    if (storedToken) {
      // token 存在即视为已登录（7 天有效期内）
      setState({ isLoggedIn: true, checking: false, token: storedToken })
      return
    }
    setState({ isLoggedIn: false, checking: false, token: '' })
  }, [])

  // 微信登录流程
  const login = useCallback(async (): Promise<boolean> => {
    try {
      // 1. 调用 wx.login 获取 code
      const wxLoginRes = await Taro.login()
      if (!wxLoginRes.code) {
        console.error('[useAuth] wx.login 失败')
        return false
      }

      // 2. 拿 code → 后端 wechat-login
      const res = await authApi.wechatLogin(wxLoginRes.code)
      if (res.ok && res.data?.token) {
        setToken(res.data.token)
        setState({ isLoggedIn: true, checking: false, token: res.data.token })
        return true
      }

      console.error('[useAuth] 后端登录返回错误:', res.error)
      return false
    } catch (err) {
      console.error('[useAuth] 登录异常:', err)
      return false
    }
  }, [])

  // 登出
  const logout = useCallback(() => {
    authApi.logout()
    removeToken()
    setState({ isLoggedIn: false, checking: false, token: '' })
  }, [])

  return { ...state, login, logout }
}

/**
 * 获取当前 token（非 Hook 版本，可在普通函数中使用）
 */
export function getStoredToken(): string {
  return getToken()
}
