<template>
  <div class="input-container">
    <div class="input-wrapper">
      <textarea
        ref="textAreaRef"
        v-model="props.inputText"
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
        <el-icon class="send-icon" :size="30" ><Top /></el-icon>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { Top } from '@element-plus/icons-vue'

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
  },
  inputText: {
    type: String,
    default: ''
  }
})

const textAreaRef = ref(null)
const emit = defineEmits(['send'])

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
    inputText.value = ''

  }
}

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
  min-height: 130px;
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