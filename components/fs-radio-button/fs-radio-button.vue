<template>
	<view
		class="fs-radio-button" 
		:class="[
			selected ? checkedColorType : 'fs-radio-button-default',
			{'fs-radio-button-radius':radius, 'fs-radio-button-round':round},
			buttonSize
		]"
		:style="{color:checkedColor}"
		@click="handleToggle">
			{{label}}
			<slot />
	</view>
</template>

<script setup>
import { inject, reactive, watch, ref } from 'vue'

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
	checked: Boolean
})

const radioGroup = inject('radioGroup')
const { radius, round } = radioGroup
const checkedColorType = props.checkedColorType || radioGroup.checkedColorType
const checkedColor = props.checkedColor || radioGroup.checkedColor
const buttonSize = props.size || radioGroup.size

let selected = ref(props.checked)
watch(() => props.checked, val => {
	selected.value = val
})

radioGroup.updateChildren({
	selected,
	value: props.value
})

const handleToggle = () => {
	radioGroup.updateValue(props.value)
}
</script>

<style lang="scss" scoped>
.fs-radio-button {
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
