import { createI18n } from 'vue-i18n'
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY } from '../config.js'
import zhCN from './zh-CN.js'
import enUS from './en-US.js'

// 从 localStorage 读取用户语言偏好，无则使用默认语言
const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) || DEFAULT_LOCALE

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

export default i18n
