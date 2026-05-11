// ===== 配置区 =====

// API基础地址（API接口地址，直接请求甲方服务器）
export const API_BASE_URL = 'https://k.171mail.com/api'

// 服务商实际地址（用于Vite代理目标，甲方服务器）
export const API_TARGET = 'https://k.171mail.com'

// 请求超时时间（毫秒）（接口请求最大等待时间）
export const REQUEST_TIMEOUT = 30000

// payload有效期提示（分钟）（充值payload过期时间）
export const PAYLOAD_EXPIRE_MINUTES = 10

// 默认语言（默认语言设置，支持 'zh-CN' | 'en-US'）
export const DEFAULT_LOCALE = 'zh-CN'

// 语言存储Key（localStorage中保存语言偏好的键名）
export const LOCALE_STORAGE_KEY = 'app_locale'

// 站点名称（网站标题）
export const SITE_NAME = '快速充值通道'
