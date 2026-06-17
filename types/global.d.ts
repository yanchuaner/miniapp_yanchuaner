// types/global.d.ts — Taro 全局类型扩展

/// <reference types="@tarojs/taro" />

declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.styl'

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV: 'weapp' | 'h5' | 'alipay' | 'swan' | 'tt' | 'qq' | 'jd' | 'harmony'
    NODE_ENV: 'development' | 'production'
    API_BASE_URL: string
  }
}

// Taro 4.x 页面配置类型
declare function definePageConfig(config: Record<string, unknown>): Record<string, unknown>
declare function defineAppConfig(config: Record<string, unknown>): Record<string, unknown>
