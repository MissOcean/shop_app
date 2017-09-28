import axios from 'axios';

export function getRecommendData() {
  const url = '/api/getRecommendData'
  return axios.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getCateItem(categoryId) {
  //get:/api/getCateItem?categoryId=xxx
  const url = '/api/getCateItem'
  return axios.get(url, {
    params: {
      categoryId
    }
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getProductDetail(productId) {
  //get:/api/getProductDetail?id=xxx
  const url = '/api/getProductDetail'
  return axios.get(url, {
    params: {
      id: productId
    }
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getCommentTags(productId) {
  //get:/api/getCommentTags?itemId=xxx
  const url = '/api/getCommentTags'
  return axios.get(url, {
    params: {
      itemId: productId
    }
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
export function getProductGoodRate(productId) {
  //get:/api/getProductGoodRate?itemId=xxx
  const url = '/api/getProductGoodRate'
  return axios.get(url, {
    params: {
      itemId: productId
    }
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
export function getCommentByTag(tag,itemId,page) {
  //get:/api/getCommentByTag?tag=全部&itemId=1241017&page=1
  const url = '/api/getCommentByTag'
  return axios.get(url, {
    params: {
      tag,itemId,page
    }
  }).then(res => {
    return Promise.resolve(res.data)
  })
}


