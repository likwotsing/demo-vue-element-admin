import axios from 'axios'
export function fetchList(query) {
  return axios({
    method: 'get',
    url: 'https://cnodejs.org/api/v1/topics',
    params: query
  })
}
