export default {
  // 导航栏
  nav: {
    home: '首页',
    cardQuery: '卡密查询',
    chatgpt: 'ChatGPT',
    subLogin: '子账号登录',
    siteName: '快速充值通道'
  },
  // 充值流程步骤
  steps: {
    inputCardKey: '输入卡密',
    inputAccount: '输入session',
    confirmRecharge: '确认充值',
    complete: '完成'
  },
  // 第1步 - 输入卡密
  step1: {
    title: '在线充值',
    noticeTitle: '注意事项',
    noticeContent1: '充值前请先确保已经取消订阅，否则可能存在订阅冲突！',
    noticeContent2: '注意：充值卡密不通用，如需要免排队卡密请联系客服。',
    placeholder: '请输入充值卡密',
    queryBtn: '查询卡密',
    querying: '查询中...'
  },
  // 第2步 - 输入账号
  step2: {
    usageTitle: '使用流程',
    usageDesc: '登录官网 → 获取 session',
    loginLink: '点击跳转',
    sessionLink: '点击获取',
    placeholder: '请输入获取到的 session 信息或者 accessToken',
    verifyBtn: '验证账号',
    verifying: '验证中...',
    backBtn: '返回修改'
  },
  // 第3步 - 确认充值
  step3: {
    accountTitle: '账号信息',
    planType: '当前档位',
    email: '账号邮箱',
    userId: '账号编号',
    confirmBtn: '确认充值',
    charging: '充值中...',
    backBtn: '返回修改'
  },
  // 第4步 - 完成
  step4: {
    resultTitle: '充值结果',
    success: '充值成功!',
    successTip: '请自行检查账号是否到账',
    fail: '充值失败!',
    infoTitle: '账号信息',
    appName: '应用名称',
    chargeAccount: '充值账号',
    chargeTime: '充值时间',
    backHome: '返回首页'
  },
  // 卡密信息
  cardInfo: {
    title: '卡密信息',
    appName: '应用名称',
    productName: '商品档位',
    status: '状态',
    statusUnused: '未使用',
    statusUsed: '已使用',
    statusDisabled: '已禁用',
    statusUnknown: '未知'
  },
  // 错误提示
  error: {
    queryFailed: '查询失败',
    cdkUnavailable: 'CDK不可用',
    cdkUsed: '该卡密已被使用',
    cdkDisabled: '该卡密已被禁用',
    cdkNotFound: '卡密不存在',
    verifyFailed: '账号验证失败',
    tokenExpired: 'accessToken 已过期',
    tokenInvalid: 'accessToken 格式无效',
    tokenMissingUserId: 'accessToken 缺少 id，请手动登录获取 token 或联系管理员',
    chargeFailed: '充值失败',
    networkError: '网络错误，请稍后重试'
  },
  // 页脚
  footer: {
    copyright: 'Copyright © 2026 库存管理系统. All Rights Reserved.'
  },
  // 语言切换
  lang: {
    zh: '中文',
    en: 'EN'
  },
  // 批量查询页
  batch: {
    title: '卡密批量查询',
    placeholder: '请输入需要查询的卡密，多个卡密请使用换行分隔（一次最多查询100个）',
    resetBtn: '清空重置',
    queryBtn: '开始查询',
    querying: '查询中...',
    resultTitle: '查询结果',
    colSecret: '卡密',
    colStatus: '状态',
    colAppName: '应用名称',
    colProductName: '商品档位',
    colUsedAt: '使用时间',
    colAction: '操作',
    noData: '暂无数据',
    copyBtn: '复制',
    copied: '已复制',
    detailBtn: '详情',
    detailTitle: '充值详情',
    detailEmail: '充值邮箱',
    detailAccountId: '账号ID',
    detailTime: '充值时间',
    maxLimit: '一次最多查询100个卡密',
    emptyInput: '请输入至少一个卡密',
    exportBtn: '导出CSV'
  }
}
