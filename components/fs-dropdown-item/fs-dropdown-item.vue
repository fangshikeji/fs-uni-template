<template>
	<view class="fs-dropdown-item">
		<view class="fs-dropdown-item-title" @click="handleToggle">
			<view class="fs-dropdown-item-text">{{title}}</view>
			<fs-icon class="fs-dropdown-item-icon" type="icon-sort-down" size="26rpx" :class="{visible}"></fs-icon>
		</view>
		
		<view class="fs-dropdown-item-content" :class="{visible}">
			<slot></slot>
		</view>
	</view>
	<fs-mask v-model="visible" :z-index="99"></fs-mask>
</template>

<script setup>
import { ref, inject } from 'vue'

const props = defineProps({
	title: String,
})

const visible = ref(false)
let flag = false

const updateState = () => {
	if (flag) {
		flag = false
		visible.value = !visible.value
	} else{
		visible.value = false
	}
}

const dropdownGroup = inject('dropdownGroup')
dropdownGroup.updateChildren({
	updateState
})

const handleToggle = () => {
	flag = true
	dropdownGroup.toggle()
}
</script>

<style lang="scss" scoped>
.fs-dropdown-item{
	flex: 1;
	width: 100%;
	height: 80rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #fff;
	z-index: 100;
	padding: 0 20rpx;
	
	&-title{
		display: flex;
		align-items: center;
		
		.visible{
			transform: rotate(180deg);
		}
	}
	&-text{
		margin-right: 10rpx;
	}
	&-icon{
		transition: all .2s;
	}
	
	&-content{
		position: absolute;
		left: 0;
		right: 0;
		top: 80rpx;
		transform: scaleY(0);
		transform-origin: left top;
		transition: all .1s;
		z-index: 100;
		background-color: #fff;
		opacity: 0;
		
		&.visible{
			transform: scaleY(1);
			opacity: 1;
		}
	}
}
</style>
