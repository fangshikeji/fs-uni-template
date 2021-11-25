<template>
	<view>
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

provide('swipeGroup', {
	updateChildren,
	toggle
})
</script>

<style lang="scss" scoped>

</style>
