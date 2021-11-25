export default () => {
	return {
		mobile(rule, value) {
			if(!/^1\d{10}$/.test(value)) {
				return new Error('请输入正确的手机号')
			}
			return true
		},
	}
}