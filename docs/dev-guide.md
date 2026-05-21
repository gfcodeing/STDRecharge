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

### URL 路径语言前缀

支持通过 URL 路径前缀强制指定语言（优先级高于 localStorage）：

| 路径 | 语言 |
|------|------|
| `app.wqll.cn/en` 或 `/en/*` | 英文 `en-US` |
| `app.wqll.cn/zh` 或 `/zh/*` | 中文 `zh-CN` |
| 其他路径 | 按 localStorage，若无则走 `DEFAULT_LOCALE` |

优先级规则：**URL 路径前缀 > localStorage > 默认语言**。命中前缀时会写回 localStorage，即「URL 优先且持久化」——用户后续再访问不带前缀的链接时仍保持该语言，直到手动切换。

前缀映射配置在 `src/config.js` 的 `LOCALE_PATH_PREFIX_MAP`，解析逻辑在 `src/i18n/index.js` 的 `resolveInitialLocale()`。

Nginx 需要 SPA fallback（`try_files $uri $uri/ /index.html;`），确保 `/en`、`/zh` 这类非真实静态资源路径能回退到 `index.html`——当前 `nginx.conf` 已满足，无需调整。

## 配置项

所有可配置项集中在 `src/config.js`，包含中文注释说明。

## 枚举管理

所有状态枚举定义在 `src/enums/status_enums.js`，包括：
- `RechargeStep` - 充值流程步骤
- `RechargeResult` - 充值结果状态
- `Locale` - 支持的语言

## 后端错误信息国际化

后端 `data.msg` 统一返回中文（如 `卡密不存在`、`accessToken 已过期`）。前端在非中文语言下按关键词匹配翻译：

- 映射规则配置在 `src/config.js` 的 `BACKEND_MSG_I18N_RULES`
- 翻译工具在 `src/utils/backend-msg.js` 的 `translateBackendMsg()`
- 中文环境直接返回原 msg；非中文命中规则返回 i18n 文案；未命中 fallback 原 msg（避免丢信息）
- 新增后端错误时：在 `BACKEND_MSG_I18N_RULES` 加一条 `{ match, key }`，并在 `zh-CN.js` / `en-US.js` 的 `error` 下补齐对应 key

## URL 参数自动填充

支持通过 URL 的 `?cdk=` 参数自动填入卡密输入框，方便外部链接直接跳转并预填卡密。

| 示例 URL | 效果 |
|----------|------|
| `app.wqll.cn/?cdk=ABCD-1234` | 打开页面时卡密输入框自动填入 `ABCD-1234` |

实现位置：`src/views/Home.vue` `onMounted` 钩子，使用 `URLSearchParams` 读取 `cdk` 参数。

## 充值流程（4步）

1. **输入卡密** - 用户输入充值卡密码，点击查询（已实现）
2. **输入session** - 输入 session/accessToken 信息（已实现）
3. **确认充值** - 展示信息确认（已实现）
4. **完成** - 显示充值结果（已实现）

## 后端接口（已对接）

| 接口 | 方法 | 说明 |
|------|------|------|
| /api/home/card/query | POST | 查询卡密信息 |
| /api/home/chatgpt/check | POST | 验证 session/accessToken |
| /api/home/card/charge | POST | 执行充值 |
| /api/home/card/batch_query | POST | 批量查询卡密状态 |
