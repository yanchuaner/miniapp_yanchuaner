import { Component, PropsWithChildren } from 'react'
import Taro from '@tarojs/taro'
import './app.css'
import './app.scss'

class App extends Component<PropsWithChildren> {
  componentDidMount() {
    // 检查登录状态：从 Storage 读取 token
    Taro.checkSession({
      success: () => {
        console.log('[App] 微信会话有效')
      },
      fail: () => {
        console.log('[App] 微信会话已过期，需要重新登录')
        Taro.removeStorageSync('yc_access_token')
      },
    })
  }

  // 对应 onShow
  componentDidShow() {}

  // 对应 onHide
  componentDidHide() {}

  // 对应 onError
  componentCatchError(err: Error) {
    console.error('[App] 全局错误:', err)
  }

  render() {
    return this.props.children
  }
}

export default App
