// ============================================================
// 微信一键登录页
// 点击按钮 → wx.login() → /api/auth/wechat-login → 存储 token
// ============================================================

import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useAuth } from '@/hooks/useAuth'
import './login.scss'

export default function LoginPage() {
  const { isLoggedIn, login } = useAuth()

  // 已登录自动跳到首页
  if (isLoggedIn) {
    Taro.switchTab({ url: '/pages/index/index' })
    return null
  }

  const handleLogin = async () => {
    const success = await login()
    if (success) {
      Taro.switchTab({ url: '/pages/index/index' })
    } else {
      Taro.showToast({ title: '登录失败，请重试', icon: 'none' })
    }
  }

  return (
    <View className='login-page'>
      {/* 品牌区域 */}
      <View className='login-brand'>
        <View className='login-icon'>
          <Text className='login-icon-text'>燕</Text>
        </View>
        <Text className='login-title'>燕中校友数字母港</Text>
        <Text className='login-subtitle'>
          连接毕业校友、在校生与老师的公益数字平台
        </Text>
      </View>

      {/* 登录按钮区 */}
      <View className='login-action'>
        <View className='glass-card login-card'>
          <Text className='login-card-title'>微信一键登录</Text>
          <Text className='login-card-desc'>
            授权后即可访问校友通讯录、纪念卡、活动报名等功能
          </Text>
          <Button className='btn-primary login-btn' onTap={handleLogin}>
            <Text className='login-btn-text'>微信用户一键登录</Text>
          </Button>
          <Text className='login-card-hint'>
            点击即表示同意《用户服务协议》和《隐私政策》
          </Text>
        </View>
      </View>

      {/* 底部 */}
      <View className='login-footer'>
        <Text className='login-footer-text'>
          想要获取口令，请关注校友会微信公众号「燕中校友汇」
        </Text>
      </View>
    </View>
  )
}
