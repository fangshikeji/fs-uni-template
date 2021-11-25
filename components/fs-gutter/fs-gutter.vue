<template>
	<view class="fs-gutter" :style="styleStr"></view>
</template>

<script setup>
	import { computed } from 'vue'
	
	const props = defineProps({
		height: {
			type: String,
			default: '20rpx'
		},
		bgColor: String
	})
	
	const styleStr = computed(() => {
		return `height: ${props.height};background-color:${props.bgColor}`
	})
</script>

<style lang="scss" scoped>
.fs-gutter{
  width: 100%;
  background-color: var(--bg-color);
}
</style>
