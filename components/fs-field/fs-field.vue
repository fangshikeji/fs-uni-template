<template>
	<view class="fs-field" 
		:class="{
			'fs-field-tighten': tighten,
		}"
		:style="{'background-color': bgColor,borderRadius: round ? '80rpx': ''}">
		<view 
			v-if="type === 'textarea'" 
			class="fs-field-textarea" 
			:class="{'fs-field-padding': !formItemPosition}" 
			:style="{height: height}">
			<slot name="before"></slot>
			<textarea 
				class="fs-textarea"
			 	placeholder-class="fs-ph-class"
				:class="{clearable, 'fs-field-border': border}" 
				:name="name"
				:placeholder="placeholder"
			 	:maxlength="maxlength"
			 	:disabled="disabled"
				:value="modelValue"
				:auto-height="autoHeight"
				:fixed="fixed"
				@input="handleInput"
				@focus="handleFocus"
				@blur="handleBlur"
				@confirm="handleConfirm"
			/>
			<fs-icon 
				class="fs-field-icon fs-field-icon-close" 
				type="icon-guanbi2fill" 
				size="20px" 
				@touchstart="handleClear"
				v-if="clearable">
			</fs-icon>
			<slot name="after"></slot>
		</view>
		
		<view 
			class="fs-field-input" 
			:class="{'fs-field-padding': !formItemPosition}"
			v-else>
			<view v-if="slots.before" style="padding-right: 10rpx;"><slot name="before"></slot></view>
			<input 
				class="fs-input" 
			 	placeholder-class="fs-ph-class"
				:class="{clearable, 'fs-field-border': border}" 
				:value="modelValue" 
				:type="type"
				:password="type === 'password'"
				:placeholder="placeholder"
				:name="name" 
				:maxlength="maxlength" 
				:disabled="disabled" 
				@input="handleInput" 
				@focus="handleFocus"
			 	@blur="handleBlur" 
				@confirm="handleConfirm" 
			/>
			<fs-icon 
				class="fs-field-icon fs-field-icon-close" 
				type="icon-guanbi2fill" 
				size="20px"
				@touchstart="handleClear" 
				v-if="clearable">
			</fs-icon>
			<view v-if="slots.after" style="padding-left: 10rpx;"><slot name="after"></slot></view>
		</view>
	</view>
</template>

<script setup>
import { inject, computed, useSlots } from 'vue'

const props = defineProps({
	modelValue: String,
	placeholder: String,
	name: String,
	type: {
		type: String,
		default: 'text'
	},
	maxlength: {
		type: [Number, String],
		default: 140
	},
	disabled: Boolean,
	border: Boolean,
	clearable: Boolean,
	autoHeight: Boolean,
	required: Boolean,
	tighten: Boolean,
	fixed: Boolean,
	round: Boolean,
	height: {
		type: String,
		default: '70rpx'
	},
	bgColor: {
		type: String,
		default: '#fff'
	}
})
const emits = defineEmits(['update:modelValue','focus','blur','confirm'])
const slots = useSlots()

const formItemPosition = inject('form-item-position', '')
const position = computed(() => props.labelPosition || formItemPosition)

const handleInput = e => {
	emits('update:modelValue', e.detail.value)
}
const handleFocus = () => {
	emits('focus')
}
const handleBlur = e => {
	emits('blur', e.detail.value)
}
const handleConfirm = () => {
	emits('confirm')
}
const handleClear = () => {
	emits('update:modelValue', '')
}
</script>

<style lang="scss" scoped>
.fs-field {
	box-sizing: border-box;
	font-size: var(--content-size);
	overflow: hidden;
	
	&-input {
		display: flex;
		height: 70rpx;
		align-items: center;
		position: relative;
		background-color: inherit;
	}
	&-textarea{
		display: flex;
		width: 100%;
		align-items: center;
		position: relative;
	}
	&-padding{
		padding: 20rpx 30rpx;
		height: 90rpx;
	}
	
	&-border{
		border: 2rpx solid var(--border-color) !important;
		border-radius: 4rpx !important;
		&.fs-input,
		&.fs-textarea{
			padding: 20rpx;
		}
	}
	
	&-icon {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		color: var(--sub);
		z-index: 10;
	}
	&-icon-close {
		right: var(--gutter);
	}
	
	&-opacity {
		background-color: rgba(255, 255, 255, .5);
		color: #fff;
		
		.fs-ph-class {
			color: #fff;
		}
	}
	
	&-tighten {
		padding: 0 var(--tighten-gutter);
	}
	&-round {
		border-radius: 35px;
	}
}

.fs-textarea,
.fs-input{
	width: 100%;
	height: 100%;
	flex: 1;
	box-sizing: border-box !important;
	border-radius: 6rpx;
	border: none;
	outline: none;
}
.fs-input {
	background: transparent;
	
	&.fs-clearable {
		padding-right: 70rpx;
	}
}

.fs-ph-class {
	color: #c0c5ce;
	font-size: var(--content-size);
}
</style>
