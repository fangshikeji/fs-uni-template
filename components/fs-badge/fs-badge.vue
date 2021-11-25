<template>
	<view class="fs-badge">
		<slot></slot>
		<view
			v-if="dot" 
			class="fs-badge-dot"
			:class="['bg-' + bgColorType, {absolute: slots.default}]"
			:style="{
				backgroundColor: bgColor
			}">
		</view>
		<view
			v-else 
			class="fs-badge-count"
			:class="['bg-' + bgColorType, {absolute: slots.default}]"
			:style="{
				backgroundColor: bgColor
			}">
			<slot name="count">{{value}}</slot>
		</view>
	</view>
</template>

<script setup>
import { computed, useSlots } from 'vue'

const props = defineProps({
	dot: Boolean,
	count: Number,
	bgColor: String,
	bgColorType: {
		type: String,
		default: 'danger',
		validator(value) {
			return ['primary', 'success', 'info', 'warning', 'danger'].includes(value)
		}
	}
})
const value = computed(() => props.count > 99 ? '99+' : props.count)

const slots = useSlots()
</script>

<style lang="scss" scoped>
.fs-badge {
	position: relative;
	display: inline-block;
	vertical-align: middle;
	
	&-dot {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		top: -8rpx;
		right: -8rpx;
		z-index: 10;
	}
	&-count {
		color: #fff;
		font-size: 12px;
		font-weight: 500;
		padding: 0 6px;
		line-height: 36rpx;
		min-width: 36rpx;
		border-radius: 18rpx;
		text-align: center;
		box-sizing: border-box;
		white-space: nowrap;
		z-index: 10;
		
		&.absolute{
			top: 0;
			right: 0;
			transform: translate(50%, -50%) scale(0.8);
		}
	}
	.absolute{
		position: absolute;
	}
}
</style>
