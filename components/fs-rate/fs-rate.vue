<template>
	<view class="fs-rate">
		<view class="fs-rate-item" @click="handleClick(index)" v-for="(item,index) in count" :key="index">
			<fs-icon
				:type="index < modelValue ? activeIcon : inactiveIcon"
				:color="index < modelValue ? activeColor : inactiveColor"
				:size="iconSize"
				:source="source"
			>
			</fs-icon>
			<view
				v-if="allowHalf && index < modelValue && (index + 1) > modelValue"
				class="fs-rate-half">
				<view class="fs-rate-half-active" :style="{width: size / 2 + 'rpx'}">
					<fs-icon
						:type="activeIcon"
						:color="activeColor"
						:size="iconSize"
						:source="source"
					>
					</fs-icon>
				</view>
				<view class="fs-rate-half-inactive">
					<fs-icon
						:type="activeIcon"
						:color="inactiveColor"
						:size="iconSize"
						:source="source"
					>
					</fs-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'fs-rate',
}
</script>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	modelValue: {
		type: Number,
		default: 0
	},
	count: {
		type: Number,
		default: 5
	},
	activeColor: {
		type: String,
		default: '#F53F3F'
	},
	inactiveColor: {
		type: String,
		default: '#999999'
	},
	size: {
		type: Number,
		default: '40'
	},
	disabled: Boolean,
	activeIcon: {
		type: String,
		default: 'icon-star-fill'
	},
	inactiveIcon: {
		type: String,
		default: 'icon-star'
	},
	source: {
		type: String,
		default: 'inner'
	},
	allowHalf: Boolean,
})
const emits = defineEmits(['update:modelValue', 'change'])

const iconSize = computed(() =>props.size + 'rpx')

const handleClick = index => {
	if (!props.disabled) {
		emits('update:modelValue', index + 1)
		emits('change', index + 1)
	}
}
</script>

<style lang="scss">
.fs-rate{
	display: flex;
	
	&-item{
		position: relative;
		& + &{
			margin-left: 8rpx;
		}
	}
	
	&-half{
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
		overflow: hidden;
		
		&-active{
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
			overflow: hidden;
		}
	}
}
</style>
