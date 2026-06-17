// ============================================================
// 我的页 — 用户信息 + 退出登录
// ============================================================

import { View, Text, Button } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import './mine.scss'

export default function MinePage() {
  const { isLoggedIn, checking, logout } = useAuth()
  const [ready, setReady] = useState(false)

  useDidShow(() => {
    setReady(true)
  })

  if (!ready || checking) {
    return null
  }

  if (!isLoggedIn) {
    Taro.redirectTo({ url: '/pages/login/login' })
    return null
  }

  const handleLogout = () => {
    Taro.showModal({
      title: '退出登录',
      content: '确定要退出吗？退出后需重新微信授权登录',
      confirmColor: '#7C3AED',
      success: (res) => {
        if (res.confirm) {
          logout()
          Taro.redirectTo({ url: '/pages/login/login' })
        }
      },
    })
  }

  return (
    <View className='mine-page'>
      {/* 用户头像区 */}
      <View className='mine-header'>
        <View className='header-bg' />
        <View className='mine-avatar'>
          <Text className='avatar-text'>燕</Text>
        </View>
        <Text className='mine-name'>校友，你好</Text>
        <Text className='mine-subtitle'>欢迎回到燕中校友数字母港</Text>
      </View>

      {/* 功能列表 */}
      <View className='mine-content'>
        <View className='card mine-section'>
          <View className='mine-item' hoverClass='mine-item-hover'>
            <Text className='mine-item-icon'>🎓</Text>
            <Text className='mine-item-label'>我的纪念卡</Text>
            <Text className='mine-item-arrow'>›</Text>
          </View>
          <View className='mine-item' hoverClass='mine-item-hover'>
            <Text className='mine-item-icon'>📋</Text>
            <Text className='mine-item-label'>报名记录</Text>
            <Text className='mine-item-arrow'>›</Text>
          </View>
          <View className='mine-item' hoverClass='mine-item-hover'>
            <Text className='mine-item-icon'>ℹ️</Text>
            <Text className='mine-item-label'>关于燕中校友会</Text>
            <Text className='mine-item-arrow'>›</Text>
          </View>
        </View>

        {/* 退出登录 */}
        <View className='mine-logout'>
          <Button className='btn-secondary logout-btn' onTap={handleLogout}>
            <Text className='logout-btn-text'>退出登录</Text>
          </Button>
        </View>
      </View>

      {/* 底部 */}
      <View className='mine-footer'>
        <Text className='footer-text'>
          深圳市燕川中学校友会 · 公益数字平台
        </Text>
      </View>
    </View>
  )
}
