// src/utils/axios.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

// Add auth token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['x-auth-token'] = token
  }
  return config
})

export default api