# 在线充值系统 - 开发文档

## 项目概述

基于 Vue 3 + Element Plus 的在线充值页面，支持中英文国际化。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue 3 | 3.4.21 | 前端框架 |
| Vite | 5.1.6 | 构建工具 |
| Element Plus | 2.6.3 | UI组件库 |
| vue-i18n | 9.10.2 | 国际化 |

## 项目结构

```
src/
├── main.js              # 应用入口
├── App.vue              # 根组件（布局）
├── config.js            # 配置项（API地址、超时等）
├── i18n/
│   ├── index.js         # i18n 初始化
│   ├── zh-CN.js         # 中文语言包
│   └── en-US.js         # 英文语言包
├── views/
│   └── Home.vue         # 充值主页面
├── components/
│   └── AppHeader.vue    # 顶部导航栏
└── enums/
    └── status_enums.js  # 状态枚举定义
```

## 快速开始

```bash
npm install
npm run dev
```

## 国际化说明

### 添加新文本

1. 在 `src/i18n/zh-CN.js` 添加中文
2. 在 `src/i18n/en-US.js` 添加对应英文
3. 在组件中使用 `t('key.path')` 引用

### 语言切换

- 用户点击 Header 右侧的 `中文/EN` 按钮切换
- 语言偏好保存在 localStorage，刷新后保持

## 配置项

所有可配置项集中在 `src/config.js`，包含中文注释说明。

## 枚举管理

所有状态枚举定义在 `src/enums/status_enums.js`，包括：
- `RechargeStep` - 充值流程步骤
- `RechargeResult` - 充值结果状态
- `Locale` - 支持的语言

## 充值流程（4步）

1. **输入卡密** - 用户输入充值卡密码，点击查询（已实现）
2. **输入账号** - 输入目标账号信息（待实现）
3. **确认充值** - 展示信息确认（待实现）
4. **完成** - 显示充值结果（待实现）

## 后端接口（待对接）

| 接口 | 方法 | 说明 |
|------|------|------|
| /api/card/query | POST | 查询卡密信息 |
| /api/account/verify | POST | 验证账号 |
| /api/recharge/confirm | POST | 确认充值 |
