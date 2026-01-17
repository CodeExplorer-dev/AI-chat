<template>
  <div class="input-container">
    <div class="input-wrapper">
      <textarea
        ref="textAreaRef"
        v-model="localInputText"
        class="text-input"
        :placeholder="placeholder"
        :rows="3"
        :maxlength="maxLength"
        :disabled="disabled"
        @input="emitUpdate"
      ></textarea>
      
      <!-- 发送按钮 -->
      <button 
        class="send-button"
        @click="handleSend"
        :disabled="!localInputText.trim() || disabled"
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
  modelValue: { // 使用 Vue 3 标准命名
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'send'])

// 本地响应式变量
const textAreaRef = ref(null)
const localInputText = ref(props.modelValue)

// 监听父组件的值变化
watch(() => props.modelValue, (newVal) => {
  localInputText.value = newVal
})

// 更新父组件的值
const emitUpdate = () => {
  emit('update:modelValue', localInputText.value)
}

// 发送消息
const handleSend = () => {
  if (localInputText.value.trim() && !props.disabled) {
    emit('send')
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