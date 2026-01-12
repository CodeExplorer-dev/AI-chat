<template>
  <div class="input-container">
    <div class="input-wrapper">
      <textarea
        ref="textAreaRef"
        v-model="inputText"
        class="text-input"
        :placeholder="placeholder"
        @keydown.enter="handleEnter"
        :rows="3"
        :maxlength="maxLength"
        :disabled="disabled"
      ></textarea>
      
      <!-- 发送按钮 -->
      <button 
        class="send-button"
        @click="handleSend"
        :disabled="!inputText.trim() || disabled"
      >
        <svg class="send-icon" viewBox="0 0 24 24">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: '输入消息...'
  },
  maxLength: {
    type: Number,
    default: 1000
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['send'])

const textAreaRef = ref(null)
const inputText = ref('')

// 处理输入事件，调整高度
// const handleInput = () => {
//   adjustHeight()
// }

// 处理回车键
const handleEnter = (e) => {
  if (!e.shiftKey && inputText.value.trim()) {
    e.preventDefault()
    handleSend()
  }
}

// 发送消息
const handleSend = () => {
  if (inputText.value.trim() && !props.disabled) {
    console.log(inputText.value)
    // emit('send', inputText.value.trim())
    inputText.value = ''
    // adjustHeight()
  }
}

// 调整输入框高度
// const adjustHeight = () => {
//   nextTick(() => {
//     if (textAreaRef.value) {
//       console.log(textAreaRef.value)
//       textAreaRef.value.style.height = 'auto'
//       const newHeight = Math.min(textAreaRef.value.scrollHeight, 120)
//       textAreaRef.value.style.height = `${newHeight}px`
//     }
//   })
// }

// 初始化高度
// watch(() => inputText.value, adjustHeight)
</script>

<style scoped>
.input-container {
  width: 100%;
  max-width: 850px;
}

.input-wrapper {
  display: flex;
  align-items: flex-end;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background: white;
  padding: 12px 16px;
  gap: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.input-wrapper:focus-within {
  border-color: #10a37f;
  box-shadow: 0 2px 8px rgba(16, 163, 127, 0.1);
}

.text-input {
  flex: 1;
  min-height: 24px;
  max-height: 200px;
  padding: 0;
  border: none;
  outline: none;
  resize: none;
  font-size: 20px;
  line-height: 1.5;
  font-family: inherit;
  background: transparent;
  color: #374151;
}

.text-input::placeholder {
  color: #9ca3af;
}

.text-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-button {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: #10a37f;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
}

.send-button:hover:not(:disabled) {
  background: #0d8c6d;
  transform: scale(1.05);
}

.send-button:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.send-icon {
  width: 18px;
  height: 18px;
  fill: currentColor;
}
</style>