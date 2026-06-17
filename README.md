# 燕中校友数字母港 - 微信小程序

燕中校友数字母港的微信小程序端。与 Web 端（[web_yanchuaner](https://github.com/yanchuaner/web_yanchuaner)）共享同一套后端 API，为校友提供更便捷的移动端入口。

## 核心功能

- 电子校友纪念卡（生成/展示/保存到相册）
- 校友通讯录检索（搜索 + 城市分布地图）
- 活动浏览与在线报名
- 微信订阅消息推送（新活动/新闻通知）

## 技术栈

- **框架**: Taro 3.x（React + TypeScript）
- **样式**: weapp-tailwindcss 插件
- **API**: 复用 Web 端 `https://yanchuaner.cn/api/*`
- **鉴权**: HMAC-SHA256 token + wx.Storage

## 快速开始

```bash
npm install -g @tarojs/cli
cd web_projects/miniapp_yanchuaner
npm install
npm run dev:weapp
```

## 项目结构（规划）

```
miniapp_yanchuaner/
├── src/
│   ├── pages/           # 页面（校友证/通讯录/活动/我的）
│   ├── components/      # 通用组件
│   ├── hooks/           # 自定义 Hook（useAuth/useApi）
│   └── lib/             # 工具（api 封装/鉴权）
├── package.json
└── project.config.json  # 微信小程序配置
```

## 相关项目

- [web_yanchuaner](https://github.com/yanchuaner/web_yanchuaner) — Web 端（Next.js）
