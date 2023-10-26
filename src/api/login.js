import request from '@/utils/request'

export function UserRgister(obj) {
  return request({
    url: '/api/reg',
    method: 'post',
    data: {
      ...obj
    }
  })
}

export function UserLogin(username, password) {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
