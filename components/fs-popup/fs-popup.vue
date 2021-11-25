<template>
	<view class="fs-popup">
		<view class="fs-popup-drawer" :class="[direction,{show:modelValue}]" :style="[style,customStyle]">
			<slot></slot>
		</view>
		<fs-mask v-if="showMask" v-model="modelValue" @close="handleClose" :maskClickable="maskClickable"></fs-mask>
	</view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	modelValue: Boolean,
	direction: {
		type: String,
		default: 'left',
		validator(value) {
			return ['left', 'right', 'top', 'bottom'].includes(value)
		}
	},
	width: {
		type: String,
		default: '80%'
	},
	height: {
		type: String,
		default: '30%'
	},
	showMask: {
		type: Boolean,
		default: true
	},
	maskClickable: {
		type: Boolean,
		default: true
	},
	customStyle: {
	  type: Object,
	  default() {
			return {}
		}
	}
})

const style = computed(() => {
	let ret = ''
	if (props.direction === 'left' || props.direction === 'right') {
		ret = `width: ${props.width}`
	} else {
		ret = `height: ${props.height}`
	}
	return ret
})

const emits = defineEmits(['update:modelValue'])

const handleClose = () => {
	emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
.fs-popup {
	&-drawer{
		position: fixed;
		background-color: #fff;
		z-index: 1000;
		transition: all .3s;
		overflow: auto;
	}
	
	.left{
		top: var(--window-top);
		bottom: var(--window-bottom);
		left: 0;
		transform: translateX(-100%);
	}
	.right{
		top: var(--window-top);
		bottom: var(--window-bottom);
		right: 0;
		transform: translateX(100%);
	}
	.top{
		top: var(--window-top);
		right: 0;
		left: 0;
		transform: translateY(-200%);
	}
	.bottom{
		left: 0;
		bottom: var(--window-bottom);
		right: 0;
		transform: translateY(100%);
	}
	
	.show{
		transform: translateX(0);
	}
}
</style>
