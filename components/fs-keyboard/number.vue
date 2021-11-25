<template>
	<view class="fs-keyboard-number" v-if="modelValue">
		<fs-grid border>
			<fs-grid-item v-for="item in 9" :key="item" class="fs-keyboard-number-item" @click="handleClick(item)">
				{{item}}
			</fs-grid-item>
			<fs-grid-item class="fs-keyboard-number-item fs-keyboard-number-bg"></fs-grid-item>
			<fs-grid-item class="fs-keyboard-number-item" @click="handleClick(0)">0</fs-grid-item>
			<fs-grid-item class="fs-keyboard-number-item fs-keyboard-number-bg" @click="handleClick('del')">
				<fs-icon type="icon-backspace" size="60rpx"></fs-icon>
			</fs-grid-item>
		</fs-grid>
	</view>
</template>

<script setup>
const props = defineProps({
	modelValue: Boolean,
	index: {
		type: Number,
		default: 0
	}
})
const emits = defineEmits(['update:modelValue', 'update:index', 'change', 'close'])

const handleClick = item => {
	emits('change', item)
}
</script>

<style lang="scss">
.fs-keyboard-number{
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 999;
	
	&-item{
		font-size: 24px;
	}
	&-bg{
		background-color: #e7e6eb;
	}
}
</style>
