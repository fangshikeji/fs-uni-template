<template>
	<view
		class="fs-grid-item"
		:class="{'fs-grid-item-border': border,'fs-grid-item-radius': radius}"
		:style="{padding: padding ? '20rpx 0' : 0,backgroundColor: bgColor}"
		@click="handleClick">
		<slot></slot>
	</view>
</template>

<script setup>
import { inject } from 'vue'

const emits = defineEmits(['click'])

const gird = inject('fsGrid', {})

const { border, padding, bgColor, radius } = gird

const handleClick = () => {
	emits('click')
}
</script>

<style lang="scss" scoped>
.fs-grid-item{
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	text-align: center;
	position: relative;
	height: 100%;
	background-color: #fff;
	
	&-border::before{
		position: absolute;
		content: '';
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border: 1px solid var(--border-color);
		margin-left: -1px;
		margin-top: -1px;
	}
	
	&-radius{
		border-radius: var(--radius);
	}
}
</style>
