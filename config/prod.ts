import type { UserConfigExport } from '@tarojs/cli'

export default {
  logger: {
    quiet: true,
    stats: false,
  },
  mini: {},
  h5: {
    // 确保 h5 构建时所有资源引用路径正确
    publicPath: './',
  },
} satisfies UserConfigExport
