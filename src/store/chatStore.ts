import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Message, Session } from '@/types/message'
import { getAllSessions, createSession as createSessionAPI } from '@/api/session'
import { getSessionsHistoryById, chat as sendMessageAPI } from '@/api/message'
import { ElMessage } from 'element-plus'

export const useChatStore = defineStore('chat', () => {
  // 状态
  const sessions = ref<Session[]>([])
  const currentSessionId = ref<string | null>(null)
  
  // 计算属性
  // 当前的对话
  const currentSession = computed(() => {
    return sessions.value.find(session => session.id === currentSessionId.value)
  })

  // 当前的消息列表
  const currentMessages = computed(() => {
    return currentSession.value?.messages || []
  })

  // 生成会话标题
  const generateSessionTitle = (content: string) => {
    if (content.length <= 20) return content
    return content.substring(0, 20) + '...'
  }

 // 生成 Session UUID
  const generateSessionId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // 生成 Message ID
  const generateMessageId = () => {
    return Date.now()
  }

  // 创建新会话
  const createSession = async () => {
    try {
      const res = await createSessionAPI()
      const newSession: Session = {
        id: res.data.id,
        title: res.data.title,
        messages: [],
        created_at: new Date(),
        updated_at: new Date()
      }
      sessions.value.push(newSession)
      currentSessionId.value = newSession.id
      console.log(sessions)
      return newSession
    } catch (error) {
      ElMessage.error('创建会话失败')
      throw error
    }
  }

  // 添加用户消息
  const addUserMessage = (content: string) => {
    // 如果没有当前会话，创建一个
    if (!currentSession.value) {
      createSession();
    }

    const message: Message = {
      id: generateMessageId(),
      session_id: currentSessionId.value!,
      role: 'user',
      content: content,
      created_at: new Date(),
      status: 'sent'
    };

    // 添加到当前会话
    const session = currentSession.value // 当前会话
    if (session) {
      session.messages.push(message)
      session.updated_at = new Date()

      // 如果是第一条消息，设置标题
      if (session.messages.length === 1) {
        session.title = generateSessionTitle(content)
      }

      // 模拟AI回复
      simulateAIResponse()
    }

    return message
  }

  // 模拟AI回答
  const simulateAIResponse = () => {
    const session = currentSession.value

    const aiMessage: Message = {
      id: generateMessageId(),
      session_id: session.id,
      role: 'assistant',
      content: '你好',
      created_at: new Date(),
      status: 'loading'
    }

    session.messages.push(aiMessage)
    session.updated_at = new Date()

  }


  const init = () => {
    // 如果没有会话，创建一个
    if (sessions.value.length === 0) {
      createSession()
    }
    
    // 如果没有当前会话，选择第一个
    if (!currentSessionId.value && sessions.value.length > 0) {
      currentSessionId.value = sessions.value[0].id
    }
  }

  return {
    // 属性
    sessions,
    currentSessionId,
    // 计算属性
    currentSession,
    currentMessages,
    // 方法
    // 方法
    createSession,
    addUserMessage,
    init
  }
})