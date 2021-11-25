<template>
	<view>
		<slot></slot>
	</view>
</template>

<script setup>
import { provide } from 'vue'

const props = defineProps({
	labelWidth: {
		type: String,
		default: '120rpx'
	},
	labelPosition: {
		type: String,
		default: 'left',
		validator(value) {
			return ['left', 'top'].includes(value)
		}
	},
	labelAlign: {
		type: String,
		default: 'left',
		validator(value) {
			return ['left', 'center', 'right', 'justify'].includes(value)
		}
	},
	errorType: {
		type: String,
		default: 'toast',
		validator(value) {
			return ['toast', 'message'].includes(value)
		}
	},
	model: Object
})

provide('form', props)

defineExpose({
	model: props.model,
	errorType: props.errorType
})
</script>

<style lang="scss">

</style>
