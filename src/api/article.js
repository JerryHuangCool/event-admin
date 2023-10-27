import request from '@/utils/request'

export function getArticleCate() {
  return request({
    url: '/my/cate/list'
  })
}

export function addArticleCate(cate_name, cate_alias) {
  return request({
    url: '/my/cate/add',
    method: 'post',
    data: {
      cate_name,
      cate_alias
    }
  })
}

export function updateArticleCate(obj) {
  return request({
    url: '/my/cate/info',
    method: 'put',
    data: {
      ...obj
    }
  })
}

export function delArticleCate(id) {
  return request({
    url: '/my/cate/del',
    method: 'DELETE',
    params: {
      id
    }
  })
}
