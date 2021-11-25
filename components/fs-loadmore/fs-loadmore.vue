<template>
	<view>
		<slot></slot>
		<fs-empty v-if="!state.loading && !state.dataList.length"></fs-empty>
		<fs-divider v-if="!state.hasMore">{{nomore}}</fs-divider>
	</view>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({
	modelValue: {
		type: Array,
		default() {
			return []
		}
	},
	fetchList: Function,
	pageSize: {
		type: Number,
		default: 20
	},
	pullDownRefresh: Boolean,
	nomore: {
		type: String,
		default: '没有更多了～'
	}
})
const emits = defineEmits(['update:modelValue'])

const state = reactive({
	loading: true,
	dataList: props.modelValue,
	pageNo: 1,
	pageSize: props.pageSize,
	hasMore: true
})

const query = (loadmore) => {
	state.loading = true
	if (loadmore) {
		state.pageNo++
	} else{
		state.pageNo = 1
	}
	return props.fetchList({
		pageNo: state.pageNo,
		pageSize: props.pageSize
	}).then(res => {
		state.hasMore = res.length >= state.pageSize
		state.dataList = loadmore ? [...state.dataList, ...res] : res
		state.loading = false
		emits('update:modelValue', state.dataList)
	})
}

const refresh = () => {
	state.dataList = []
	emits('update:modelValue', state.dataList)
	query()
}

defineExpose({
	query,
	refresh,
	hasMore: state.hasMore,
	pullDownRefresh: props.pullDownRefresh
})
</script>

<style>

</style>
