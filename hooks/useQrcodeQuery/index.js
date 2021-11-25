import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

export default (separator = '?') => {
	let urlQuery = ref('')
	
	onLoad(options => {
		const scene = decodeURIComponent(options.q)
		const arr = scene.split(separator)
		const length = arr.length
		urlQuery = arr[length - 1]
	})
	
	return {
		getQueryString (name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
			var r = urlQuery.match(reg)
			if (r != null) return unescape(r[2])
			return null
		}
	}
}