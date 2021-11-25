<template>
	<view class="fs-search-box" :style="{backgroundColor: bgColor}">
		<view class="fs-input-box" :class="[{round}]" @click="handleLink" :style="{backgroundColor: inputBgColor}">
			<view class="sub fs-input" v-if="link">{{placeholder}}</view>
			<input
				v-else 
				class="fs-input"
				:value="modelValue"
				:type="type" 
				:placeholder="placeholder" 
				@input="handleChange" 
				@focus="handleFocus" 
				@blur="handleBlur" 
				:focus="autoFocus"
			/>
			<view class="fs-icon fs-icon-search">
				<slot name="icon">
					<fs-icon type="icon-search" color="#666666" size="32rpx"></fs-icon>
				</slot>
			</view>
			<view class="fs-icon fs-icon-close" v-if="modelValue" @click="handleClear">
				<fs-icon type="icon-close" color="#666666"></fs-icon>
			</view>
		</view>
		<view 
			v-if="showAction"
			class="fs-cancel" 
			:class="[actionColorType]" 
			:style="{color:actionColor}"
			@click="handleAction" 
		>
			{{actionText}}
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	
	const props = defineProps({
		placeholder: {
			type: String,
			default: '搜索'
		},
		actionColor: String,
		actionColorType: {
			type: String,
			validator(value) {
				return ['primary', 'success', 'info', 'warning', 'danger'].includes(value)
			}
		},
		actionText: {
			type: String,
			default: '取消'
		},
		autoFocus: Boolean,
		showAction: Boolean,
		round: Boolean,
		type: {
			type: String,
			default: 'text'
		},
		bgColor: {
			type: String,
			default: '#fff'
		},
		inputBgColor: {
			type: String,
			default: '#f0f0f0'
		},
		link: String,
		linkType: {
			type: String,
			default: 'navigateTo'
		},
		modelValue: String
	})
	
	const emits = defineEmits(['action', 'focus', 'blur', 'update:modelValue','change'])
	
	const handleChange = (e) => {
		emits('update:modelValue', e.detail.value)
		emits('change', e.detail.value)
	}
	const handleFocus = () => {
		emits('focus')
	}
	const handleBlur = () => {
		emits('blur')
	}
	const handleClear = () => {
		emits('update:modelValue', '')
		emits('change', '')
	}
	const handleAction = () => {
		emits('action', props.modelValue)
	}
	const handleLink = () => {
		if (props.link) {
			uni[props.linkType]({
				url: props.link
			})
		}
	}
</script>

<style lang="scss" scoped>
.fs-search-box{
  width: 100%;
  height: 110rpx;
  padding: 20rpx var(--gutter);
  display: flex;
  background-color: #fff;
  box-sizing: border-box;
  align-items: center;
}
.fs-input-box {
  position: relative;
  height: 100%;
  width: 100%;
  flex: 1;
  background-color: #f0f0f0;
	
	.sub{
	  line-height: 70rpx;
	  color: var(--sub);
	}
	
	&.round{
		border-radius: 20px;
		.fs-input{
			border-radius: inherit;
		}
	}
}
.fs-input{
  height: 100%;
  width: 100%;
  padding-left: 62rpx;
  padding-right: 60rpx;
  border-radius: 6rpx;
  box-sizing: border-box;
	outline: none;
	
	/* #ifdef H5 */
	background-color: inherit;
	border: none;
	/* #endif */
}

.fs-cancel{
  margin-left: 20rpx;
}
.fs-icon{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: var(--sub);
  z-index: 10;
}
.fs-icon-search{
  left: 20rpx;
	line-height: 1;
}
.fs-icon-close{
  right: 20rpx;
}
</style>
