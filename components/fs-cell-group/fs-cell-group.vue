<template>
	<view class="fs-cell-group" :class="{full, radius}" :style="{backgroundColor:bgColor || '#fff'}">
		<slot />
	</view>
</template>

<script setup>
import { provide, toRefs } from 'vue'

const props = defineProps({
	titleWidth: String,
	arrow: Boolean,
	arrowColor: {
		type: String,
		default: ''
	},
	arrowColorType: {
		type: String,
		validator(value) {
			return ['primary', 'success', 'info', 'warning', 'danger'].includes(value)
		}
	},
	border: Boolean,
	tighten: Boolean,
	radius: {
		type: Boolean,
		default: true
	},
	reverse: Boolean,
	align: {
		type: String,
		default: 'center'
	},
	justify: {
		type: String,
		default: 'left',
		validator(value) {
			return ['left', 'center', 'right'].includes(value)
		}
	},
	bgColor: {
		type: String,
	},
	full: Boolean
})

provide('cellGroup', props)

</script>

<style lang="scss" scoped>
.fs-cell-group{
	margin: 0 var(--gutter);
	overflow: hidden;
	position: relative;
	
	&::after{
		position: absolute;
		bottom: 0;
		left: 0;
		height: 2rpx;
		width: 100%;
		background-color: #fff;
		z-index: 10;
		content: '';
	}
	
	&.full{
		margin: 0;
	}
	
	&.radius{
		border-radius: var(--radius);
	}
}
</style>
