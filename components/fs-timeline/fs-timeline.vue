<template>
	<view class="fs-timeline">
		<view class="fs-timeline-item" v-for="(item, index) in options" :key="index">
			<view class="fs-dot-box">
				<slot name="dot" :item="item" :index="index">
					<view class="fs-dot" 
						:class="index === 0 ? 'bg-' + activeColorType : ''" 
						:style="{backgroundColor: index === 0 ? activeColor : '#969799'}">
					</view>
				</slot>
			</view>
			<view class="fs-timeline-line"></view>
			<view class="content"><slot :item="item" :index="index"></slot></view>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
	options: Array,
	colorType: String,
	color: String,
	activeColor: String,
	activeColorType: {
		type: String,
		default: 'primary',
		validator(value) {
			return ['primary', 'success', 'info', 'warning', 'danger'].includes(value)
		}
	}
})
</script>

<style lang="scss" scoped>
.fs-timeline {
	padding-left: 40rpx;
	
	&-line{
		position: absolute;
		top: 0;
		left: -20rpx;
		width: 2rpx;
		height: 100%;
		background-color: #ebedf0;
	}
	
	&-item{
		position: relative;
		
		&:last-child{
			.timeline-line{
				display: none;
			}
		}
	}
}
.fs-dot-box{
	position: absolute;
	left: -20rpx;
	top: 30rpx;
	background-color: #fff;
	z-index: 10;
	transform: translateX(-50%);
}
.fs-dot{
	width: 15rpx;
	height: 15rpx;
	border-radius: 50%;
	// background-color: #969799;
}
.content{
	padding: var(--gutter) 0;
}
</style>
