<template>
	<view class="fs-dropdown">
		<slot></slot>
	</view>
</template>

<script setup>
import { provide, reactive } from 'vue'

const state = reactive({
	children: []
})

const updateChildren = child => {
	state.children.push(child)
}
const toggle = () => {
	state.children.forEach(child => {
		child.updateState()
	})
}
const close = () => {
	toggle()
}

provide('dropdownGroup', {
	updateChildren,
	toggle
})

defineExpose({
	close
})
</script>

<style lang="scss" scoped>
.fs-dropdown{
	display: flex;
	align-items: center;
	background-color: #fff;
	position: relative;
	z-index: 100;
}
</style>
