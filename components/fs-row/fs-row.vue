<template>
	<view class="fs-row" :style="{marginLeft: margin,marginRight:margin}">
		<slot></slot>
	</view>
</template>

<script setup>
import { computed, toRefs, provide } from 'vue'

const props = defineProps({
	gutter: {
		type: [Number,String],
		default: 0
	}
})

const margin = computed(() => `${parseInt(props.gutter) / -2}rpx`)

provide('rowGap', props.gutter)
</script>

<style lang="scss" scoped>
.fs-row::after{
  content: '';
  display: table;
  clear: both;
}
</style>
