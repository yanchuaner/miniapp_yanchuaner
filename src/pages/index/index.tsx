// ============================================================
// 首页 — 校友信息 + 快捷入口
// 与 Web 端首页风格一致：品牌紫渐变头部 + 毛玻璃卡片
// ============================================================

import { View, Text, Image } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import GlassCard from '@/components/GlassCard'
import './index.scss'

export default function IndexPage() {
  const { isLoggedIn, checking } = useAuth()
  const [ready, setReady] = useState(false)

  useDidShow(() => {
    setReady(true)
  })

  // 等待检查登录状态
  if (!ready || checking) {
    return (
      <View className='index-loading'>
        <View className='loading-spinner' />
        <Text className='loading-text'>正在进入燕中校友数字母港...</Text>
      </View>
    )
  }

  // 未登录 → 跳转登录页
  if (!isLoggedIn) {
    Taro.redirectTo({ url: '/pages/login/login' })
    return null
  }

  return (
    <View className='index-page'>
      {/* 头部品牌区 */}
      <View className='index-header'>
        <View className='header-bg' />
        <Text className='header-title'>燕中校友数字母港</Text>
        <Text className='header-subtitle'>YANCHUANER ALUMNI HUB</Text>
      </View>

      {/* 校友纪念卡入口 */}
      <View className='index-content'>
        <GlassCard className='index-card-main'>
          <View className='card-main-icon'>
            <Text className='card-main-icon-text'>🎓</Text>
          </View>
          <Text className='card-main-title'>电子校友纪念卡</Text>
          <Text className='card-main-desc'>
            生成专属校友纪念卡，保存到相册或分享给同学
          </Text>
          <View className='btn-primary card-main-btn'>
            <Text className='card-main-btn-text'>查看我的纪念卡</Text>
          </View>
        </GlassCard>

        {/* 快捷入口 */}
        <View className='index-quick-grid'>
          <View className='card quick-item' hoverClass='quick-item-hover'>
            <Text className='quick-icon'>📇</Text>
            <Text className='quick-label'>校友通讯录</Text>
          </View>
          <View className='card quick-item' hoverClass='quick-item-hover'>
            <Text className='quick-icon'>🎉</Text>
            <Text className='quick-label'>校友活动</Text>
          </View>
          <View className='card quick-item' hoverClass='quick-item-hover'>
            <Text className='quick-icon'>📰</Text>
            <Text className='quick-label'>校友新闻</Text>
          </View>
          <View className='card quick-item' hoverClass='quick-item-hover'>
            <Text className='quick-icon'>📍</Text>
            <Text className='quick-label'>城市分布</Text>
          </View>
        </View>
      </View>

      {/* 底部提示 */}
      <View className='index-footer'>
        <Text className='footer-text'>
          深圳市燕川中学校友会 · 公益数字平台
        </Text>
      </View>
    </View>
  )
}
