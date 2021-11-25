<template>
	<view class="fs-collapse-item" :class="{'fs-collapse-item-border':border}">
		<view class="fs-title-box" :class="[{open},position]" @click="handleClick">
			<view class="fs-item-hd" :class="[highlight]">
				<slot name="title"></slot>
			</view>
			<view class="fs-arrow-box" :class="[{open},highlight]">
				<slot name="arrow">
					<view class="fs-arrow"></view>
				</slot>
			</view>
		</view>
		<view class="content" v-if="open">
			<slot name="content"></slot>
		</view>
	</view>
</template>

<script setup>
import { computed, inject, watch, ref } from 'vue'

const props = defineProps({
	name: [String, Number],
	disabled: Boolean
})
const collapse = inject('collapse')

const border = collapse.border
const open = ref(collapse.allOpen || collapse.active === props.name)
const position = collapse.position
const highlight = computed(() => open.value && !props.disabled && collapse.activeType)

const setActive = (active) => {
	open.value = active && !props.disabled
}

collapse.children.push({
	name: props.name,
	open,
	setActive,
})

const handleClick = () => {
	!props.disabled && collapse.emitEvent(props.name)
}
</script>

<style lang="scss" scoped>
.fs-collapse-item {
	&-border{
		border-bottom: 1px solid var(--border-color);
	}
	.open {
		.fs-arrow {
			transform: rotate(135deg);
		}
	}
}

.fs-title-box {
	display: flex;
	padding: 20rpx var(--gutter);
	justify-content: space-between;
	align-items: center;
	
	.fs-item-hd{
		min-width: 0;
		flex: 1;
	}
	&.left{
		flex-direction: row-reverse;
		.fs-item-hd{
			padding-left: 10rpx;
		}
	}
	&.right{
		.fs-item-hd{
			padding-right: 10rpx;
		}
	}
}

.fs-arrow-box{
	line-height: 1;
}

.fs-arrow {
	border-top: 2rpx solid currentColor;
	border-right: 2rpx solid currentColor;
	transform: rotate(45deg);
	width: 16rpx;
	height: 16rpx;
	color: inherit;
	transition: all .1s;
	flex-shrink: 0;
}
</style>
