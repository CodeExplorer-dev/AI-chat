// 消息相关接口
import request from '@/utils/request'

/**
 * 获取会话消息历史
 */
export const getSessionsHistoryById = (sessionId) => {
  const res = request({
    url: `/sessions/${sessionId}/messages`,
    method: 'get',
  })
  return res
}

/**
 * 多轮对话
 */
export const chat = (sessionId, content) => {
  const res = request({
    url: `/sessions/${sessionId}/chat`,
    method: 'post',
    content
  })
  return res
}