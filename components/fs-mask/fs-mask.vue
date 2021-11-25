<template>
	<view class="fs-mask" :style="{'zIndex': zIndex}" v-if="modelValue" @click="handleMask"></view>
</template>

<script setup>
const props = defineProps({
	modelValue: Boolean,
	zIndex: {
		type: Number,
		default: 999
	},
	maskClickable: {
		type: Boolean,
		default: true
	}
})
const emits = defineEmits(['update:modelValue','close'])

const handleMask = () => {
	if (props.maskClickable) {
		emits('update:modelValue', false)
		emits('close')
	}
}
</script>

<style lang="scss">
.fs-mask{
	position: fixed;
	top: var(--window-top);
	right: 0;
	bottom: var(--window-bottom);
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 999;
}
</style>
