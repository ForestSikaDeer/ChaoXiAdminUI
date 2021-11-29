import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/chaoxi/adminSystem/crewLogin',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/chaoxi/adminSystem/crewLoginInfo',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/chaoxi/adminSystem/logout',
    method: 'post'
  })
}
