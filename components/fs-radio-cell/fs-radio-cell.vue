<template>
	<fs-cell
		border
		justify="right" 
		@click="handleToggle">
		<template #title>
			<view :class="selected ? checkedColorType : ''" :style="{color: selected ? checkedColor : ''}">
				<slot>{{label}}</slot>
			</view>
		</template>
		<template #value>
			<fs-icon type="icon-right" :colorType="checkedColorType" :color="checkedColor" v-if="selected"></fs-icon>
		</template>
	</fs-cell>
</template>

<script setup>
import { ref, watch, inject } from 'vue'

const props = defineProps({
	label: String,
	value: {
		type: null,
		required: true
	},
	checkedColor: String,
	checkedColorType: String,
	checked: Boolean
})

let selected = ref(props.checked)
watch(() => props.checked, val => {
	selected.value = val
})

const radioGroup = inject('radioGroup')
const checkedColorType = props.checkedColorType || radioGroup.checkedColorType
const checkedColor = props.checkedColor || radioGroup.checkedColor

radioGroup.updateChildren({
	selected,
	value: props.value
})

const handleToggle = () => {
	radioGroup.updateValue(props.value)
}
</script>

<style lang="scss" scoped>

</style>
