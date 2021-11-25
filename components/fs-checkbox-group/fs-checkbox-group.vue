<template>
	<view class="fs-checkbox-group" :class="{inline}">
		<slot></slot>
	</view>
</template>

<script setup>
import { provide, reactive, watch, toRefs } from 'vue'

const props = defineProps({
	max: {
		type: Number,
		default: -1
	},
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
	modelValue: {
		type: Array,
		default() {
			return []
		}
	}
})
const emits = defineEmits(['update:modelValue','change'])

const state = reactive({
	selectedValue: props.modelValue,
	children: []
})
watch(() => props.modelValue, val => {
	state.selectedValue = val
})

const checkStrategy = value => {
	state.children.forEach(item => {
		item.selected = state.selectedValue.indexOf(item.value) > -1
	})
}
const updateChildren = child => {
	state.children.push(child)
	checkStrategy()
}
const updateValue = value => {
	const index = state.selectedValue.indexOf(value)
	if (state.selectedValue.length < props.max || props.max === -1) {
		if (index === -1) {
			state.selectedValue.push(value)
		} else {
			state.selectedValue.splice(index, 1)
		}
	} else {
		index > -1 && state.selectedValue.splice(index, 1)
	}
}

watch(() => state.selectedValue, val => {
	checkStrategy()
	emits('update:modelValue', val)
	emits('change', val)
},{deep: true})

provide('checkboxGroup', {
	...toRefs(props),
	updateChildren,
	updateValue
})
</script>

<style lang="scss" scoped>
.fs-checkbox-group{
	&.inline{
		display: flex;
		flex-wrap: wrap;
	}
}
</style>
