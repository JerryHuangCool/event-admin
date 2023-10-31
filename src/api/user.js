import request from '@/utils/request'

export function getUserInfo() {
  return request({
    url: '/my/userinfo'
  })
}

export function updateUserInfo(data) {
  return request({
    url: '/my/userinfo',
    method: 'put',
    data
  })
}

export function updateAvatar(avatar) {
  return request({
    url: '/my/update/avatar',
    method: 'patch',
    data: {
      avatar
    }
  })
}

export function updatePassword(data) {
  return request({
    url: '/my/updatepwd',
    method: 'patch',
    data
  })
}
