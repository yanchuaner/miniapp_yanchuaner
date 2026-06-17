// ============================================================
// 通用组件 — EmptyState 空状态占位
// 与 Web 端 EmptyState 组件风格一致
// ============================================================

import { View, Text } from '@tarojs/components'

interface EmptyStateProps {
  title?: string
  description?: string
  className?: string
}

export default function EmptyState({
  title = '暂无数据',
  description = '',
  className = '',
}: EmptyStateProps) {
  return (
    <View className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <View className='w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mb-4'>
        <Text className='text-brand text-2xl'>—</Text>
      </View>
      <Text className='text-brand-fg text-lg font-medium'>{title}</Text>
      {description && (
        <Text className='text-gray-400 text-sm mt-2'>{description}</Text>
      )}
    </View>
  )
}
