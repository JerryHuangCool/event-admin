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

export function getArticleList(params) {
  return request({
    url: '/my/article/list',
    params
  })
}

export function getArticleDetail(id) {
  return request({
    url: '/my/article/info',
    params: {
      id
    }
  })
}

export function publishArticle(data) {
  return request.post('/my/article/add', data)
}

export function updateArticle(data) {
  return request({
    url: '/my/article/info',
    method: 'put',
    data
  })
}
