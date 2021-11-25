<template>
	<view class="fs-empty-box">
		<image :src="src" mode="widthFix" style="width: 400rpx;"></image>
		<view class="content">{{text}}</view>
	</view>
</template>

<script setup>
import empty from './empty.png'

const props = defineProps({
	src: {
		type: String,
		default: empty
	},
	text: {
		type: String,
		default: '暂无数据'
	}
})
</script>

<style lang="scss" scoped>
.fs-empty-box{
	text-align: center;
	padding: 200rpx 30rpx;
	
	.content{
		margin-top: 20rpx;
	}
}
</style>
