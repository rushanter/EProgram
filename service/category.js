import request from './network.js'

export function getCategory() {
  return request({
    url: '/queryCategories'
  })
}

export function getSubcategory(type) {
  return request({
    url: '/queryRecord',
    data: {
      type: type,
      page: 1
    }
  })
}

export function getCategoryDetail( type) {
  return request({
    url: '/queryRecord',
    data: {
      type: type,
      page: 1
    }
  })
}