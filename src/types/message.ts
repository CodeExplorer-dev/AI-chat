export interface Message {
  id: number,
  role: 'user' | 'assistant',
  message: string,
  timestamp: Date
  status: 'loading' | 'sent' | 'error'
  errorMsg?: string
}

export interface Conversation {
  id: number,
  title: string,
  messages: Message[],
  createTime: Date,
  updateTime: Date
}