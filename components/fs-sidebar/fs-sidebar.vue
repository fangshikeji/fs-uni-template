<template>
	<view class="fs-side-bar">
		<view class="fs-side-bar-left">
			<view 
				class="fs-side-bar-item line1"
				:class="{'fs-side-bar-active': activeId === item[valueKey]}"
				v-for="(item, index) in list"
				:key="index"
				@click="handleClick(item, index)">
				{{item.title}}
			</view>
		</view>
		<view class="fs-side-bar-right">
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
	list: {
		type: Array,
		default() {
			return []
		}
	},
	value: null,
	valueKey: {
		type: String,
		default: 'id'
	}
})
const emits = defineEmits(['change'])

const activeId = ref(props.value)
const handleClick = (item, index) => {
	activeId.value = item[props.valueKey]
	emits('change', {
		item,
		index
	})
}
</script>

<style lang="scss" scoped>
.fs-side-bar{
	display: flex;
	height: 100%;
	
	&-left{
		width: 200rpx;
		flex-shrink: 0;
		background-color: #fafafa;
		overflow: auto;
	}
	
	&-item{
		padding: 26rpx var(--gutter);
		position: relative;
	}
	&-active{
		background-color: #fff;
		color: var(--primary);
		&::before{
			position: absolute;
			content: '';
			left: 0;
			top: 0;
			height: 100%;
			width: 4rpx;
			background-color: currentColor;
		}
	}
	
	&-right{
		flex: 1;
		background-color: #fff;
		overflow: auto;
	}
}
</style>
