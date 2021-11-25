<template>
	<view
		class="fs-avatar"
		:class="[
			shape,
			{
				radius,
				fixed
			}
		]"
		:style="{
			width: width || size,
			height: height || size,
			right: fixed ? right : 0,
			bottom: fixed ? bottom : 0,
			border: borderStyle,
			'margin-left': marginLeft
		}"
		@click="handleClick"
	>
		<image class="fs-avatar-img" :src="src" v-if="src" :lazy-load="lazyLoad" :mode="imageMode" />
		<view v-else class="fs-avatar-slot" :class="['bg-' + bgColorType]" :style="{backgroundColor:bgColor}">
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
import { computed, inject } from 'vue'

const props = defineProps({
	src: String,
	shape: {
		type: String,
		default: 'circle', // square, circle
		validator(value) {
			return ['circle', 'square'].includes(value)
		}
	},
	size: {
		type: String,
		default: '80rpx'
	},
	width: String,
	height: String,
	bgColor: String,
	bgColorType: {
		type: String,
		default: 'primary',
		validator(value) {
			return ['primary', 'success', 'info', 'warning', 'danger'].includes(value)
		}
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
	lazyLoad: Boolean,
	imageMode: {
		type: String,
		default: 'scaleToFill'
	},
	radius: Boolean,
	link: String,
	linkType: {
		type: String,
		default: 'navigateTo'
	},
	fixed: Boolean,
	right: {
		type: String,
		default: '30rpx'
	},
	bottom: {
		type: String,
		default: '30rpx'
	}
})

const emits = defineEmits(['click'])

const marginLeft = inject('marginLeft', 0)

const borderStyle = computed(() => props.border ? `${ props.borderWidth} solid ${ props.borderColor}` : 'none')

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
.fs-avatar {
	display: inline-block;
	white-space: nowrap;
	position: relative;
	overflow: hidden;
	vertical-align: middle;
	text-align: center;
	
	&.radius {
		border-radius: var(--radius);
	}
	&.circle,
	&.circle &-img {
		border-radius: 50%;
	}
	&.fixed{
		position: fixed;
		z-index: 50;
		margin-bottom: var(--window-bottom);
	}
	
	&-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
	&-slot {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
	}
	
	& + &{
		margin-left: -20rpx;
	}
}
</style>
