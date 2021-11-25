<template>
	<movable-area class="fs-swipe-box">
		<movable-view 
			class="fs-swipe-view" 
			@change="change" 
			@touchend="touchend" 
			@touchstart="touchstart" 
			direction="horizontal"
			:disabled="disabled" 
			:x="state.moveX" 
			:style="{width: state.swipeViewWidth}">
			<view class="fs-swipe-content">
				<slot></slot>
			</view>
			<view 
				class="fs-swipe-option" 
				v-for="(item, index) in options" 
				:key="index" 
				:style="{backgroundColor:item.bgColor}" 
				@click="handleOption(item)"
			>
				<view 
					class="fs-swipe-option-text" 
					:style="{width: optionWidth + 'px',backgroundColor:item.bgColor}"
				>
					{{ item.name }}
				</view>
			</view>
		</movable-view>
	</movable-area>
</template>

<script setup>
import { inject, onMounted, reactive, ref, nextTick, getCurrentInstance } from 'vue'

const props = defineProps({
	disabled: Boolean,
	optionWidth: {
		type: Number,
		default: 80
	},
	options: {
		type: Array,
		default: () => []
	},
	optionData: null
})
const emits = defineEmits(['clickOption'])

const state = reactive({
	moveX: 0,
	scrollX: 0,
	swipeViewWidth: 0,
	status: false,
	moving: false,
	allOptionWidth: props.optionWidth * props.options.length
})
const swipeGroup = inject('swipeGroup', {})
const updateState = () => {
	if (state.moving) {
		state.moving = false
	} else{
		state.moveX = 0
	}
}
swipeGroup.updateChildren({
	updateState
})

onMounted(() => {
	uni.createSelectorQuery().in(getCurrentInstance().ctx).select('.fs-swipe-box').boundingClientRect(data => {
		state.swipeViewWidth = data.width + state.allOptionWidth + 'px'
	}).exec()
})

function change(e) {
	state.scrollX = e.detail.x
}
function touchstart() {
	state.moving = true
	swipeGroup.toggle()
}
function touchend() {
	state.moveX = state.scrollX
	
	nextTick(() => {
		if (state.status) { //打开状态
			if (state.moveX >= -state.allOptionWidth * 2 / 3) {
				handleClose()
			} else {
				handleOpen()
			}
		} else {
			if (state.moveX <= -state.allOptionWidth / 3) {
				handleOpen()
			} else {
				handleClose()
			}
		}
	})
}
function handleOpen() {
	state.moveX = -state.allOptionWidth
	state.status = true
}
function handleClose() {
	state.moveX = 0
	state.status = false
}
function handleOption(item) {
	emits('clickOption', {option: item, data: props.optionData})
	handleClose()
}
</script>

<style lang="scss" scoped>
.fs-swipe-box {
	width: auto;
	height: auto;
	overflow: hidden;
	position: relative;
}

.fs-swipe-view {
	display: flex;
	position: relative;
	height: inherit;
	width: 100%;
}

.fs-swipe-content {
	flex: 1;
}

.fs-swipe-option {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	color: #fff;
}
</style>
