<template>
	<view class="fs-collapse">
		<slot></slot>
	</view>
</template>

<script setup>
import { computed, provide, watch, reactive, onMounted, getCurrentInstance } from 'vue'

const props = defineProps({
	accordion: Boolean,
	active: {
		type: [Number, String],
		default: '0'
	},
	position: {
		type: String,
		default: 'right',
		validator(value) {
			return ['left', 'right'].includes(value)
		}
	},
	rotate: {
		type: [Number, String],
		default: 90
	},
	activeType: String,
	activeColor: String,
	allOpen: Boolean,
	border: {
		type: Boolean,
		default: true
	}
})
const emits = defineEmits(['change'])
const emitEvent = (name) => {
	setActive(name)
	emits('change', name)
}

const children = reactive([])
const setActive = (name) => {
	children.forEach(item => {
		if (props.accordion) {
			item.setActive(name === item.name ? !item.open : false)
		} else {
			if (name === item.name) {
				item.setActive(!item.open)
			}
		}
	})
}
provide('collapse', reactive({
	...props,
	children,
	emitEvent
}))
watch(() => props.active, value => {
	setActive(value)
})

defineExpose({
	children
})
</script>

<style lang="scss" scoped>
.fs-collapse{
	// background-color: #fff;
}
</style>
