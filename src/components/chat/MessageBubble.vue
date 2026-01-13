<template>
<div class="message-bubble" :class="role">
  <div class="message-content">
    {{ content }}
  </div>
  <div v-if="showOperations" class="message-operations">
    <button @click="$emit('copy')">复制</button>
    <button @click="$emit('regenerate')">重试</button>
  </div>
</div>
</template>

<script setup>
const props = defineProps({
  role: {
    type: String,
    default: 'user'
  },
  content: {
    type: String,
    default: 'asd'
  },
  showOperations: {
    type: Boolean,
    default: false
  }
})

defineEmits(['copy', 'regenerate'])
</script>

<style scoped>
/* 核心：让气泡自适应内容 */
.message-bubble {
  max-width: 80%;
  min-width: 60px;
  width: fit-content; /* 关键属性 */
  width: -moz-fit-content; /* Firefox 兼容 */
  padding: 10px 14px;
  margin: 8px;
  border-radius: 12px;
  position: relative;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  line-height: 1.5;
}

/* 用户消息 */
.message-bubble.user {
  margin-left: auto;
  background: #409eff;
  color: white;
  border-bottom-right-radius: 4px;
}

/* AI消息 */
.message-bubble.assistant {
  margin-right: auto;
  background: #f0f2f5;
  color: #1f1f1f;
  border-bottom-left-radius: 4px;
}

/* 内容区域 - 自动扩展 */
.message-content {
  display: inline-block;
  font-size: 20px;
  max-width: 100%;
}

/* 操作按钮 */
.message-operations {
  display: flex;
  gap: 6px;
  margin-top: 8px;
  justify-content: flex-end;
}

.message-operations button {
  padding: 2px 8px;
  font-size: 12px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
}

.message-operations button:hover {
  background: #f5f5f5;
}
</style>