<template>
  <!-- 主容器 -->
  <div class="message-container" :class="role">
    <!-- 消息气泡 -->
    <div class="message-bubble" :class="role">
      <div class="message-content">
        {{ message }}
      </div>
    </div>

    <!-- 操作按钮（根据角色定位） -->
    <div v-if="showOperations" class="message-operations" :class="role">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="复制"
        placement="bottom"
      >
        <el-button @click="$emit('copy')" class="operation-btn"><el-icon><CopyDocument /></el-icon></el-button>
      </el-tooltip>

      <el-tooltip
        class="box-item"
        effect="dark"
        content="重新生成"
        placement="bottom"
      >
        <el-button @click="$emit('regenerate')" class="operation-btn"><el-icon><Refresh /></el-icon></el-button>
    </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import { CopyDocument, Refresh } from '@element-plus/icons-vue'

const props = defineProps({
  role: {
    type: String,
    default: 'user'
  },
  message: {
    type: String,
    default: '默认消息'
  },
  showOperations: {
    type: Boolean,
    default: true
  }
})

defineEmits(['copy', 'regenerate'])
</script>

<style scoped>
/* 主容器 - 用于定位气泡和操作按钮 */
.message-container {
  display: flex;
  flex-direction: column;
  margin: 8px 0;
  position: relative;
}

/* 用户消息容器 - 右对齐 */
.message-container.user {
  align-items: flex-end;
  margin-left: auto;
}

/* AI消息容器 - 左对齐 */
.message-container.assistant {
  align-items: flex-start;
  margin-right: auto;
}

/* 气泡样式 */
.message-bubble {
  max-width: 80%;
  min-width: 60px;
  width: fit-content;
  width: -moz-fit-content; /* Firefox 兼容 */
  padding: 10px 14px;
  border-radius: 12px;
  position: relative;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  line-height: 1.5;
}

/* 用户消息 */
.message-bubble.user {
  background: #409eff;
  color: white;
  border-bottom-right-radius: 4px;
}

/* AI消息 */
.message-bubble.assistant {
  background: #f0f2f5;
  color: #1f1f1f;
  border-bottom-left-radius: 4px;
}

/* 内容区域 */
.message-content {
  display: inline-block;
  font-size: 20px;
  max-width: 100%;
}

/* 操作按钮容器 */
.message-operations {
  display: flex;
  gap: 6px;
  margin-top: 4px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

/* 鼠标悬停时显示操作按钮 */
.message-container:hover .message-operations {
  opacity: 1;
}

/* AI消息操作按钮 - 左下角 */
.message-operations.assistant {
  justify-content: flex-start;
  margin-left: 4px;
}

/* 用户消息操作按钮 - 右下角 */
.message-operations.user {
  justify-content: flex-end;
  margin-right: 4px;
}

/* 按钮样式 */
.operation-btn {
  padding: 2px 8px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.operation-btn .el-icon {
  display: flex;
  align-items: center; 
  justify-content: center; 
  font-size: 20px; 
}

.operation-btn:hover {
  background: #f5f5f5;
  border-color: #409eff;
}

/* 添加hover效果到气泡 */
.message-bubble {
  transition: transform 0.2s ease;
}

.message-container:hover .message-bubble {
  transform: translateY(-2px);
}
</style>