<template>
  <div class="app-layout">
    <AppHeader :current-page="currentPage" @navigate="currentPage = $event" />
    <main class="main-content">
      <Home v-show="currentPage === 'home'" />
      <BatchQuery v-show="currentPage === 'batch'" />
    </main>
    <footer class="app-footer">
      <p>{{ t('footer.copyright') }}</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppHeader from './components/AppHeader.vue'
import Home from './views/Home.vue'
import BatchQuery from './views/BatchQuery.vue'

const { t } = useI18n()
const currentPage = ref('home')
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f7fa;
  min-height: 100vh;
}

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 20px 0;
}

.app-footer {
  text-align: center;
  padding: 20px;
  color: #999;
  font-size: 13px;
  border-top: 1px solid #eee;
  background: #fff;
}
</style>
