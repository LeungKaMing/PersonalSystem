import axios from 'axios'

export function signIn (param) {
  return axios.post('http://127.0.0.1:3001/api/user/signIn.json', param.data)
  .then(function (res) {
    if (res.data.success) {
      param.onSuccess(res.data.success)
    } else {
      param.onFailure(res.data.success)
    }
  })
  .catch(function (err) {
    param.onFailure(err.data)
  })
}
export function signUp (param) {
  return axios.post('http://127.0.0.1:3001/api/user/signUp.json', param.data)
  .then(function (res) {
    if (res.data.success) {
      param.onSuccess(res.data.success)
    } else {
      param.onFailure(res.data.success)
    }
  })
  .catch(function (err) {
    param.onFailure(err.data)
  })
}
export function saveResume (param) {
  return axios.post('http://127.0.0.1:3001/admin/saveResume', param.data)
  .then(function (res) {
    if (res.data.success) {
      param.onSuccess(res.data.success)
    } else {
      param.onFailure(res.data.success)
    }
  })
  .catch(function (err) {
    param.onFailure(err.data)
  })
}
export function getResume (param) {
  return axios.get('http://127.0.0.1:3001/admin/getResume', param.data)
  .then(function (res) {
    if (res.data.success) {
      param.onSuccess(res.data.success)
    } else {
      param.onFailure(res.data.success)
    }
  })
  .catch(function (err) {
    param.onFailure(err.data)
  })
}
