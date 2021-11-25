import { reactive, onMounted, getCurrentInstance } from 'vue'
import { onReachBottom, onShow, onPullDownRefresh, onReady } from '@dcloudio/uni-app'

export default loadmoreRef => {
	let refs = {}
	
	const refresh = () => {
		refs[loadmoreRef].refresh()
	}
	
	onMounted(() => {
		refs = getCurrentInstance().refs
		refs[loadmoreRef].query()
	})
	
	onPullDownRefresh(() => {
		if(refs[loadmoreRef].pullDownRefresh) {
			refs[loadmoreRef].hasMore = true
			refs[loadmoreRef].query().then(() => uni.stopPullDownRefresh())
		}
	})
	
	onReachBottom(() => {
		if(refs[loadmoreRef].hasMore) {
			refs[loadmoreRef].query(true)
		}
	})
	
	return {
		refresh
	}
}