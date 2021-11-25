import store from '@/store'
import config from './config'
import utils from './utils'

const request = (method, url, data) => {
	return new Promise((resolve, reject) => {
		uni.request({
			method,
			url: utils.isHttp(url) ? url : config.apiBaseUrl + url,
			header: {
				Authorization: store.state.token
			},
			data
		}).then(res => {
			if (res.code === 201) {
				store.commit('setUserInfo', {})
				
				// opt.isAuth && uni.navigateTo({
				// 	url: '/pages/login/login'
				// })
			}
			
			if (res.code === 200 || res.success) {
				resolve(res)
			} else{
				uni.showToast({
					title: res.msg,
					icon: 'none'
				})
				reject(res)
			}
			
		}).catch(err => {
			reject(err)
		}).finally(() => {
			uni.hideLoading()
		})
	})
}

const http = {}
const methods = ['GET', 'POST', 'PUT', 'DELETE']

methods.forEach(method => {
	http[method.toLowerCase()] = (url, data, options) => {
		const loadingTitle = method === 'GET' ? '加载中...' : '提交中...'
		const opt = Object.assign({}, config.httpDefaultOption, { loadingTitle }, options)
		
		if (opt.isAuth) {
			if (!store.state.token) {
				// uni.navigateTo({
				// 	url: '/pages/login/login'
				// })
				// return Promise.reject({
				// 	msg: '无token'
				// })
			}
		}
		
		opt.showLoading && uni.showLoading({
			title: opt.loadingTitle
		})
		
		return request(method, url, data)
	}
})

export default http
