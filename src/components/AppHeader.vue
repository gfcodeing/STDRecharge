<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo">
        <span class="logo-text">{{ t('nav.siteName') }}</span>
      </div>

      <nav class="nav-menu">
        <span class="nav-item" :class="{ 'is-active': currentPage === 'home' }" @click="$emit('navigate', 'home')">
          {{ t('nav.chatgpt') }}
        </span>
        <span class="nav-item" :class="{ 'is-active': currentPage === 'batch' }" @click="$emit('navigate', 'batch')">
          {{ t('nav.cardQuery') }}
        </span>
      </nav>

      <div class="actions">
        <!-- 语言切换按钮 -->
        <div class="lang-switch" @click="toggleLocale">
          <span :class="{ active: currentLocale === Locale.ZH_CN }">{{ t('lang.zh') }}</span>
          <span class="divider">/</span>
          <span :class="{ active: currentLocale === Locale.EN_US }">{{ t('lang.en') }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { LOCALE_STORAGE_KEY } from '../config.js'
import { Locale } from '../enums/status_enums.js'

defineProps({
  currentPage: { type: String, default: 'home' }
})
defineEmits(['navigate'])

const { t, locale } = useI18n()

const currentLocale = computed(() => locale.value)

function toggleLocale() {
  const newLocale = locale.value === Locale.ZH_CN ? Locale.EN_US : Locale.ZH_CN
  locale.value = newLocale
  localStorage.setItem(LOCALE_STORAGE_KEY, newLocale)
  document.documentElement.lang = newLocale === Locale.ZH_CN ? 'zh-CN' : 'en'
}
</script>

<style scoped>
.app-header {
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.nav-menu {
  display: flex;
  gap: 24px;
}

.nav-item {
  font-size: 14px;
  color: #666;
  cursor: pointer;
  padding: 4px 0;
}

.nav-item.is-active {
  color: #409eff;
  font-weight: 500;
}

.actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.lang-switch {
  cursor: pointer;
  font-size: 14px;
  color: #666;
  user-select: none;
  padding: 4px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.lang-switch span.active {
  color: #409eff;
  font-weight: 600;
}

.lang-switch .divider {
  margin: 0 4px;
  color: #dcdfe6;
}
</style>
