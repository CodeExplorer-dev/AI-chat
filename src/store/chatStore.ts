import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Message, Conversation } from '@/types/message'

export const useChatStore = defineStore('chat', () => {
  // 状态
  const conversations = ref<Conversation[]>([])
  const currentConversationId = ref<number | null>(null)
  
  // 计算属性
  // 当前的对话
  const currentConversation = computed(() => {
    return conversations.value.find(conversation => conversation.id === currentConversationId.value)
  })

  // 当前的消息列表
  const currentMessages = computed(() => {
    return currentConversation.value?.messages || []
  })

  // 生成会话标题
  const generateConversationTitle = (message: string) => {
    if (message.length <= 20) return message
    return message.substring(0, 20) + '...'
  }

  // 生成Id
  const generateId = () => {
    return Date.now();
  };

  // 创建新会话
  const createConversation = () => {
    const conversation: Conversation = {
      id: generateId(),
      title: '新对话',
      messages: [],
      createTime: new Date(),
      updateTime: new Date()
    }

    conversations.value.push(conversation)
    currentConversationId.value = conversation.id

    return conversation
  }

  // 添加用户消息
  const addUserMessage = (content: string) => {
    // 如果没有当前会话，创建一个
    if (!currentConversation.value) {
      createConversation();
    }

    const message: Message = {
      id: generateId(),
      role: 'user',
      message: content,
      timestamp: new Date(),
      status: 'sent'
    };

    // 添加到当前会话
    const conversation = currentConversation.value // 当前会话
    if (conversation) {
      conversation.messages.push(message)
      conversation.updateTime = new Date()

      // 如果是第一条消息，设置标题
      if (conversation.messages.length === 1) {
        conversation.title = generateConversationTitle(content)
      }

      // 模拟AI回复
      // simulateAIResponse()
    }

    return message
  }

  // 模拟AI回答
  const simulateAIResponse = () => {
    const conversation = currentConversation.value

    const aiMessage: Message = {
      id: generateId(),
      role: 'assistant',
      message: '你好',
      timestamp: new Date(),
      status: 'loading'
    }

    conversation.messages.push(aiMessage)
    conversation.updateTime = new Date()

    // 模拟流式响应
    setTimeout(() => {
      const messages = [
        "我在思考你的问题...",
        "让我分析一下...",
        "我认为..."
      ]

      let currentText = ''
      let index = 0

      const interval = setInterval(() => {
        if (index < messages.length) {
          currentText += messages[index] + ' '
          
          // 更新消息内容
          const message = conversation.messages.find(m => m.id === aiMessage.id)
          if (message) {
            message.message = currentText
          }

          index++
        } else {
          clearInterval(interval)
          
          // 完成消息
          const message = conversation.messages.find(m => m.id === aiMessage.id)
          if (message) {
            message.status = 'sent'
          }
        }
      }, 500)
    }, 300)
  }


  const init = () => {
    // 如果没有会话，创建一个
    if (conversations.value.length === 0) {
      createConversation()
    }
    
    // 如果没有当前会话，选择第一个
    if (!currentConversationId.value && conversations.value.length > 0) {
      currentConversationId.value = conversations.value[0].id
    }
  }

  return {
    // 属性
    conversations,
    currentConversationId,
    // 计算属性
    currentConversation,
    currentMessages,
    // 方法
    // 方法
    createConversation,
    addUserMessage,
    init
  }
})