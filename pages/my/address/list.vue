<template>
	<view class="container">
		<view class="main">
			<fs-card gutter v-for="item in list" :key="item.id">
				<view class="layout-box">
					<view class="title">{{item.name}} {{item.phone}}</view>
					<view class="content">{{item.address}}</view>
				</view>
				<template #footer>
					<view class="flex justify-between align-center">
						<fs-radio-group v-model="item.default" v-if="item.default == 1">
							<fs-radio label="默认地址" value="1" checked></fs-radio>
						</fs-radio-group>
						<fs-radio-group v-else>
							<fs-radio label="设为默认地址" value="1"></fs-radio>
						</fs-radio-group>
						<view class="flex align-center">
							<view class="flex align-center" @click="handleEdit(item)">
								<fs-icon type="icon-edit"></fs-icon>
								<view>编辑</view>
							</view>
							<view class="flex align-center" style="margin-left: 30rpx;" @click="handleDel(item)">
								<fs-icon type="icon-del"></fs-icon>
								<view>删除</view>
							</view>
						</view>
					</view>
				</template>
			</fs-card>
			
			<fs-empty v-if="!list.length && loaded"></fs-empty>
		</view>
		
		<fs-modal
			v-model="visible" 
			content="您确定要删除该地址吗" 
			:beforeClose="beforeClose">
		</fs-modal>
		
		<view class="layout-box">
			<fs-button block round link="./add">添加地址</fs-button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const list = ref([])
const loaded = ref(false)
let visible = ref(false)

setTimeout(() => {
	list.value = [
		{
			name: '陈女士',
			phone: '18734354541',
			address: '山西省太原市小店区晋阳街和泰花园南区5-2-1006',
			default: '1'
		},
		{
			name: '王先生',
			phone: '18734354542',
			address: '山西省太原市小店区晋阳街和泰花园南区5-2-1006',
			default: '0'
		}
	]
	
	loaded.value = true
}, 0)

const handleEdit = item => {
	getApp().globalData.addressDetail = item
	uni.navigateTo({
		url: './add'
	})
}

// 删除相关逻辑
let addressItem = ref({})
const handleDel = item => {
	visible.value = true
	addressItem.value = item
}
const beforeClose = (action, done) => {
	setTimeout(() => {
		done()
	}, 2000)
}
</script>

<style lang="scss">
page{
	height: 100%;
}
</style>
