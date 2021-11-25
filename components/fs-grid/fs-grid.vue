<template>
	<view 
		class="fs-grid" 
		:class="{'fs-grid-border': border}"
		:style="styleStr">
		<slot></slot>
	</view>
</template>

<script setup>
	import { computed, provide } from 'vue'
	
	const props = defineProps({
		gutter: {
			type: [Number,String],
			default: 0
		},
		border: Boolean,
		columnNum: {
			type: Number,
			default: 3
		},
		padding: {
			type: Boolean,
			default: true
		},
		bgColor: {
			type: String,
			default: '#fff'
		},
		radius: Boolean
	})
	
	const styleStr = computed(() => {
		return `grid-template-columns: repeat(${props.columnNum},1fr);gap:${props.gutter};`
	})
	
	provide('fsGrid', props)
	provide('gridBorder', props.border)
	provide('gridPadding', props.padding)
	provide('gridBgColor', props.bgColor)
</script>

<style lang="scss" scoped>
.fs-grid{
	display: grid;
	
	&-border{
		border: 1px solid var(--border-color);
		border-bottom: none;
	}
}
</style>
