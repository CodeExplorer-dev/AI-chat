<template>
<div class="app-container">
  <!-- 侧边栏 -->
  <AsideBar :is-collapsed="isCollapsed" @toggle="toggleSidebar" />
  <!-- <AsideBar /> -->

  <!-- 主内容区域 -->
  <main class="main-content" :class="{ 'collapsed': isCollapsed }">
    <ChatContainer />
  </main>
</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, provide } from 'vue'
import AsideBar from './AsideBar.vue'
import ChatContainer from './ChatContainer.vue'

const isCollapsed = ref(false)

// 切换侧边栏
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  console.log('当前：', isCollapsed.value?'折叠':'打开')
}
</script>

<style scoped>
.app-container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* 主内容区域 */
.main-content {
  flex: 1;
  height: 100vh;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  margin-left: 350px;

  &.collapsed {
    margin-left: 0;
  }
}


</style>