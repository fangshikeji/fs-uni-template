<template>
	<view class="fs-modal">
		<view class="fs-modal-box" :class="{show:modelValue}" :style="{width}">
			<view class="fs-modal-title title" v-if="showTitle">{{title}}</view>
			<view class="fs-modal-content">
				<slot>{{content}}</slot>
			</view>
			<view class="fs-modal-ft">
				<view class="fs-modal-ft-btn fs-modal-ft-cancel" v-if="showCancel" @click="handleCancel">{{cancelText}}</view>
				<view 
					v-if="showConfirm"
					class="fs-modal-ft-btn fs-modal-ft-confirm"
					:class="[confirmTextColorType]"
					:style="{color: confirmTextColor}"
					@click="handleConfirm">
					<view class="fs-loader" v-if="loading"></view>
					<template v-else>
						{{confirmText}}
					</template>
				</view>
			</view>
			<view class="fs-modal-close" v-if="showClose" @click="handleClose">
				<fs-icon type="icon-error" color="#fff" size="50rpx"></fs-icon>
			</view>
		</view>
		<fs-mask v-model="modelValue" @close="handleClose" :maskClickable="maskClickable"></fs-mask>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
	modelValue: Boolean,
	width: {
		type: String,
		default: '80vw'
	},
	maskClickable: {
		type: Boolean,
		default: true
	},
	title: {
		type: String,
		default: '提示'
	},
	showTitle: {
		type: Boolean,
		default: true
	},
	content: String,
	showCancel: {
		type: Boolean,
		default: true
	},
	cancelText: {
		type: String,
		default: '取消'
	},
	showConfirm: {
		type: Boolean,
		default: true
	},
	confirmText: {
		type: String,
		default: '确定'
	},
	confirmTextColor: {
		type: String
	},
	confirmTextColorType: {
		type: String,
		default: 'primary',
		validator(value) {
			return ['primary', 'success', 'info', 'warning', 'danger'].includes(value)
		}
	},
	showClose: {
		type: Boolean,
		default: false
	},
	beforeClose: Function
})

const emits = defineEmits(['update:modelValue','confirm','cancel'])
const loading = ref(false)

const handleClose = () => {
	emits('update:modelValue', false)
}
const handleMask = () => {
	if(props.maskClickable) {
		handleClose()
	}
}
const handleCancel = () => {
	handleClose()
	emits('cancel')
}
const handleConfirm = () => {
	if (props.beforeClose) {
		loading.value = true
		props.beforeClose('confirm', (flag = true) => {
			loading.value = false
			flag && handleClose()
		})
	} else{
		handleClose()
		emits('confirm', false)
	}
}
</script>

<style lang="scss" scoped>
.fs-modal {
	&-box {
		position: fixed;
		background-color: #fff;
		z-index: 1000;
		transition: all .2s;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(0);
		border-radius: var(--radius);
		
		&.show{
			transform: translate(-50%, -50%) scale(1);
		}
	}

	&-title {
		padding: 20rpx;
		text-align: center;
	}
	&-content {
		padding: 20rpx 20rpx 40rpx;
		text-align: center;
	}
	&-ft{
		display: flex;
		
		&-btn{
			flex: 1;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-top: 2rpx solid var(--border-color);
			cursor: pointer;
			
			& + &{
				border-left: 2rpx solid var(--border-color);
			}
		}
	}

	&-close {
		position: absolute;
		top: -110rpx;
		left: 50%;
		transform: translateX(-50%);

		&::before {
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translate(-50%, 100%);
			height: 60rpx;
			width: 2rpx;
			background-color: #fff;
			content: '';
		}
	}
}
.fs-loader {
	display: inline-block;
	width: 40rpx;
	height: 40rpx;
	color: inherit;
	vertical-align: middle;
	border: 4rpx solid currentcolor;
	border-bottom-color: transparent;
	border-radius: 50%;
	animation: 1s loader linear infinite;
	position: relative;
}
@keyframes loader {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
