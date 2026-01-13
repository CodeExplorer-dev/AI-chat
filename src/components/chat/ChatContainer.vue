<template>
  <div class="chat-container">
    <div class="messages-area">
      <div class="message-item assistant">
        <div class="message-wrapper">
          <message-bubble role="assistant" />
        </div>
      </div>
      <div class="message-item user">
        <div class="message-wrapper">
          <message-bubble role="user" />
        </div>
      </div>

      <div v-for="item in messages" class="message-item" :class="item.role">
        <div class="message-wrapper">
          <message-bubble :role="item.role" :content="item.content"/>
        </div>
      </div>
    </div>
    <div class="input-area">
      <InputArea />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import InputArea from './InputArea.vue'
import MessageBubble from './MessageBubble.vue';

const messages = ref([
  {
    role: "assistant",
    content: "我是你的AI助手，你有什么问题"
  },
  {
    role: "user",
    content: "你说啥"
  },
])

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
  /* background: grey; */
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