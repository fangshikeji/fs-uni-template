<template>
	<swiper
		:current="current"
		:indicator-dots="indicatorDots"
		:indicator-color="indicatorColor"
		:indicator-active-color="indicatorActiveColor"
		:autoplay="autoplay" 
		:interval="interval" 
		:duration="duration" 
		:circular="circular"
		:vertical="vertical"
		:previous-margin="previousMargin"
		:next-margin="nextMargin"
		@change="handleChange"
		@transition="handleTransition"
		class="fs-swiper"
		:class="{'fs-swiper-card': mode === 'card', 'gutter-v': gutter}"
		:style="{height: height}">
		<template v-if="mode === 'card'">
			<swiper-item class="fs-swiper-item-box" v-for="(item, index) in list" :key="index" @click="handleClick">
				<view class="fs-swiper-item" :class="{'card-cur': index === curIndex}">
					<fs-avatar shape="square" radius width="100%" height="100%" :src="item[keyMap.src]"></fs-avatar>
				</view>
			</swiper-item>
		</template>
		<template v-else>
			<swiper-item class="fs-swiper-item-box" v-for="(item, index) in list" :key="index" @click="handleClick">
				<view class="fs-swiper-item">
					<fs-avatar shape="square" width="100%" height="100%" :src="item[keyMap.src]"></fs-avatar>
				</view>
			</swiper-item>
		</template>
	</swiper>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
	current: {
		type: Number,
		default: 0
	},
	indicatorDots: {
		type: Boolean,
		default: true
	},
	indicatorColor: {
		type: String,
		default: 'rgba(0, 0, 0, .3)'
	},
	indicatorActiveColor: {
		type: String,
		default: '#fff'
	},
	autoplay: {
		type: Boolean,
		default: true
	},
	circular: {
		type: Boolean,
		default: true
	},
	interval: {
		type: Number,
		default: 3000
	},
	duration: {
		type: Number,
		default: 1000
	},
	vertical: {
		type: Boolean,
		default: false
	},
	previousMargin: {
		type: String,
		default: '0'
	},
	nextMargin: {
		type: String,
		default: '0'
	},
	height: {
		type: String,
		default: '350rpx'
	},
	list: {
		type: Array,
		default() {
			return []
		}
	},
	keyMap: {
		type: Object,
		default() {
			return {
				src: 'src'
			}
		}
	},
	mode: {
		type: String
	},
	gutter: Boolean
})
const emits = defineEmits(['change', 'click', 'transition'])

let curIndex = ref(0)
const handleChange = e => {
	curIndex.value = e.detail.current
	emits('change', e)
}
const handleTransition = e => {
	emits('transition', e)
}
const handleClick = item => {
	emits('click', item)
}
</script>

<style lang="scss" scoped>
.fs-swiper{
	&-item{
		width: 100%;
		height: 100%;
	}
}

.fs-swiper-card{
	.fs-swiper-item-box{
		width: 610rpx !important;
		left: 70rpx;
	}
	.fs-swiper-item{
		transform: scale(.9);
		transition: all 0.2s ease-in 0s;
		overflow: hidden;
	}
	.card-cur{
		transform: scale(1)
	}
}
</style>