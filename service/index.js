import request from './network.js'

export function getMultiData() {
  return request({
    url: '/queryBanner'
  })
}

export function getProduct(type, page) {
  return request({
    url: '/queryRecord',
    data: {
      type,
      page
    }
  })
}
