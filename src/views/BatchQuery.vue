<template>
  <div class="batch-container">
    <h2 class="page-title">{{ t('batch.title') }}</h2>

    <!-- 输入区 -->
    <el-input
      v-model="inputText"
      type="textarea"
      :rows="6"
      :placeholder="t('batch.placeholder')"
      :disabled="loading"
    />

    <!-- 按钮区 -->
    <div class="btn-group">
      <el-button size="large" class="flex-btn" @click="handleReset" :disabled="loading">
        {{ t('batch.resetBtn') }}
      </el-button>
      <el-button type="primary" size="large" class="flex-btn" :loading="loading" @click="handleQuery">
        {{ loading ? t('batch.querying') : t('batch.queryBtn') }}
      </el-button>
    </div>

    <!-- 结果表格 -->
    <div class="result-section">
      <div class="result-header">
        <h3 class="result-title">{{ t('batch.resultTitle') }}</h3>
        <el-button v-if="resultList.length > 0" type="success" size="small" @click="handleExport">
          {{ t('batch.exportBtn') }}
        </el-button>
      </div>
      <el-table :data="resultList" border style="width: 100%" empty-text=" ">
        <el-table-column prop="secret" :label="t('batch.colSecret')" min-width="180" show-overflow-tooltip />
        <el-table-column :label="t('batch.colStatus')" width="100" align="center">
          <template #default="{ row }">
            <span :class="getStatusClass(row.status)">{{ getStatusText(row.status) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="app_name" :label="t('batch.colAppName')" width="120" align="center" />
        <el-table-column prop="product_name" :label="t('batch.colProductName')" width="120" align="center" />
        <el-table-column prop="used_at" :label="t('batch.colUsedAt')" width="180" align="center">
          <template #default="{ row }">
            {{ formatUsedAt(row.used_at) }}
          </template>
        </el-table-column>
        <el-table-column :label="t('batch.colAction')" width="130" align="center">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleCopy(row.secret)">
              {{ t('batch.copyBtn') }}
            </el-button>
            <el-button v-if="row.charge_info" link type="primary" size="small" @click="handleDetail(row)">
              {{ t('batch.detailBtn') }}
            </el-button>
          </template>
        </el-table-column>
        <template #empty>
          <span class="empty-text">{{ t('batch.noData') }}</span>
        </template>
      </el-table>
    </div>

    <!-- 详情弹窗 -->
    <el-dialog v-model="detailVisible" :title="t('batch.detailTitle')" width="450px">
      <div v-if="detailData" class="detail-content">
        <div class="detail-row">
          <span class="detail-label">{{ t('batch.detailEmail') }}：</span>
          <span class="detail-value">{{ detailData.email || '-' }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">{{ t('batch.detailAccountId') }}：</span>
          <span class="detail-value">{{ detailData.account_id || '-' }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">{{ t('batch.detailTime') }}：</span>
          <span class="detail-value">{{ formatTimestamp(detailData.timestamp) }}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { CdkStatus } from '../enums/status_enums.js'
import { batchQueryCards } from '../api.js'

// ===== 配置区 =====
// 单次最大查询数量（批量查询上限）
const MAX_BATCH_SIZE = 100

const { t } = useI18n()

const inputText = ref('')
const loading = ref(false)
const resultList = ref([])
const detailVisible = ref(false)
const detailData = ref(null)

function getStatusText(status) {
  if (status === CdkStatus.UNUSED) return t('cardInfo.statusUnused')
  if (status === CdkStatus.USED) return t('cardInfo.statusUsed')
  if (status === CdkStatus.DISABLED) return t('cardInfo.statusDisabled')
  return t('cardInfo.statusUnknown')
}

function getStatusClass(status) {
  if (status === CdkStatus.UNUSED) return 'status-unused'
  if (status === CdkStatus.USED) return 'status-used'
  if (status === CdkStatus.DISABLED) return 'status-disabled'
  return ''
}

async function handleQuery() {
  // 按换行分隔，去除每行首尾空格和中间空格，过滤空行
  const lines = inputText.value
    .split('\n')
    .map(s => s.replace(/\s+/g, ''))
    .filter(s => s.length > 0)

  if (lines.length === 0) {
    ElMessage.warning(t('batch.emptyInput'))
    return
  }
  if (lines.length > MAX_BATCH_SIZE) {
    ElMessage.warning(t('batch.maxLimit'))
    return
  }

  loading.value = true
  resultList.value = []

  try {
    const data = await batchQueryCards(lines)
    if (data.code !== 0) {
      ElMessage.error(data.msg || t('error.queryFailed'))
      return
    }
    resultList.value = data.data || []
  } catch {
    ElMessage.error(t('error.networkError'))
  } finally {
    loading.value = false
  }
}

function handleReset() {
  inputText.value = ''
  resultList.value = []
}

function handleCopy(text) {
  // 兼容非HTTPS环境的复制方案
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      ElMessage.success(t('batch.copied'))
    })
  } else {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    ElMessage.success(t('batch.copied'))
  }
}

function handleDetail(row) {
  try {
    detailData.value = JSON.parse(row.charge_info)
  } catch {
    detailData.value = { raw: row.charge_info }
  }
  detailVisible.value = true
}

function formatTimestamp(ts) {
  if (!ts) return '-'
  return new Date(ts).toLocaleString()
}

// 将ISO时间转为北京时间格式 yyyy-MM-dd HH:mm:ss
function formatUsedAt(isoStr) {
  if (!isoStr) return '-'
  const date = new Date(isoStr)
  const pad = (n) => String(n).padStart(2, '0')
  const y = date.getFullYear()
  const m = pad(date.getMonth() + 1)
  const d = pad(date.getDate())
  const h = pad(date.getHours())
  const min = pad(date.getMinutes())
  const s = pad(date.getSeconds())
  return `${y}-${m}-${d} ${h}:${min}:${s}`
}

function handleExport() {
  // CSV全字段导出
  const headers = [
    t('batch.colSecret'),
    t('batch.colStatus'),
    t('batch.colAppName'),
    t('batch.colProductName'),
    t('batch.colUsedAt'),
    t('batch.detailEmail')
  ]
  const rows = resultList.value.map(row => {
    let email = ''
    if (row.charge_info) {
      try {
        const info = JSON.parse(row.charge_info)
        email = info.email || ''
      } catch { /* ignore */ }
    }
    return [
      row.secret,
      getStatusText(row.status),
      row.app_name || '',
      row.product_name || '',
      formatUsedAt(row.used_at),
      email
    ]
  })

  // 加BOM头确保Excel正确识别中文
  const BOM = '\uFEFF'
  const csvContent = BOM + [
    headers.join(','),
    ...rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `card_query_${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.batch-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px;
}
.page-title {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-bottom: 24px;
}
.btn-group {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}
.flex-btn {
  flex: 1;
}
.result-section {
  margin-top: 24px;
}
.result-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 12px;
}
.result-title {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #409eff;
}
.empty-text {
  color: #909399;
}
.status-unused {
  color: #67c23a;
  font-weight: 500;
}
.status-used {
  color: #f56c6c;
  font-weight: 500;
}
.status-disabled {
  color: #909399;
  font-weight: 500;
}
.detail-content {
  padding: 8px 0;
}
.detail-row {
  display: flex;
  padding: 10px 0;
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
}
.detail-row:last-child {
  border-bottom: none;
}
.detail-label {
  color: #909399;
  min-width: 100px;
  flex-shrink: 0;
}
.detail-value {
  color: #333;
  word-break: break-all;
}
</style>
