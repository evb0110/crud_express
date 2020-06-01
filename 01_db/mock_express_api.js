// import _ from 'lodash'
import axios from 'axios'
const port = 3000
const baseUrl = `http://127.0.0.1:${port}`

export default () => (requestType, payload) => {
  switch (requestType) {
    case 'POST':
      return POST(payload)
    case 'GET':
      return GET(payload)
    case 'PATCH':
      return PATCH(payload)
    case 'DELETE':
      return DELETE(payload)
  }
}

function POST (rule) {
  return axios.post(baseUrl, rule).then(resp => resp.data)
}

function GET (id) {
  const url = id ? `${baseUrl}/${id}` : baseUrl
  return axios.get(url).then(resp => resp.data)
}

function PATCH (rule) {
  return axios.patch(baseUrl, rule)
}

function DELETE (id) {
  const url = `${baseUrl}/${id}`
  return axios.delete(url)
}
