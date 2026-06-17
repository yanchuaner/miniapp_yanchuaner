import { View, Text } from '@tarojs/components'
import './events.scss'

export default function EventsPage() {
  return (
    <View className='events-page'>
      <View className='card p-6'>
        <Text className='text-brand-fg text-xl font-semibold'>
          校友活动
        </Text>
        <Text className='text-gray-400 mt-2'>
          浏览和报名参加校友活动
        </Text>
      </View>
    </View>
  )
}
