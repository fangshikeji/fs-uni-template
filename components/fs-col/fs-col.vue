<template>
	<view class="fs-col" :class="['fs-col-' + span,{gutter}]" :style="styleStr">
		<slot></slot>
	</view>
</template>

<script setup>
import { computed, toRefs, inject } from 'vue'

const props = defineProps({
	span: {
		type: [Number, String],
		default: 12
	},
	gutter: Boolean
})

const rowGap = inject('rowGap')

const styleStr = computed(() => {
	const padding = parseInt(rowGap) / 2
	return padding ? `padding-left: ${padding}rpx;padding-right: ${padding}rpx;` : ''
})
</script>

<style lang="scss" scoped>
@use "sass:math";

.fs-col {
	float: left;
	
	&.gutter {
		margin-bottom: var(--gutter-v);
	}
}
@for $i from 1 through 12 {
	.fs-col-#{$i} {
		width: math.div(100%, 12) * $i;
	}
}

</style>
