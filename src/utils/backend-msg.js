/**
 * 后端错误信息国际化工具
 *
 * 后端 msg 统一返回中文，本工具按 BACKEND_MSG_I18N_RULES 关键词匹配翻译。
 * 原则：
 *   1. 中文语言下直接返回原 msg，不做任何处理，避免误改
 *   2. 非中文语言下按规则匹配，命中则返回对应 i18n 文案；未命中 fallback 原 msg
 *      （保证后端新增错误文案时，英文端至少还能看到中文原文，不丢信息）
 *   3. 若后端未返回 msg，返回 fallback i18n 文案
 */
import { BACKEND_MSG_I18N_RULES } from '../config.js'
import { Locale } from '../enums/status_enums.js'

/**
 * 将后端返回的 msg 翻译为当前语言
 * @param {string|undefined} msg       - 后端返回的 msg（通常为中文）
 * @param {{ t: Function, locale: { value: string } }} i18n - vue-i18n 的 useI18n() 返回值
 * @param {string} fallbackKey         - msg 为空或未命中规则时的兜底 i18n key
 * @returns {string}
 */
export function translateBackendMsg(msg, i18n, fallbackKey) {
  const { t, locale } = i18n

  // msg 为空：直接用 fallback key
  if (!msg) return t(fallbackKey)

  // 中文环境：原样返回
  if (locale.value === Locale.ZH_CN) return msg

  // 非中文环境：按规则匹配
  for (const rule of BACKEND_MSG_I18N_RULES) {
    if (msg.includes(rule.match)) {
      return t(rule.key)
    }
  }

  // 未命中：fallback 到原 msg（保留信息，优于显示空白）
  return msg
}
