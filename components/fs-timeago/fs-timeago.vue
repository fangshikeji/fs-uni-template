<template>
	<view @click="handleClick">
		{{timeago(dateTime, format)}}
	</view>
</template>

<script setup>
import timeago from '@/utils/timeago'

const props = defineProps({
	dateTime: [String, Number],
	format: {
		type: String,
		default: 'YYYY-MM-DD'
	}
})
const emits = defineEmits(['click'])

const handleClick = () => {
	emits('click')
}
</script>

<style>

</style>
