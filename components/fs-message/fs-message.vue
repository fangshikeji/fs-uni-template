<template>
	<view 
		class="fs-message" 
		:class="[{show:state.options.show},'bg-'+state.options.type]">
		{{state.options.message}}
	</view>
</template>

<script setup>
import { reactive } from 'vue'

const defaultOptions = {
	type: 'primary',
	duration: 3000
}

const state = reactive({
	options: {},
	timer: null
})
const formatOptions = options => {
	if (typeof options === 'string') {
		return {
			message: options
		}
	}
	if (options.type === 'error') {
		options.type = 'danger'
	}
	return options
}
const show = options => {
	state.options = {
		...defaultOptions,
		...formatOptions(options),
		show: true
	}
	
	if (state.timer) {
		clearTimeout(state.timer)
	}

	if (state.options.duration > 0) {
		state.timer = setTimeout(() => {
			handleHide()
			state.timer = null
		}, state.options.duration)
	}
}
const success = options => {
	show({
		...formatOptions(options),
		type: 'success'
	})
}
const error = options => {
	show({
		...formatOptions(options),
		type: 'danger'
	})
}
const warning = options => {
	show({
		...formatOptions(options),
		type: 'warning'
	})
}
const info = options => {
	show({
		...formatOptions(options),
		type: 'info'
	})
}

const handleHide = () => {
	state.options = {
		...state.options,
		show: false
	}
}

defineExpose({
	show,
	success,
	error,
	warning,
	info,
	handleHide
})
</script>

<style lang="scss" scoped>
.fs-message{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	padding: 20rpx;
	color: #fff;
	transition: all .1s;
	transform: translateY(-100%);
	text-align: center;
	z-index: 1000;
}
.show{
  transform: translateY(0);
}
</style>
