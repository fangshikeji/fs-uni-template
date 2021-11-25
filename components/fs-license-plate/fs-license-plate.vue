<template>
	<view>
		<view class="title text-center gutter-v" style="padding: 20rpx;">请输入车牌号</view>
		<view class="fs-plate">
			<view
				class="fs-plate-item"
				:class="{'fs-plate-item-active': curIndex === index, 'fs-plate-new': index === 6 && !item}"
				v-for="(item, index) in carNo"
				:key="index"
				@click="handleInput(index)">
					{{item || ''}}
				</view>
		</view>
		<fs-keyboard mode="car" v-model="visible" :index="curIndex" @change="handleChange"></fs-keyboard>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
	modelValue: String
})
const emits = defineEmits(['update:modelValue', 'change'])

const carNo = ref(new Array(7))
if (props.modelValue) {
	for (let i = 0; i < props.modelValue.length; i++) {
		carNo.value[i] = props.modelValue[i]
	}
}
let curIndex = ref(-1)
const handleChange = item => {
	const length = carNo.value.filter(item => item).length
	
	if (item === 'del') {
		if (length >= 1) {
			curIndex.value--
			carNo.value[curIndex.value] = ''
		}
	} else{
		if (length <= 6) {
			carNo.value[curIndex.value] = item
			curIndex.value++
		}
	}
	
	emits('update:modelValue', carNo.value.join(''))
}

let visible = ref(false)
const handleInput = (index) => {
	curIndex.value = index
	visible.value = true
}
</script>

<style lang="scss" scoped>
.fs-plate{
	display: flex;
	justify-content: center;
	align-items: center;
	
	&-item{
		width: 70rpx;
		height: 80rpx;		
		line-height: 80rpx;		
		border-radius: 8rpx;
		border: 1px solid #CBCBCB;
		text-align: center;
		
		& + &{
			margin-left: 20rpx;
		}
		
		&-active{
			border-color: var(--primary);
		}
	}
	&-new{
		position: relative;
		&::after{
			content: "新能源";
			color: #999999;
			width: 100%;
			font-size: 9px;
			text-align: center;
			position: absolute;
			left: 0;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
		}
	}
}
</style>
