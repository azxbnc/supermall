
import { request } from './request'

export function getCategory () {
  return request({
    url: '/category',
    mode: 'get'
  })
}

export function getSubcategory (maitKey) {
  return request({
    url: "/subcategory",
    params: {
      maitKey
    },
    mode: "get"
  })
}

export function getCategoryDetail (miniWallkey, type) {
  return request({
    url: "/subcategory/detail",
    params: {
      miniWallkey,
      type
    }
  })
}