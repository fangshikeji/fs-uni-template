<template>
	<fs-cell
		border
		justify="right" 
		:title="label" 
		@click="handleToggle">
		<template #title>
			<slot></slot>
		</template>
		<template #value>
			<fs-icon type="icon-right" :color="checkedColor" :colorType="checkedColorType" v-if="selected"></fs-icon>
		</template>
	</fs-cell>
</template>

<script setup>
import { ref, watch, inject, toRefs } from 'vue'

const props = defineProps({
	label: String,
	value: {
		type: null,
		required: true
	},
	checkedColor: String,
	checkedColorType: String,
})

const checkboxGroup = inject('checkboxGroup')
const { reverse, inline, justify } = checkboxGroup

const checkedColorType = props.checkedColorType || checkboxGroup.checkedColorType
const checkedColor = props.checkedColor || checkboxGroup.checkedColor

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

</style>
