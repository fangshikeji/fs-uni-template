<template>
	<view class="fs-notice-bar" :animation="animationData" :style="{backgroundColor: bgColor, color}" v-if="visible">
		<fs-icon v-if="showIcon" class="fs-notice-bar-notice" type="icon-notice1" :color="color"></fs-icon>
		<swiper
			class="fs-notice-bar-swiper"
			autoplay
			circular 
			:vertical="vertical"
			:interval="interval" 
			:duration="1000">
			<swiper-item v-for="(item, index) in list" :key="index">
				<view class="fs-notice-bar-item line1" @click="handleRoute(item)">{{item[titleKey]}}</view>
			</swiper-item>
		</swiper>
		<fs-icon
			v-if="showClose"
			class="fs-notice-bar-close"
			:color="color"
			type="icon-error"
			@click="handleClose">
		</fs-icon>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
	list: {
		type: Array,
		default() {
			return []
		}
	},
	titleKey: {
		type: String,
		default: 'title'
	},
	urlKey: {
		type: String,
		default: 'url'
	},
	bgColor: {
		type: String,
		default: '#fffbe8'
	},
	color: {
		type: String,
		default: '#de8c17'
	},
	vertical: Boolean,
	interval: {
		type: Number,
		default: 5000
	},
	showClose: {
		type: Boolean,
		default: true
	},
	showIcon: {
		type: Boolean,
		default: true
	},
	linkType: {
		type: String,
		default: 'navigateTo'
	}
})
const emits = defineEmits(['click'])

let visible = ref(true)
let animationData = ref(null)
const animation = uni.createAnimation({
	duration: 200,
})

const handleClose = () => {
	animation.scale(0.7, 0.7).opacity(0).step()
	animationData.value = animation.export()

	setTimeout(() => {
		visible.value = false
	}, 200)
}

const handleRoute = item => {
	if (item[urlKey]) {
		uni[props.linkType]({
			url: item[urlKey]
		})
	}
	emits('click')
}
</script>

<style lang="scss" scoped>
.fs-notice-bar{
	margin: 0 var(--gutter);
	position: relative;
	display: flex;
	align-items: center;
	
	&-notice{
		margin-left: var(--gutter);
	}
	
	&-swiper{
		height: 80rpx;
		flex: 1;
	}
	&-item{
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 var(--gutter);
	}
	
	&-close{
		margin-right: var(--gutter);
	}
}
</style>
