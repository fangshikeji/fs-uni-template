import { getCurrentInstance, onMounted } from 'vue'
import Schema from 'async-validator'

export default (rules = {}, formRef = 'formRef', messageRef = 'messageRef') => {
	let refs = {}
	let validator = new Schema(rules)

	onMounted(() => {
		refs = getCurrentInstance().refs
	})
	
  return {
    setRules(rules) {
			validator = new Schema(rules)
		},
		validate(data = refs[formRef] && refs[formRef].model) {
			if (data) {
				return new Promise((resolve, reject) => {
					validator.validate(data).then(() => {
						resolve()
					}).catch(({ errors, fields }) => {
						if (refs[formRef].errorType === 'message') {
							refs[messageRef].error(errors[0].message)
						} else{
							uni.showToast({
								icon: 'none',
								title: errors[0].message
							})
						}
						reject(errors, fields)
					})
				})
			} else{
				return Promise.reject('请确认form是否加了ref、model属性')
			}
		}
  }
}
