<template>
	<view class="fs-divider">
		<view 
			class="fs-divider-line"
			:class="['bg-' + (lineColorType || colorType)]"
			:style="lineStyle">
		</view>
		<view 
			class="fs-divider-content" 
			:class="textColorType || colorType"
			:style="{color: textColor || color}">
				<slot></slot>
		</view>
		<view
			class="fs-divider-line"
			:class="['bg-' + (lineColorType || colorType)]"
			:style="lineStyle">
		</view>
	</view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	lineWidth: {
		type: String,
		default: '150rpx'
	},
	lineHeight: {
		type: String,
		default: '2rpx'
	},
	lineColor: String,
	lineColorType: {
		type: String,
		validator(value) {
			return ['primary', 'success', 'info', 'warning', 'danger','default'].includes(value)
		}
	},
	textColor: String,
	textColorType: {
		type: String,
		validator(value) {
			return ['primary', 'success', 'info', 'warning', 'danger','default'].includes(value)
		}
	},
	color: String,
	colorType: {
		type: String,
		default: 'default',
		validator(value) {
			return ['primary', 'success', 'info', 'warning', 'danger','default'].includes(value)
		}
	},
})

const lineStyle = computed(() => {
	return `
		width:${props.lineWidth};
		height:${props.lineHeight};
		backgroundColor:${props.lineColor || props.color};
		`
})
</script>

<style lang="scss" scoped>
.fs-divider{
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20rpx;
	
	&-content{
		padding: 0 20rpx;
		white-space: nowrap;
	}
	
}
</style>
