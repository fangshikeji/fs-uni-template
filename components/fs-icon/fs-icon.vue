<template>
	<view 
		:class="[type, colorType, source === 'inner' ? 'fsfont' : 'iconfont']"
		:style="style"
		@click="handleClick"
	>
	</view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	type: String,
	size: {
		type: String,
		default: '36rpx',
	},
	color: String,
	colorType: {
		type: String,
		validator(value) {
			return ['primary', 'success', 'info', 'warning', 'danger', 'gray'].includes(value)
		}
	},
	source: {
		type: String,
		default: 'inner'
	},
	link: String,
	linkType: {
		type: String,
		default: 'navigateTo'
	},
	rotate: String
})

const emits = defineEmits(['click'])

const style = computed(() => {
	let style = `font-size: ${props.size};`

	if (props.color) {
		style += `color: ${props.color};`
	}
	if (props.rotate) {
		style += `transform: rotate(${props.rotate}deg);`
	}
	return style
}) 

const handleClick = () => {
	if (props.link) {
		uni[props.linkType]({
			url: props.link
		})
	}
	emits('click')
}
</script>

<style lang="scss" scoped>
@import '../../common/iconfont.css';
@import './icon.css';

.fsfont{
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
}
</style>

