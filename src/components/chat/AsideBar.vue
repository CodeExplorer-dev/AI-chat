<template>
  <Transition name="slide">
    <div v-show="!isCollapsed" class="aside">
      <div class="aside-header">
        <span>AI Chat</span>
        <button class="collapse-button" @click="emit('toggle')" title="收起">
          <el-icon :size="30"><Fold /></el-icon>
        </button>
      </div>

      <button class="new-chat-btn" @click="handleNewChat">
        <el-icon><Plus /></el-icon>
        <span>新对话</span>
      </button>

      <div class="aside-menu">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="1">
            <template #title>对话 1</template>
          </el-menu-item>
          <el-menu-item index="2">
            <template #title>对话 2</template>
          </el-menu-item>
          <el-menu-item index="3">
            <template #title>对话 3</template>
          </el-menu-item>
          <el-menu-item index="4">
            <template #title>对话 4</template>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
  </Transition>

  <div v-show="isCollapsed" class="aside_collapsed">
    <button class="collapse-button" @click="emit('toggle')" title="打开">
      <el-icon :size="30"><Expand  /></el-icon>
    </button>
  </div>
</template>

<script setup>
import { Fold, Expand, Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'


defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle'])

// const isCollapsed = ref(false)
// const toggleSlide = () => {
//   isCollapsed.value = !isCollapsed.value
// }

const handleNewChat = () => {
  console.log('新对话')
}
</script>

<style scoped lang="scss">
/* 侧边栏滑动动画 */
.slide-enter-active {
  animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-leave-active {
  animation: slideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
}

/* 侧边栏样式 */
.aside {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 350px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  background: #f5f5f5;
  border-right: 1px solid #e5e7eb;
  z-index: 999;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}

.aside-header {
  width: 100%;
  padding: 5px;
  font-size: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  color: #374151;
}

.collapse-button {
  font-size: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #374151;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  transition: all 0.2s;
}

.collapse-button:hover {
  background: #e5e7eb;
}

.aside_collapsed {
  border-radius: 8px;
  height: fit-content;
  min-height: 40px;
  background: #f5f5f5;
  position: absolute;
  top: 15px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}

.new-chat-btn {
  width: 100%;
  padding: 12px 15px;
  margin: 10px auto;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  background: white;
  color: #374151;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 20px;
  transition: all 0.2s;
}

.new-chat-btn:hover {
  background: #e5e7eb;
}

.new-chat-btn svg {
  width: 16px;
  height: 16px;
}

.aside-menu {
  flex: 1;
  overflow-y: auto;
  padding: 0 10px;
  margin-top: 10px;
}

:deep(.el-menu) {
  background: transparent;
  border: none;
}

:deep(.el-menu-item) {
  color: #374151;
  border-radius: 5px;
  margin-bottom: 5px;
  font-size: 20px;
  transition: all 0.2s;
}

:deep(.el-menu-item:hover) {
  background: #e5e7eb;
  transform: translateX(4px);
}

:deep(.el-menu-item.is-active) {
  background: #d1d5db;
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .aside {
    width: 300px;
    padding: 8px;
  }

  .aside-header {
    font-size: 24px;
    padding: 10px;
  }

  .new-chat-btn {
    font-size: 18px;
    padding: 10px 12px;
  }

  :deep(.el-menu-item) {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .aside {
    width: 100%;
    max-width: 320px;
  }
}
</style>