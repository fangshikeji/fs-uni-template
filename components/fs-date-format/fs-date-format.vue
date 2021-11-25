<template>
	<view>
		{{dateFormat}}
	</view>
</template>

<script setup>
import 'dayjs'

const props = defineProps({
	date: String,
	format: {
		type: String,
		default: 'YYYY-MM-DD'
	}
})
const emits = defineEmits(['click'])

const dateFormat = dayjs(props.date).format(props.format)

const handleClick = () => {
	emits('click')
}
</script>

<style>

</style>
