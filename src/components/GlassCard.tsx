// ============================================================
// 通用组件 — GlassCard 毛玻璃卡片
// 与 Web 端 GlassCard 组件风格一致
// ============================================================

import { View, ViewProps } from '@tarojs/components'

interface GlassCardProps extends ViewProps {
  children?: React.ReactNode
  className?: string
}

export default function GlassCard({ children, className = '', ...props }: GlassCardProps) {
  return (
    <View className={`glass-card ${className}`} {...props}>
      {children}
    </View>
  )
}
