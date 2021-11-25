<template>
	<view 
		class="fs-back-top"
		:style="{right, bottom}"
		@click="handleClick"
		v-if="visible">
		<fs-icon type="icon-arrow-up" size="50rpx" color="#fff"></fs-icon>
	</view>
</template>

<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
	scrollTop: {
		type: [String, Number],
		required: true
	},
	top: {
		type: String,
		default: '150px'
	},
	right: {
		type: String,
		default: '40rpx'
	},
	bottom: {
		type: String,
		default: '40rpx'
	}
})

const visible = computed(() => {
	return parseFloat(props.scrollTop) >= parseFloat(props.top)
})

const handleClick = () => {
	uni.pageScrollTo({
		scrollTop: 0,
		duration: 100
	})
}
</script>

<style lang="scss" scoped>
.fs-back-top{
	position: fixed;
	width: 90rpx;
	height: 90rpx;
	border-radius: 50%;
	background-color: #606266;
	opacity: .5;
	z-index: 100;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: var(--window-bottom);
}
</style>
