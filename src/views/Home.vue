<template>
  <div class="home-container">
    <el-card class="charge-card" shadow="always">
      <template #header>
        <div class="card-header">
          <span class="title">{{ t('step1.title') }}</span>
        </div>
      </template>

      <!-- 步骤条 -->
      <el-steps :active="currentStep" align-center style="margin-bottom: 30px">
        <el-step :title="t('steps.inputCardKey')" />
        <el-step :title="t('steps.inputAccount')" />
        <el-step :title="t('steps.confirmRecharge')" />
        <el-step :title="t('steps.complete')" />
      </el-steps>

      <!-- 第1步：输入卡密 -->
      <div v-show="currentStep === RechargeStep.INPUT_CARD_KEY" class="step-content">
        <el-alert type="warning" :closable="false" center class="notice-alert">
          <template #default>
            <div class="alert-box">
              <div class="alert-title">{{ t('step1.noticeTitle') }}</div>
              <div class="alert-divider"></div>
              <div class="alert-content">
                <p>{{ t('step1.noticeContent1') }}</p>
                <p>{{ t('step1.noticeContent2') }}</p>
              </div>
            </div>
          </template>
        </el-alert>
        <el-form class="card-form">
          <el-form-item>
            <el-input v-model="cardKey" size="large" :placeholder="t('step1.placeholder')" :disabled="loading" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="large" class="full-btn" :loading="loading" @click="handleQuery">
              {{ loading ? t('step1.querying') : t('step1.queryBtn') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 第2步：输入账号 -->
      <div v-show="currentStep === RechargeStep.INPUT_ACCOUNT" class="step-content">
        <div class="info-card mb-16">
          <div class="info-card-header">{{ t('cardInfo.title') }}</div>
          <div class="info-card-body">
            <div class="info-row">
              <span class="info-label">{{ t('cardInfo.appName') }}：</span>
              <span class="info-value">{{ cardInfo?.app_name || '-' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">{{ t('cardInfo.productName') }}：</span>
              <span class="info-value">{{ cardInfo?.product_name || '-' }}</span>
            </div>
          </div>
        </div>
        <el-alert type="info" :closable="false" center class="notice-alert">
          <template #default>
            <div class="alert-box">
              <div class="alert-title">{{ t('step2.usageTitle') }}</div>
              <div class="alert-divider" style="border-color: #409eff"></div>
              <div class="alert-content">
                <p>
                  {{ t('step2.usageDesc') }}
                  （<a href="https://chatgpt.com/auth/login" target="_blank">{{ t('step2.loginLink') }}</a>）
                  →
                  （<a href="https://chatgpt.com/api/auth/session" target="_blank">{{ t('step2.sessionLink') }}</a>）
                </p>
              </div>
            </div>
          </template>
        </el-alert>
        <el-form class="card-form">
          <p class="session-warning">{{ t('step2.warning') }}</p>
          <el-form-item>
            <el-input v-model="sessionContent" type="textarea" :rows="5" :placeholder="t('step2.placeholder')" :disabled="loading" />
          </el-form-item>
          <div class="btn-group">
            <el-button size="large" class="flex-btn" @click="currentStep = RechargeStep.INPUT_CARD_KEY">
              {{ t('step2.backBtn') }}
            </el-button>
            <el-button type="primary" size="large" class="flex-btn" :loading="loading" @click="handleVerify">
              {{ loading ? t('step2.verifying') : t('step2.verifyBtn') }}
            </el-button>
          </div>
        </el-form>
      </div>

      <!-- 第3步：确认充值 -->
      <div v-show="currentStep === RechargeStep.CONFIRM_RECHARGE" class="step-content">
        <div class="info-card mb-16">
          <div class="info-card-header">{{ t('cardInfo.title') }}</div>
          <div class="info-card-body">
            <div class="info-row">
              <span class="info-label">{{ t('cardInfo.appName') }}：</span>
              <span class="info-value">{{ cardInfo?.app_name || '-' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">{{ t('cardInfo.productName') }}：</span>
              <span class="info-value">{{ cardInfo?.product_name || '-' }}</span>
            </div>
          </div>
        </div>
        <div class="info-card mb-16">
          <div class="info-card-header">{{ t('step3.accountTitle') }}</div>
          <div class="info-card-body">
            <div class="info-row">
              <span class="info-label">{{ t('step3.planType') }}：</span>
              <span class="info-value">{{ accountInfo?.plan_type || '-' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">{{ t('step3.email') }}：</span>
              <span class="info-value">{{ accountInfo?.email || '-' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">{{ t('step3.userId') }}：</span>
              <span class="info-value">{{ accountInfo?.account_id || '-' }}</span>
            </div>
          </div>
        </div>
        <div class="btn-group">
          <el-button size="large" class="flex-btn" @click="currentStep = RechargeStep.INPUT_ACCOUNT">
            {{ t('step3.backBtn') }}
          </el-button>
          <el-button type="primary" size="large" class="flex-btn" :loading="loading" @click="handleCharge">
            {{ loading ? t('step3.charging') : t('step3.confirmBtn') }}
          </el-button>
        </div>
      </div>

      <!-- 第4步：完成 -->
      <div v-show="currentStep === RechargeStep.COMPLETE" class="step-content">
        <div class="info-card mb-16">
          <div class="info-card-header">{{ t('step4.resultTitle') }}</div>
          <div class="info-card-body result-center">
            <div v-if="chargeResult === RechargeResult.SUCCESS" class="result-success">
              <el-icon :size="64"><CircleCheckFilled /></el-icon>
              <div class="result-text">{{ t('step4.success') }}</div>
              <div class="result-tip">{{ t('step4.successTip') }}</div>
            </div>
            <div v-else class="result-fail">
              <el-icon :size="64"><CircleCloseFilled /></el-icon>
              <div class="result-text">{{ t('step4.fail') }}</div>
              <div class="result-tip">{{ chargeErrorMsg }}</div>
            </div>
          </div>
        </div>
        <div class="info-card mb-16">
          <div class="info-card-header">{{ t('step4.infoTitle') }}</div>
          <div class="info-card-body">
            <div class="info-row">
              <span class="info-label">{{ t('step4.appName') }}：</span>
              <span class="info-value">{{ cardInfo?.app_name || '-' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">{{ t('step4.chargeAccount') }}：</span>
              <span class="info-value">{{ accountInfo?.email || '-' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">{{ t('step4.chargeTime') }}：</span>
              <span class="info-value">{{ chargeTime }}</span>
            </div>
          </div>
        </div>
        <el-button type="primary" size="large" class="full-btn" @click="handleReset">
          {{ t('step4.backHome') }}
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { CircleCheckFilled, CircleCloseFilled } from '@element-plus/icons-vue'
import { RechargeStep, RechargeResult, CdkStatus } from '../enums/status_enums.js'
import { queryCard, checkAccount, chargeCard } from '../api.js'
import { translateBackendMsg } from '../utils/backend-msg.js'

const i18n = useI18n()
const { t } = i18n

const currentStep = ref(RechargeStep.INPUT_CARD_KEY)
const loading = ref(false)
const cardKey = ref('')

// URL 参数自动填充：?cdk=xxx 时自动填入卡密输入框
onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const cdkParam = params.get('cdk')
  if (cdkParam) {
    cardKey.value = cdkParam
  }
})
const sessionContent = ref('')
const cardInfo = ref(null)
const accountInfo = ref(null)
const chargeResult = ref(null)
const chargeErrorMsg = ref('')
const chargeTime = ref('')

// 第1步：查询卡密
async function handleQuery() {
  const secret = cardKey.value.replace(/\s+/g, '')
  if (!secret) {
    ElMessage.warning(t('step1.placeholder'))
    return
  }
  loading.value = true
  try {
    const data = await queryCard(secret)
    if (data.code !== 0) {
      ElMessage.error(translateBackendMsg(data.msg, i18n, 'error.queryFailed'))
      return
    }
    cardInfo.value = data.data
    const status = data.data.status
    if (status === CdkStatus.USED) {
      ElMessage.error(t('error.cdkUsed'))
      return
    }
    if (status === CdkStatus.DISABLED) {
      ElMessage.error(t('error.cdkDisabled'))
      return
    }
    if (status !== CdkStatus.UNUSED) {
      ElMessage.error(t('error.cdkUnavailable'))
      return
    }
    currentStep.value = RechargeStep.INPUT_ACCOUNT
  } catch {
    ElMessage.error(t('error.networkError'))
  } finally {
    loading.value = false
  }
}

// ===== 配置区 =====
// Team 账号 planType 值（用于前端预拦截，禁止 Team session 充值）
const TEAM_PLAN_TYPE = 'team'

/**
 * 检测 session 内容是否为 Team 账号
 * 支持两种格式：
 *   1. 完整 session JSON（检查 account.planType）
 *   2. JSON 中包含 accessToken 字段时，解码 JWT payload 检查 chatgpt_plan_type
 * @param {object} json - 已解析的 JSON 对象
 * @returns {boolean} true 表示是 Team 账号，应拦截
 */
function isTeamSession(json) {
  if (json?.account?.planType === TEAM_PLAN_TYPE) return true
  // JSON 中可能直接包含 accessToken 字段，继续检查 JWT
  const token = json?.accessToken
  if (token && isTeamJwt(token)) return true
  return false
}

/**
 * 解码 JWT payload 检查是否为 Team 账号
 */
function isTeamJwt(token) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return false
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
    const authInfo = payload['https://api.openai.com/auth']
    if (authInfo?.chatgpt_plan_type === TEAM_PLAN_TYPE) return true
  } catch {
    // 解码失败不拦截，交给后端处理
  }
  return false
}

// 第2步：验证账号
async function handleVerify() {
  const content = sessionContent.value.trim()
  if (!content) {
    ElMessage.warning(t('step2.placeholder'))
    return
  }
  // 前端预拦截：必须是合法 JSON
  let parsed
  try {
    parsed = JSON.parse(content)
  } catch {
    ElMessage.error(t('error.invalidJsonFormat'))
    return
  }
  // 前端预拦截：Team 账号不允许充值
  if (isTeamSession(parsed)) {
    ElMessage.error(t('error.teamSessionBlocked'))
    return
  }
  loading.value = true
  try {
    const data = await checkAccount(cardKey.value.replace(/\s+/g, ''), content)
    if (data.code !== 0) {
      ElMessage.error(translateBackendMsg(data.msg, i18n, 'error.verifyFailed'))
      return
    }
    accountInfo.value = data.data
    currentStep.value = RechargeStep.CONFIRM_RECHARGE
  } catch {
    ElMessage.error(t('error.networkError'))
  } finally {
    loading.value = false
  }
}

// 第3步：确认充值
async function handleCharge() {
  loading.value = true
  try {
    const data = await chargeCard(cardKey.value.replace(/\s+/g, ''), accountInfo.value.payload)
    chargeTime.value = new Date().toLocaleString()
    if (data.code !== 0) {
      chargeResult.value = RechargeResult.FAIL
      chargeErrorMsg.value = translateBackendMsg(data.msg, i18n, 'error.chargeFailed')
    } else {
      chargeResult.value = RechargeResult.SUCCESS
      chargeErrorMsg.value = ''
    }
    currentStep.value = RechargeStep.COMPLETE
  } catch {
    chargeResult.value = RechargeResult.FAIL
    chargeErrorMsg.value = t('error.networkError')
    currentStep.value = RechargeStep.COMPLETE
  } finally {
    loading.value = false
  }
}

// 第4步：返回首页重置
function handleReset() {
  currentStep.value = RechargeStep.INPUT_CARD_KEY
  cardKey.value = ''
  sessionContent.value = ''
  cardInfo.value = null
  accountInfo.value = null
  chargeResult.value = null
  chargeErrorMsg.value = ''
  chargeTime.value = ''
}
</script>

<style scoped>
.home-container {
  max-width: 700px;
  margin: 40px auto;
  padding: 0 20px;
}
.charge-card {
  border-radius: 12px;
}
.card-header {
  text-align: center;
}
.card-header .title {
  font-size: 20px;
  font-weight: 700;
  color: #333;
}
.notice-alert {
  margin-bottom: 24px;
}
.alert-box {
  text-align: center;
}
.alert-title {
  font-size: 16px;
  font-weight: 600;
  color: #e6a23c;
  margin-bottom: 8px;
}
.alert-divider {
  border-top: 1px dashed #e6a23c;
  margin: 8px 0;
}
.alert-content p {
  font-size: 13px;
  color: #666;
  line-height: 1.8;
  margin: 4px 0;
}
.alert-content a {
  color: #409eff;
  text-decoration: none;
}
.alert-content a:hover {
  text-decoration: underline;
}
.card-form {
  margin-top: 20px;
}
.session-warning {
  color: #f56c6c;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 12px;
}
.full-btn {
  width: 100%;
}
.btn-group {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}
.flex-btn {
  flex: 1;
}
.mb-16 {
  margin-bottom: 16px;
}
.info-card {
  border: 1px solid #ebeef5;
  border-radius: 8px;
  overflow: hidden;
}
.info-card-header {
  background: #f5f7fa;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #ebeef5;
}
.info-card-body {
  padding: 16px;
}
.info-row {
  display: flex;
  padding: 8px 0;
  font-size: 14px;
}
.info-label {
  color: #909399;
  min-width: 90px;
}
.info-value {
  color: #333;
  font-weight: 500;
}
.result-center {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 16px;
}
.result-success {
  text-align: center;
  color: #67c23a;
}
.result-fail {
  text-align: center;
  color: #f56c6c;
}
.result-text {
  font-size: 18px;
  font-weight: 700;
  margin-top: 12px;
}
.result-tip {
  font-size: 13px;
  color: #909399;
  margin-top: 8px;
}
</style>