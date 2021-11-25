<template>
	<fs-popup direction="bottom" height="auto" v-model="visible" :showMask="showMask" :maskClickable="maskClickable">
		<view class="fs-action">
			<view class="fs-action-item" v-for="(item, index) in list" :key="index" @click="handleAction(item)">{{item.name}}</view>
			<view class="fs-action-extra">
				<slot></slot>
			</view>
			<view class="fs-action-cancel" v-if="showCancel" @click="cancel">{{cancelText}}</view>
		</view>
	</fs-popup>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	list: Array,
	modelValue: Boolean,
	showMask: {
		type: Boolean,
		default: true
	},
	maskClickable: {
		type: Boolean,
		default: true
	},
	cancelText: {
		type: String,
		default: '取消'
	},
	showCancel: {
		type: Boolean,
		default: true
	}
})
const emits = defineEmits(['update:modelValue', ''])

const visible = computed(
	{
		get: () => props.modelValue,
		set: value => emits('update:modelValue', value)
	}
)

const cancel = () => {
	emits('update:modelValue', false)
}
const handleAction = item =>  {
	emits('change', item)
	cancel()
}
</script>

<style lang="scss" scoped>
.fs-action {
	background-color: #f8f8f8;
	
	&-item {
		padding: 20rpx;
		text-align: center;
		background-color: #fff;
	
		&+& {
			border-top: 1px solid var(--border-color);
		}
	}
	
	&-cancel {
		padding: 20rpx;
		text-align: center;
		background-color: #fff;
		margin-top: 10rpx;
	}
}
</style>
