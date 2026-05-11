import { createI18n } from 'vue-i18n'
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, LOCALE_PATH_PREFIX_MAP } from '../config.js'
import zhCN from './zh-CN.js'
import enUS from './en-US.js'

/**
 * 根据 URL 路径前缀解析语言（访问 /en 或 /en/* 强制英文，/zh 或 /zh/* 强制中文）
 * 优先级：URL 路径前缀 > localStorage > 默认语言
 * 命中路径前缀时会写回 localStorage，实现「URL 优先且持久化」
 */
function resolveInitialLocale() {
  const pathname = window.location.pathname || '/'
  for (const [prefix, locale] of Object.entries(LOCALE_PATH_PREFIX_MAP)) {
    if (pathname === prefix || pathname.startsWith(prefix + '/')) {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale)
      return locale
    }
  }
  return localStorage.getItem(LOCALE_STORAGE_KEY) || DEFAULT_LOCALE
}

const initialLocale = resolveInitialLocale()

// 同步 html lang 属性，利于 SEO 与无障碍
document.documentElement.lang = initialLocale === 'zh-CN' ? 'zh-CN' : 'en'

const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

export default i18n
