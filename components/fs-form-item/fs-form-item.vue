<template>
	<view class="fs-form-item" :class="['fs-form-item-' + position, {'fs-form-item-border': border}]">
		<view class="fs-form-item-label-before" v-if="slots.before">
			<slot name="before"></slot>
		</view>
		<view 
			class="fs-form-item-label" 
			:class="['text-' + align, { 'fs-form-item-required': required }]" 
			:style="{width: width}" 
			v-if="label">
			{{label}}
		</view>
		<view class="fs-form-item-right"><slot></slot></view>
	</view>
</template>

<script setup>
import { inject, provide, computed, useSlots } from 'vue'

const props = defineProps({
	label: String,
	labelWidth: String,
	labelPosition: {
		type: String,
		validator(value) {
			return ['left', 'top'].includes(value)
		}
	},
	labelAlign: {
		type: String,
		validator(value) {
			return ['left', 'center', 'right', 'justify'].includes(value)
		}
	},
	required: Boolean,
	border: {
		type: Boolean,
		default: true
	}
})
const slots = useSlots()

const form = inject('form', {})
const position = props.labelPosition || form.labelPosition || 'left'
const width = props.labelWidth || form.labelWidth || '120rpx'
const align = props.labelAlign || form.labelAlign || 'left'

provide('form-item-position', position)
</script>

<style lang="scss" scoped>
.fs-form-item{
	display: flex;
	background-color: #fff;
	padding: 20rpx var(--gutter);
	min-height: 110rpx;
	
	&-border{
		border-bottom: 2rpx solid var(--border-color);
	}
	
	&-left{
		align-items: center;
		// .label{
		// 	text-align-last: justify;
		// }
	}
	&-top{
		flex-direction: column;
		.form-item-label{
			margin-bottom: 10rpx;
			width: auto !important;
		}
	}
	
	&-label{
		font-size: var(--content-size);
		margin-right: 20rpx;
		
		&-before{
			margin-right: 20rpx;
		}
	}
	&-required{
		position: relative;
		padding-left: 14rpx;
		
		&::before{
			position: absolute;
			content: '*';
			color: red;
			left: 0;
		}
	}
	
	&-right{
		flex: 1;
	}
}
</style>
