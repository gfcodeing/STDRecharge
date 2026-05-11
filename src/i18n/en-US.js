export default {
  // Navigation
  nav: {
    home: 'Home',
    cardQuery: 'Card Query',
    chatgpt: 'ChatGPT',
    subLogin: 'Sub-account Login',
    siteName: 'Quick Recharge'
  },
  // Recharge steps
  steps: {
    inputCardKey: 'Enter Card Key',
    inputAccount: 'Enter Session',
    confirmRecharge: 'Confirm',
    complete: 'Done'
  },
  // Step 1 - Enter card key
  step1: {
    title: 'Online Recharge',
    noticeTitle: 'Notice',
    noticeContent1: 'Please make sure you have cancelled your subscription before recharging, otherwise there may be subscription conflicts!',
    noticeContent2: 'Note: Recharge card keys are not universal. Please contact customer service if you need a priority card key.',
    placeholder: 'Please enter your recharge card key',
    queryBtn: 'Query Card Key',
    querying: 'Querying...'
  },
  // Step 2 - Enter session
  step2: {
    usageTitle: 'Instructions',
    usageDesc: 'Login to official site → Get session',
    loginLink: 'Go to login',
    sessionLink: 'Get session',
    placeholder: 'Please enter your session info or accessToken',
    warning: 'Do NOT use a Team session for recharging',
    verifyBtn: 'Verify Account',
    verifying: 'Verifying...',
    backBtn: 'Go Back'
  },
  // Step 3 - Confirm recharge
  step3: {
    accountTitle: 'Account Info',
    planType: 'Current Plan',
    email: 'Email',
    userId: 'User ID',
    confirmBtn: 'Confirm Recharge',
    charging: 'Processing...',
    backBtn: 'Go Back'
  },
  // Step 4 - Complete
  step4: {
    resultTitle: 'Result',
    success: 'Recharge Successful!',
    successTip: 'Please check your account for the update',
    fail: 'Recharge Failed!',
    infoTitle: 'Account Info',
    appName: 'App Name',
    chargeAccount: 'Charged Account',
    chargeTime: 'Charge Time',
    backHome: 'Back to Home'
  },
  // Card info
  cardInfo: {
    title: 'Card Info',
    appName: 'App Name',
    productName: 'Product Tier',
    status: 'Status',
    statusUnused: 'Unused',
    statusUsed: 'Used',
    statusDisabled: 'Disabled',
    statusUnknown: 'Unknown'
  },
  // Error messages
  error: {
    queryFailed: 'Query failed',
    cdkUnavailable: 'CDK unavailable',
    cdkUsed: 'This card key has been used',
    cdkDisabled: 'This card key has been disabled',
    cdkNotFound: 'Card key not found',
    verifyFailed: 'Account verification failed',
    tokenExpired: 'accessToken has expired',
    tokenInvalid: 'Invalid accessToken format',
    tokenMissingUserId: 'accessToken is missing user id. Please log in manually to get a new token, or contact admin',
    teamSessionBlocked: 'Team account session detected. Team accounts are not supported for recharging. Please use a personal account',
    invalidJsonFormat: 'Invalid session format. Please paste the complete JSON content',
    chargeFailed: 'Recharge failed',
    networkError: 'Network error, please try again later'
  },
  // Footer
  footer: {
    copyright: 'Copyright © 2026 Inventory Management System. All Rights Reserved.'
  },
  // Language switch
  lang: {
    zh: '中文',
    en: 'EN'
  },
  // Batch query page
  batch: {
    title: 'Batch Card Query',
    placeholder: 'Enter card keys to query, one per line (max 100 at a time)',
    resetBtn: 'Clear',
    queryBtn: 'Start Query',
    querying: 'Querying...',
    resultTitle: 'Results',
    colSecret: 'Card Key',
    colStatus: 'Status',
    colAppName: 'App Name',
    colProductName: 'Product Tier',
    colUsedAt: 'Used At',
    colAction: 'Action',
    noData: 'No data',
    copyBtn: 'Copy',
    copied: 'Copied',
    detailBtn: 'Detail',
    detailTitle: 'Charge Detail',
    detailEmail: 'Email',
    detailAccountId: 'Account ID',
    detailTime: 'Charge Time',
    maxLimit: 'Max 100 card keys per query',
    emptyInput: 'Please enter at least one card key',
    exportBtn: 'Export CSV'
  }
}
