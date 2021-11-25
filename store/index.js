import { createStore } from 'vuex'
import { login, wxLogin, logout } from '../services/common'

const store = createStore({
  state: {
    userInfo: uni.getStorageSync('userInfo') || {},
		token: uni.getStorageSync('token') || ''
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
			uni.setStorageSync('userInfo', userInfo)
    },
		setToken(state, token) {
			state.token = token
			uni.setStorageSync('token', token)
		}
  },
	actions: {
		login({ commit }, data) {
			return login(data).then(res => {
				commit('setToken', res.token)
				commit('setUserInfo', res.userInfo)
			})
		},
		wxLogin({ commit }, data) {
			return wxLogin(data).then(res => {
				commit('setToken', res.token)
				commit('setUserInfo', res.userInfo)
			})
		},
		logout({ commit }) {
			// return http.post('auth/user/logout').then(res => {
			// 	commit('setToken', '')
			// 	commit('setUserInfo', {})
			// })
			return new Promise(resolve => {
				commit('setToken', '')
				commit('setUserInfo', {})
				resolve()
			})
		}
	}
})

export default store