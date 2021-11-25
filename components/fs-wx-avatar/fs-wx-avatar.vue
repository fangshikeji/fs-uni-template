<template>
	<!-- #ifdef MP-WEIXIN -->
	<view
		class="fs-wx-avatar"
		:style="{width: width || size, height: height || size, border: borderStyle}"
		@click="handleClick">
		<open-data type="userAvatarUrl"></open-data>
	</view>
	<!-- #endif -->
	<!-- #ifndef MP-WEIXIN -->
	<view></view>
	<!-- #endif -->
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	width: String,
	height: String,
	size: {
		type: String,
		default: '140rpx'
	},
	border: Boolean,
	borderWidth: {
		type: String,
		default: '4rpx'
	},
	borderColor: {
		type: String,
		default: '#fff'
	},
	link: String,
	linkType: {
		type: String,
		default: 'navigateTo'
	},
})
const emits = defineEmits(['click'])

const borderStyle = computed(() => props.border ? `${props.borderWidth} solid ${props.borderColor}` : 'none')

const handleClick = () => {
	if (props.link) {
		uni[props.linkType]({
			url: props.link
		})
	}
	emits('click')
}
</script>

<style lang="scss" scoped>
.fs-wx-avatar{
	border-radius: 50%;
	overflow: hidden;
}
</style>
