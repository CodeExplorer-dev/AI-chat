import type { Ref } from 'vue'

export interface Message {
  id: number,
  session_id: string
  role: 'user' | 'assistant',
  content: string,
  created_at: Date
  status: 'loading' | 'sent' | 'error'
  errorMsg?: string
}

export interface Session {
  id: string,
  title: string,
  messages: Ref<Message[]>,
  created_at: Date,
  updated_at: Date
}