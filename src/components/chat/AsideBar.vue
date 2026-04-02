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
          :default-active="currentSessionId"
          class="el-menu-vertical-demo"
          @select="handleSelectSession"
        >
          <el-menu-item 
            v-for="session in sessions" 
            :key="session.id" 
            :index="session.id"
            class="title_container"
          >
            <span>{{ session.title }}</span>
            <el-tooltip
              placement="bottom-start"
              effect="light"
              popper-class="title_more"
            >
              <template #content>
                <div class="more_container">
                  <el-button @click="rename(session)">重命名</el-button>
                  <el-button type="danger" @click="remove(session.id)" plain >删除</el-button>
                </div>
              </template>
              <el-icon><MoreFilled /></el-icon>
            </el-tooltip>
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
import { Fold, Expand, Plus, MoreFilled } from '@element-plus/icons-vue'
import { useChatStore } from '@/store/chatStore'
import { computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { updateSessionTitle } from '@/api/session';

defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle'])

const chatStore = useChatStore()
const sessions = computed(() => chatStore.sessions)
const currentSessionId = computed(() => chatStore.currentSessionId)
const { createSession, switchSession } = chatStore


// const isCollapsed = ref(false)
// const toggleSlide = () => {
//   isCollapsed.value = !isCollapsed.value
// }

const handleNewChat = () => {
  console.log('新对话')
  createSession()
}

const handleSelectSession = async (index) => {
  await switchSession(index)
}

// 重命名方法
const rename = async (session) => {
  try {
    const { value: newTitle } = await ElMessageBox.prompt('请输入新的会话名称', '重命名', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      inputValue: session.title,
      inputPlaceholder: '请输入新名称',
      inputValidator: (newTitle) => {
        if (!newTitle || newTitle.trim() === '') {
          return '名称不能为空'
        }
        if (newTitle.length > 50) {
          return '名称不能超过50个字符'
        }
        return true
      }
    })
    
    // 如果名称没有变化，不执行重命名
    if (newTitle === session.title) {
      return
    }
    
    const sessionId = session.id
    console.log(sessionId)
    console.log('新标题：', newTitle)
    
  } catch (error) {
    if (error !== 'cancel') {
      console.error('重命名出错:', error)
    }
  }
}

const remove = async (sessionId) => {
  try {
    await ElMessageBox.confirm(
      '确定删除此对话吗？',
      'Warning',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    
    // 用户确认删除
    console.log('删除：', sessionId)
    
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    
  } catch (error) {
    if (error === 'cancel') {
      ElMessage({
        type: 'info',
        message: '已取消删除',
      })
    } else if (error === 'close') {
      console.log('用户点击了关闭按钮')
    }
  }
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

.title_container {
  display: flex;
  justify-content: space-between;
}

.title_more {
  padding: 4px 0;
  .more_container {
    display: flex;
    flex-direction: column;

    .el-button {
      margin: 0;
      border-radius: 4px;
      justify-content: flex-start;
      padding: 10px 16px;
      font-size: 18px;
    }
  }
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