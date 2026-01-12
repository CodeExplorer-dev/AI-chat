<template>
  <div class="aside">
    <div class="aside-header">
      <span>AI Chat</span>
      <button class="collapse-button" ><el-icon size="30"><Open /></el-icon></button>
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
</template>

<script setup>
import { ref } from 'vue'
import { Open, Plus } from '@element-plus/icons-vue'

const handleNewChat = () => {
  console.log('新对话')
}
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  border: none;
}

.aside {
  height: 100%;
  width: 350px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  background: #f5f5f5;
  border-right: 1px solid #e5e7eb;
}

.aside-header {
  width: 100%;
  padding: 5px;
  font-size: 30px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  color: #374151;

  .collapse-button{
    font-size: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #374151;
  }
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
  transition: background 0.2s;
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
}

:deep(.el-menu-item:hover) {
  background: #e5e7eb;
}

:deep(.el-menu-item.is-active) {
  background: #d1d5db;
}
</style>