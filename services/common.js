import http from '@/utils/http'

export function login(data) {
	return http.post('user/login', data)
}
export function wxLogin(data) {
	return new Promise((resolve, reject) => {
		uni.login({
		  provider: 'weixin',
		  success: function (res) {
		    http.post('user/wxlogin', { ...data, code: res.code }, {
		    	isAuth: false,
		    	loadingTitle: '登录中...'
		    }).then(res => {
					resolve(res)
				}).catch(err => {
					reject(err)
				})
		  }
		})
	})
}
export function logout(data) {
	return http.post('user/logout', data)
}


// 意见反馈
export function addAdvice(data) {
	return http.post('user/advice/add', data)
}
export function getAdviceList() {
	return http.get('user/advice/list')
}

// 通讯录
export function getAddrbookList() {
	return http.get('user/advice/list')
}