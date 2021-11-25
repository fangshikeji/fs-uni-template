<template>
	<view class="container">
		<view class="main">
			<fs-cell-group border arrow>
				<fs-cell title="晋A7877H" @click="handleEdit('晋A7877H')"></fs-cell>
			</fs-cell-group>
			<fs-empty v-if="!carList.length && loaded"></fs-empty>
		</view>
		<view class="layout-box">
			<fs-button round full link="./add">添加车辆</fs-button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'

let carList = ref([])
let loaded = ref(false)

const handleEdit = item => {
	getApp().globalData.carDetail = item
	uni.navigateTo({
		url: './add'
	})
}

onShow(() => {
	console.log('onshow');
})
</script>

<style lang="scss">

</style>
