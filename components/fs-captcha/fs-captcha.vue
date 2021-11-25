<template>
	<fs-button
		v-if="type === 'button'"
		size="medium" 
		plain 
		round 
		@click="getCaptcha" 
		:disabled="state.sending">
		{{state.timerText}}
	</fs-button>
	<view v-else class="primary" @click="getCaptcha" >{{state.timerText}}</view>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({
	mobile: String,
	seconds: {
		type: Number,
		default: 60
	},
	type: {
		type: String,
		default: 'button',
		validator(value) {
			return ['button','text'].includes(value)
		}
	}
})
const emits = defineEmits(['start', 'end'])

const state = reactive({
	timerText: '获取验证码',
	sending: false,
	timerId: null
})

const getCaptcha = () => {
	if (!state.sending) {
		if (!/^1[3456789]\d{9}$/.test(props.mobile)) {
			return uni.showToast({
				icon: 'none',
				title: '请输入正确的手机号'
			})
		}
		state.sending = true
		
		let timer = props.seconds
		state.timerText = `${timer}s`
		
		state.timerId = setInterval(() => {
			if (--timer > 0) {
				state.timerText = `${timer}s`
			} else {
				endSendCaptcha()
			}
		}, 1000)
		emits('start')
	}
}
const endSendCaptcha = () => {
	state.sending = false
	state.timerText = '获取验证码'
	clearInterval(state.timerId)
	emits('end')
}
</script>

<style>

</style>
