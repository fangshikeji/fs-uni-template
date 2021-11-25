<template>
	<view class="container">
		<view class="main">
			<fs-license-plate v-model="carNo"></fs-license-plate>
		</view>
		<view class="layout-box">
			<fs-button round full @click="handleAdd" :disabled="carNo.length < 6" v-if="type === 'add'">添加车牌</fs-button>
			<fs-row v-else>
				<fs-col span="6">
					<fs-button round block @click="handleEdit">更新车牌</fs-button>
				</fs-col>
				<fs-col span="6">
					<fs-button round block type="danger" @click="handleDel">删除车牌</fs-button>
				</fs-col>
			</fs-row>
		</view>
	</view>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

let carNo = ref('')
let type = ref('add')

if (getApp().globalData.carDetail) {
	type.value = 'edit'
	carNo.value = getApp().globalData.carDetail
}

const handleAdd = () => {
	
}
const handleEdit = () => {
	
}
const handleDel = () => {
	uni.showModal({
		title: '您确定要删除该车牌吗?'
	}).then(res => {
		if (res.confirm) {
			uni.showToast({
				title: '删除成功'
			})
			setTimeout(() => {
				uni.navigateBack()
			}, 1500)
		}
	})
}

onUnmounted(() => {
	getApp().globalData.carDetail = null
})
</script>

<style lang="scss">

</style>
