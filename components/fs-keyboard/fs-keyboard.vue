<template>
	<view>
		<keyboardCar
			v-if="mode === 'car'"
			:index="index"
			v-model="modelValue"
			@change="handleChange"
			@close="handleClose">
		</keyboardCar>
		
		<keyboardNum
			v-if="mode === 'number'"
			:index="index"
			v-model="modelValue"
			@change="handleChange"
			@close="handleClose"
		/>
	</view>
</template>

<script setup>
import keyboardCar from './car.vue'
import keyboardNum from './number.vue'

const props = defineProps({
	modelValue: Boolean,
	mode: {
		type: String,
		default: 'car'
	},
	index: {
		type: Number,
		default: 0
	}
})
const emits = defineEmits(['update:modelValue', 'change', 'close'])

const handleChange = item => {
	emits('change', item)
}

const handleClose = () => {
	emits('update:modelValue', false)
	emits('close')
}
</script>

<style lang="scss">

</style>
