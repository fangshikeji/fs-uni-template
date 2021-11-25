<template>
	<view class="fs-avatar-group">
		<slot></slot>
	</view>
</template>

<script setup>
import { provide } from 'vue'

const props = defineProps({
	margin: {
		type: String,
		default: '-30rpx'
	}
})
provide('marginLeft', props.margin)
</script>
