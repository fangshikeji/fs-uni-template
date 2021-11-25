<template>
	<view class="fs-radio-group" :class="{inline}">
		<slot></slot>
	</view>
</template>

<script setup>
import { provide, reactive, watch } from 'vue'

const props = defineProps({
	justify: String,
	reverse: Boolean,
	inline: Boolean,
	checkedColor: String,
	checkedColorType: {
	  type: String,
	  default: 'primary',
		validator(value) {
			return ['primary', 'success', 'info', 'warning', 'danger'].includes(value)
		}
	},
	radius: Boolean,
	round: Boolean,
	size: {
	  type: String,
	  validator(value) {
	  	return ['mini', 'small', 'medium'].includes(value)
	  }
	},
	modelValue: String
})
const emits = defineEmits(['update:modelValue', 'change'])

const state = reactive({
	selectedValue: props.modelValue,
	children: []
})
watch(() => props.modelValue, val => {
	state.selectedValue = val
})

const radioStrategy = value => {
	state.children.forEach(item => {
		item.selected = item.value === state.selectedValue
	})
}
const updateChildren = child => {
	state.children.push(child)
	radioStrategy()
}
const updateValue = value => state.selectedValue = value

watch(() => state.selectedValue, val => {
	radioStrategy()
	emits('update:modelValue', val)
	emits('change', val)
})

provide('radioGroup', {
	...props,
	updateChildren,
	updateValue
})
</script>

<style lang="scss">
.fs-radio-group{
	&.inline{
		display: flex;
		flex-wrap: wrap;
	}
}
</style>
