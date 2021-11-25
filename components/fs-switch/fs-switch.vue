<template>
	<switch 
		class="fs-switch" 
		:checked="checked" 
		:color="color" 
		:disabled="disabled" 
		:class="[size]"
		@change="change">
	</switch>
</template>

<script setup>
const props = defineProps({
	checked: Boolean,
	disabled: Boolean,
	color: String,
	size: {
		type: String,
		validator(value) {
			return ['small', 'medium'].includes(value)
		}
	}
})
const emits = defineEmits(['change'])

const change = e => {
	emits('change', e.detail.value)
}
</script>

<style lang="scss" scoped>
.fs-switch{
	transform: scale(0.8);
	&.medium{
		transform: scale(0.6);
	}
	&.small{
		transform: scale(0.5);
	}
}
</style>
