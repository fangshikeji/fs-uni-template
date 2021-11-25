<template>
	<view 
		class="fs-checkbox-button" 
		:class="[
			selected ? checkedColorType : 'fs-checkbox-button-default',
			{'fs-checkbox-button-radius':radius, 'fs-checkbox-button-round':round},
			buttonSize
		]"
		:style="{color:checkedColor}"
		@click="handleToggle">
			{{label}}
			<slot />
	</view>
</template>

<script setup>
import { inject, watch, toRefs, ref } from 'vue'
	
const props = defineProps({
	label: String,
	value: {
		type: null,
		required: true
	},
	checkedColor: String,
	checkedColorType: String,
	size: {
	  type: String,
	  validator(value) {
	  	return ['mini', 'small', 'medium'].includes(value)
	  }
	},
})

const checkboxGroup = inject('checkboxGroup')
const { inline, radius, round } = checkboxGroup
const checkedColorType = props.checkedColorType || checkboxGroup.checkedColorType
const checkedColor = props.checkedColor || checkboxGroup.checkedColor
const buttonSize = props.size || checkboxGroup.size

let selected = ref(false)
checkboxGroup.updateChildren({
	selected,
	value: props.value
})

const handleToggle = () => {
	checkboxGroup.updateValue(props.value)
}
</script>

<style lang="scss" scoped>
.fs-checkbox-button {
	padding: 10rpx 30rpx;
	white-space: nowrap;
	border: 2rpx solid currentColor;
	margin-right: 20rpx;
	margin-bottom: 20rpx;
	
	&-default {
		color: #999999;
	}
	
	&-radius{
		border-radius: var(--radius);
	}
	&-round{
		border-radius: 60rpx;
	}
	
	&.medium{
		padding: 8rpx 25rpx;
		font-size: 13px;
	}
	&.small{
		padding: 6rpx 20rpx;
		font-size: 12px;
	}
	&.mini{
		padding: 2rpx 15rpx;
		font-size: 11px;
	}
}
</style>
