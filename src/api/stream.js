import request from "@/utils/request";

/**
 * 流式对话
 * @param {string} sessionId - 会话 ID
 * @param {string} content - 消息内容
 * @returns {Promise<Response>} fetch 响应对象
 */
export const chatStream = (sessionId, content) => {
  return fetch('http://localhost:3000/api/sessions/' + sessionId + '/chat/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content })
  })
}