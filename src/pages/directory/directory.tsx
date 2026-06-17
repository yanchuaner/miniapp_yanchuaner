import { View, Text } from '@tarojs/components'
import './directory.scss'

export default function DirectoryPage() {
  return (
    <View className='directory-page'>
      <View className='card p-6'>
        <Text className='text-brand-fg text-xl font-semibold'>
          校友通讯录
        </Text>
        <Text className='text-gray-400 mt-2'>
          搜索和浏览校友信息
        </Text>
      </View>
    </View>
  )
}
