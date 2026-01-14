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
let mediaQuery = null

// 切换侧边栏
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  console.log('当前：', isCollapsed.value?'折叠':'打开')
}

const handleMediaChange = (e) => {
  console.log(e)
  if (e.matches) {
    // 屏幕宽度 <= 768px，自动折叠侧边栏
    if (!isCollapsed.value) {
      isCollapsed.value = true
      console.log('屏幕变小，自动折叠侧边栏')
    }
  } else {
    // 屏幕宽度 > 768px，自动展开侧边栏（可选）
    isCollapsed.value = false
    console.log('屏幕变大，自动展开侧边栏')
  }
}

// 初始化媒体查询
const initMediaQuery = () => {
  // 设置断点，例如 768px
  mediaQuery = window.matchMedia('(max-width: 768px)')
  // console.log(mediaQuery.matches) // true 或 false
  
  // 添加监听
  mediaQuery.addEventListener('change', handleMediaChange)
  
  // 初始检查
  handleMediaChange(mediaQuery)
}

onMounted(() => {
  initMediaQuery()
})

onUnmounted(() => {
  if (mediaQuery) {
    // 移除监听（在组件卸载时）
    mediaQuery.removeEventListener('change', handleMediaChange)
  }
})

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