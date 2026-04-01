// 会话相关接口
import request from '@/utils/request'

/**
 * 获取所有会话
 */
export const getAllSessions = () => {
  const res = request({
    url: '/sessions',
    method: 'get',
  })
  return res
}

/**
 * 获取指定会话
 */
export const getSessionById = (sessionId) => {
  const res = request({
    url: '/sessions/' + sessionId,
    method: 'get',
  })
  return res
}

/**
 * 创建会话
 */
export const createSession = () => {
  const res = request({
    url: '/sessions/',
    method: 'post',
  })
  return res
}


/**
 * 修改会话标题
 */
export const updateSessionTitle = (sessionId, title) => {
  const res = request({
    url: '/sessions/' + sessionId,
    method: 'patch',
    title
  })
  return res
}


/**
 * 删除会话
 */
export const deleteSession = (sessionId) => {
  const res = request({
    url: '/sessions/' + sessionId,
    method: 'delete',
  })
  return res
}
