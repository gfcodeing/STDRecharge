/**
 * API 请求封装（接口请求工具）
 */
import { API_BASE_URL, REQUEST_TIMEOUT } from './config.js'

/**
 * 通用 POST 请求
 * @param {string} path - 接口路径（如 /home/card/query）
 * @param {object} payload - 请求体
 * @returns {Promise<object>} 响应JSON
 */
export async function post(path, payload) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    })
    clearTimeout(timeoutId)
    return await response.json()
  } catch (err) {
    clearTimeout(timeoutId)
    if (err.name === 'AbortError') {
      throw new Error('TIMEOUT')
    }
    throw err
  }
}

/**
 * 查询卡密状态
 * POST /api/home/card/query
 * @param {string} secret - 卡密字符串
 */
export function queryCard(secret) {
  return post('/home/card/query', { secret })
}

/**
 * 验证ChatGPT账号
 * POST /api/home/chatgpt/check
 * @param {string} secret - 卡密字符串
 * @param {string} content - accessToken 或 session JSON
 */
export function checkAccount(secret, content) {
  return post('/home/chatgpt/check', { secret, content })
}

/**
 * 执行充值
 * POST /api/home/card/charge
 * @param {string} secret - 卡密字符串
 * @param {string} payload - 加密后的账号信息
 */
export function chargeCard(secret, payload) {
  return post('/home/card/charge', { secret, payload })
}

/**
 * 批量查询卡密状态
 * POST /api/home/card/batch_query
 * @param {string[]} secrets - 卡密数组
 */
export function batchQueryCards(secrets) {
  return post('/home/card/batch_query', { secrets })
}
