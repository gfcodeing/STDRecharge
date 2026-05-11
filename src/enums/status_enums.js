/**
 * 充值流程步骤状态枚举（充值步骤状态）
 */
export const RechargeStep = {
  // 输入卡密
  INPUT_CARD_KEY: 0,
  // 输入账号
  INPUT_ACCOUNT: 1,
  // 确认充值
  CONFIRM_RECHARGE: 2,
  // 完成
  COMPLETE: 3
}

/**
 * CDK状态枚举（卡密使用状态）
 */
export const CdkStatus = {
  // 禁用
  DISABLED: 0,
  // 未使用
  UNUSED: 1,
  // 已使用
  USED: 2
}

/**
 * 充值结果状态枚举（充值结果状态）
 */
export const RechargeResult = {
  // 成功
  SUCCESS: 'success',
  // 失败
  FAIL: 'fail'
}

/**
 * 支持的语言枚举（系统支持的语言列表）
 */
export const Locale = {
  // 简体中文
  ZH_CN: 'zh-CN',
  // 英文
  EN_US: 'en-US'
}
