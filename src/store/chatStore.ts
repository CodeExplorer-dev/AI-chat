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
  const addUserMessage = async (content: string) => {
    // 如果没有当前会话，创建一个
    if (!currentSession.value) {
      await createSession();
    }

    const sessionId = currentSessionId.value!

    const userMsg: Message = {
      id: generateMessageId(),
      session_id: sessionId,
      role: 'user',
      content: content,
      created_at: new Date(),
      status: 'sent'
    };
    console.log(userMsg)
    
    // 添加到当前会话
    currentSession.value.messages.push(userMsg)
    
    // 调用API
    try {
      const res = await sendMessageAPI(sessionId, content)
      console.log('当前消息：', res)
      const assistantMsg: Message = {
        id: generateMessageId(),
        session_id: sessionId,
        role: 'assistant',
        content: res.data.reply,
        created_at: new Date(),
        status: 'sent'
      }
      currentSession.value.messages.push(assistantMsg)
    } catch (error) {
      const errorMsg: Message = {
        id: generateMessageId(),
        session_id: sessionId,
        role: 'assistant',
        content: '请求失败，请重试',
        created_at: new Date(),
        status: 'error',
        errorMsg: error.message
      }
      currentSession.value.messages.push(errorMsg)
    }

   
  }

  const init = async () => {
    try {
      const res = await getAllSessions()
      sessions.value = res.data.map(item => ({
        ...item,
        messages: [],
        created_at: new Date(item.created_at),
        updated_at: new Date(item.updated_at)
      }))

      

      if (sessions.value.length > 0) {
        currentSessionId.value = sessions.value[0].id
        await loadMessages(sessions.value[0].id)
      }
    } catch (error) {
      await createSession()
    }
  }

  const loadMessages = async (sessionId: string) => {
    try {
      const res = await getSessionsHistoryById(sessionId)
      const session = sessions.value.find(s => s.id === sessionId)

      if (session) {
        session.messages = res.data.map(m => ({
          ...m,
          created_at: new Date(m.created_at),
          status: 'sent' as const
        }))
      }
    } catch (error) {
      console.error('加载消息失败:', error)
    }
  }

  // 切换会话
  const switchSession = async (sessionId: string) => {
    currentSessionId.value = sessionId
    const session = sessions.value.find(s => s.id === sessionId)
    if (session && session.messages.length === 0) {
      await loadMessages(sessionId)
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
    init,
    switchSession
  }
})