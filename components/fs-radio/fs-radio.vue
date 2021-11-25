<template>
	<view 
		class="fs-radio" 
		:class="['fs-radio-' + justify,{'fs-radio-reverse': reverse,'fs-radio-inline': inline}]" 
		@click="handleToggle">
	  <fs-icon 
			v-if="icon" 
			source="out" 
			:type="icon" 
			:color-type="selected ? checkedColorType : 'gray'" 
			:size="iconSize" 
			:color="checkedColor">
		</fs-icon>
	  <fs-icon 
			v-else 
			:type="selected ? 'icon-checked' : 'icon-uncheck'" 
			:color-type="selected ? checkedColorType : 'gray'" 
			:size="iconSize" 
			:color="checkedColor">
		</fs-icon>
	  <view class="fs-radio-lable">
	    {{label}}
	    <slot />
	  </view>
	</view>
</template>

<script setup>
import { inject, reactive, watch, toRefs, ref } from 'vue'

const props = defineProps({
	label: String,
	iconSize: {
		type: String,
		default: '42rpx'
	},
	value: {
		type: null,
		required: true
	},
	icon: String,
	checkedColor: String,
	checkedColorType: {
		type: String,
		default: 'primary'
	},
	checked: Boolean
})
const emits = defineEmits(['change'])

const radioGroup = inject('radioGroup')
const { reverse, justify, inline } = radioGroup

let selected = ref(props.checked)
watch(() => props.checked, val => {
	selected.value = val
})

radioGroup.updateChildren({
	selected,
	value: props.value
})

const handleToggle = () => {
	radioGroup.updateValue(props.value)
}
</script>

<style lang="scss" scoped>
.fs-radio{
  display: flex;
  align-items: center;
  justify-content: flex-start;
	padding: 10rpx 0;
	
	&-lable{
	  margin-left: 6rpx;
	  margin-right: 20rpx;
	}
	
	&-reverse{
	  flex-direction: row-reverse;
	  justify-content: flex-end;
	}
	&-reverse &-lable {
		margin-left: 20rpx;
		margin-right: 6rpx;
	}
	&-right{
	  justify-content: space-between;
	}
}
</style>
