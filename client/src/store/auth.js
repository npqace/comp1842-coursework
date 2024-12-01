import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
    user: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    clearAuth(state) {
      state.token = ''
      state.user = null
      localStorage.removeItem('token')
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const { data } = await axios.post('http://localhost:3000/auth/login', credentials)
        commit('setToken', data.token)
        return data
      } catch (error) {
        throw error.response.data
      }
    },
    async register({ commit }, userData) {
      try {
        const { data } = await axios.post('http://localhost:3000/auth/register', userData)
        return data
      } catch (error) {
        throw error.response.data
      }
    }
  }
})