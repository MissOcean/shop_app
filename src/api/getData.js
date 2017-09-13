import axios from 'axios';

export function getRecommendData() {
  const url = '/api/getRecommendData'
  return axios.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getCateItem(categoryId) {
  const url = '/api/getCateItem'
  return axios.get(url, {
    params: {
      categoryId
    }
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
