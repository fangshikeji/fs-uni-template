import { ref } from 'vue'
import { onPageScroll } from '@dcloudio/uni-app'

export default (sTop = 0) => {
	const scrollTop = ref(sTop)
	
	onPageScroll(e => {
		scrollTop.value = e.scrollTop
	})
	return scrollTop
}