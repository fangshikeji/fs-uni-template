<template>
	<view class="fs-fab">
		<view class="fs-fab-btn" :style="{right, bottom}">
			<view class="fs-fab-option" :class="{'fs-fab-scale': visible}">
				<fs-avatar
					class="fs-fab-option-gutter"
					v-for="(item,index) in options"
					:key="index"
					:size="size"
					:bgColor="item.bgColor"
					:bgColorType="item.bgColorType"
					@click="handleOption(item)">
					{{item.name}}
				</fs-avatar>
				<slot name="option"></slot>
			</view>
			
			<fs-avatar :size="size" @click="handleToggle">
				<fs-icon type="icon-plus2" :size="iconSize" class="fs-fab-plus" :class="{'fs-fab-visible':visible}"></fs-icon>
			</fs-avatar>
		</view>
		
		<fs-mask v-model="visible"></fs-mask>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
	right: {
		type: String,
		default: '40rpx'
	},
	bottom: {
		type: String,
		default: '40rpx'
	},
	options: {
		type: Array,
		default: () => []
	},
	size: {
		type: String,
		default: '120rpx'
	},
	iconSize: {
		type: String,
		default: '50rpx'
	}
})

const emits = defineEmits(['clickOption'])

const visible = ref(false)

const handleToggle = () => {
	visible.value = !visible.value
}
const handleOption = item => {
	close()
	emits('clickOption',item)
}
const close = () => {
	visible.value = false
}

defineExpose({
	close
})
</script>

<style lang="scss" scoped>
.fs-fab{
	&-btn{
		position: fixed;
		margin-bottom: var(--window-bottom);
		z-index: 1000;
	}
	
	&-plus{
		transition: all .2s;
	}
	&-visible{
		transform: rotate(315deg);
	}
	
	&-option{
		display: flex;
		flex-direction: column;
		margin-bottom: 30rpx;
		transition: all .2s;
		transform: translateY(-50%);
		opacity: 0;
		z-index: -1;
		
		&-gutter{
			margin-top: 20rpx;
		}
	}
	&-scale{
		transform: translateY(0);
		opacity: 1;
		z-index: 1000;
	}
}
</style>
