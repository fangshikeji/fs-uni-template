<template>
	<view 
		class="fs-checkbox" 
		:class="[justify,{'fs-checkbox-reverse':reverse, 'fs-checkbox-inline': inline}]" 
		@click="handleToggle">
		<fs-icon 
			v-if="icon" 
			source="out" 
			:type="icon" 
			:colorType="selected ? checkedColorType : 'gray'" 
			:size="iconSize"
			:color="checkedColor">
		</fs-icon>
		<fs-icon 
			v-else 
			:type="selected ? 'icon-squarecheck' : 'icon-square'" 
			:colorType="selected ? checkedColorType : 'gray'"
			:size="iconSize"
			:color="checkedColor">
		</fs-icon>
		<view class="fs-checkbox-lable">
			{{label}}
			<slot />
		</view>
	</view>
</template>

<script setup>
import { inject, watch, toRefs, ref, computed } from 'vue'
	
const props = defineProps({
	label: String,
	icon: String,
	iconSize: {
		type: String,
		default: '40rpx'
	},
	value: {
		type: null,
		required: true
	},
	checkedColor: String,
	checkedColorType: {
		type: String,
		default: 'primary'
	}
})

const checkboxGroup = inject('checkboxGroup')
const { reverse, inline, justify } = checkboxGroup

let selected = ref(false)
checkboxGroup.updateChildren({
	selected,
	value: props.value
})

const handleToggle = () => {
	checkboxGroup.updateValue(props.value)
}
</script>

<style lang="scss" scoped>
.fs-checkbox {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-bottom: 14rpx;
	
	&-lable {
		margin-left: 6rpx;
		margin-right: 20rpx;
	}
	
	&-reverse {
		flex-direction: row-reverse;
		justify-content: flex-end;
	}
	&-reverse &-lable {
		margin-left: 0;
		margin-right: 6rpx;
	}
	
	&.right {
		justify-content: space-between;
	}
}
</style>
