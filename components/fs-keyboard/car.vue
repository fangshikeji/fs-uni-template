<template>
	<view class="fs-car" :class="modelValue ? 'show' : ''">
		<view class="fs-car-header">
			<view class="fs-car-header-btn" @click="handleClose">
				关闭
			</view>
		</view>
		<view class="fs-car-inner">
			<view class="swiper-item">
				<view class="swiper-item-inner" v-for="(item, index) in keyboardList" :key="index">
					<view v-if="item !== '#' && item !== 'del'" @click="handleAction(item)" class="swiper-item-word"
						v-text="item"></view>
					<view v-if="item == 'del'" class="swiper-item-del" @click="handleAction(item)">
						<fs-icon type="icon-backspace" size="50rpx"></fs-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
	modelValue: Boolean,
	index: {
		type: Number,
		default: 0
	}
})

const emits = defineEmits(['update:modelValue', 'update:index', 'change', 'close'])

const keyboard1 = ['晋','京','津','冀','蒙','辽','吉','黑','沪','苏','浙','皖','闽','赣','鲁','豫','鄂','湘','粤','桂','琼','渝','川','贵','云','藏','陕','甘','青','宁','新','台','港','澳','#','#','#','#','#','#','del'
]
const	keyboard2 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S','T', 'U', 'V', 'W', 'X', 'Y', 'Z','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','del'
]
const keyboard3 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',1,2,3,4,5,6,7,8,9,0,'使','领','学','#','#','del'
]

let keyboardList = computed(() => {
	if (props.index === 0) {
		return keyboard1
	} else if (props.index === 1) {
		return keyboard2
	} else {
		return keyboard3
	}
})

const handleAction = item => {
	emits('change', item)
}

const handleClose = () => {
	emits('close')
}
</script>

<style lang="scss" scoped>
$height: 750rpx;

.fs-car {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 999;
	background-color: #d7d8dc;
	height: $height;
	transform: translateY(100%);
	transition: all .3s;

	&-header {
		height: 80rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-top: 25rpx;
		padding-right: 25rpx;
		box-sizing: border-box;

		&-btn {
			background: #fff;
			height: 65rpx;
			line-height: 65rpx;
			padding: 0 15rpx;
			border-radius: 8rpx;
		}
	}

	&-inner {
		height: calc($height - 80rpx);
		width: 100%;

		.swiper-item {
			height: calc($height - 80rpx);
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 25rpx;
			box-sizing: border-box;

			.swiper-item-inner {
				width: calc(100% / 6);
				display: flex;
				justify-content: center;
				align-items: center;
				height: 75rpx;
				margin-bottom: calc(((100% / 6) - 40rpx) / 5);

				.swiper-item-word {
					width: 100rpx;
					height: 75rpx;
					border-radius: 8rpx;
					background-color: #f0f1f5;
					font-size: 33rpx;
					line-height: 75rpx;
					text-align: center;
					color: #222;
					font-weight: bold;
					transition: all 0.2s;
					box-shadow: 1px 0 25px #dfdfdf, 0 1px 0 #cfcfcf, 0 1px 0 #bfbfbf, 0 1px 1px #6f6f6f;

					&:active {
						opacity: 0.8;
						background-color: #ffffff;
						transform: translateY(-5rpx);
					}
				}

				.swiper-item-del {
					width: 100rpx;
					height: 75rpx;
					border-radius: 8rpx;
					background-color: #f0f1f5;
					transition: all 0.2s;
					box-shadow: 1px 0 25px #dfdfdf, 0 1px 0 #cfcfcf, 0 1px 0 #bfbfbf, 0 1px 1px #6f6f6f;
					display: flex;
					justify-content: center;
					align-items: center;

					&:active {
						opacity: 0.8;
						background-color: #ffffff;
						transform: translateY(-5rpx);
					}
				}
			}
		}
	}
}

.show {
	transform: translateY(0);
}
</style>
