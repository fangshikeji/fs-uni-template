<template>
	<view class="fs-card" :class="{'fs-card-full': full, 'fs-card-gutter': gutter}">
		<view class="fs-card-box" :class="{'fs-card-radius': radius, shadow}">
			<view class="fs-card-title" v-if="slots.title || title">
				<slot name="title">{{title}}</slot>
			</view>
			<view class="fs-card-content">
				<slot></slot>
			</view>
			<view class="fs-card-ft" v-if="slots.footer">
				<slot name="footer"></slot>
			</view>
		</view>
	</view>
</template>

<script setup>
import { useSlots } from 'vue'
const props = defineProps({
	title: String,
	full: Boolean,
	gutter: Boolean,
	radius: {
		type: Boolean,
		default: true
	},
	shadow: {
		type: Boolean,
		default: false
	},
})

const slots = useSlots()
</script>

<style lang="scss" scoped>
.fs-card{
	margin-left: var(--gutter);
	margin-right: var(--gutter);
	
	&-box{
		background-color: #fff;
		overflow: hidden;
	}
	&-radius{
		border-radius: var(--radius);
	}
	
	&-title{
		padding: 20rpx var(--gutter);
		border-bottom: 2rpx solid var(--border-color);
	}
	&-ft{
		padding: 20rpx var(--gutter);
		border-top: 2rpx solid var(--border-color);
	}
	
	&-full{
		margin-left: 0;
		margin-right: 0;
	}
	&-gutter{
		margin-bottom: var(--gutter-v);
	}
}
</style>
