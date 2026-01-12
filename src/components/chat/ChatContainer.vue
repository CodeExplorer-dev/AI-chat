<template>
  <div class="chat-container">
    <div class="messages-area">
      <div class="message-item assistant">
        <div class="message-wrapper">
          <div class="avatar assistant-avatar">AI</div>
          <div class="message-text">你好！我是 AI 助手，有什么可以帮助你的吗？</div>
        </div>
      </div>
      <div class="message-item user">
        <div class="message-wrapper">
          <div class="avatar user-avatar">U</div>
          <div class="message-text">你好，请介绍一下你自己</div>
        </div>
      </div>
    </div>
    <div class="input-area">
      <InputArea />
    </div>
  </div>
</template>

<script setup>
import InputArea from './InputArea.vue'
</script>

<style scoped>
.chat-container {
  flex: 1;
  height: 100%;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
}

.messages-area {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  background: grey;
}

.message-item {
  width: 100%;
  padding: 20px 0;
}

.message-item.user {
  background: #f7f7f8;
}

.message-wrapper {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  gap: 16px;
  padding: 0 20px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 14px;
  font-weight: bold;
  color: white;
}

.assistant-avatar {
  background: #10a37f;
}

.user-avatar {
  background: #5436da;
}

.message-text {
  flex: 1;
  line-height: 1.6;
  color: #374151;
  font-size: 20px;
}

.input-area {
  background: white;
  display: flex;
  /* justify-content: center; */
  max-width: 850px;
  margin: 0 auto;
  margin-bottom: 20px;
  width: 100%;
}
</style>