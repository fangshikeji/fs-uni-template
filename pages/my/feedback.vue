<template>
	<view class="container">
		<fs-tab :tabs="tabs" v-model="tabActive"></fs-tab>
		<view class="main" v-show="tabActive === 0">
			<fs-panel title="请选择您遇到的问题">
				<template #content>
					<fs-radio-group v-model="curProblem">
						<fs-radio-cell 
							v-for="(item,index) in problemList" 
							:key="index"
							:label="item.label"
							:value="item.label">
						</fs-radio-cell>
					</fs-radio-group>
					<!-- <fs-cell
						border
						justify="right" 
						:title="item.title" 
						@click="selectProblem(index)"
						v-for="(item, index) in problemList">
						<template #value>
							<fs-icon type="icon-right" colorType="primary" v-show="curProblemIndex === index"></fs-icon>
						</template>
					</fs-cell> -->
				</template>
			</fs-panel>

			<fs-panel title="请补充详情问题和意见(必填)">
				<template #content>
					<view class="textarea-box">
						<fs-field type="textarea" height="200rpx" placeholder="请输入问题描述..." v-model="state.detail"></fs-field>
						<view class="input-num">{{state.detail.length}}/140</view>
					</view>
				</template>
			</fs-panel>

			<fs-panel title="请上传相关问题图片">
				<template #content>
					<fs-upload v-model="state.photoList" cloudUpload></fs-upload>
				</template>
			</fs-panel>

			<fs-button block round @click="handleSubmit">提交</fs-button>
			<fs-gutter bgColor="#fff"></fs-gutter>
		</view>
		<view class="main" v-show="tabActive === 1">
			<div v-for="item in state.adviceList" :key="item.id">
				<div class="list-hd title-hd title-color">{{item.type}}</div>
				<div class="list-bd list-color">回复：{{item.replyContent}}</div>
			</div>
			<fs-empty v-if="!state.adviceList.length"></fs-empty>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { addAdvice, getAdviceList } from '@/services/common'

const tabs = [
	{
		name: '提建议',
	},
	{
		name: '反馈',
	}
]
const tabActive = ref(0)

const problemList = [
	{
		label: '功能异常：功能故障或不可用'
	},
	{
		label: '产品建议：用的不爽，我有建议'
	},
	{
		label: '安全问题：密码、隐私、欺诈等'
	},
	{
		label: '其他问题'
	},
]
const curProblem = ref(problemList[0].label)

const state = reactive({
	detail: '',
	photoList: [],
	adviceList: []
})

const fetchList = () => {
	getAdviceList().then(res => {
		console.log('feed', res);
		// state.adviceList = res.data
	})
}
// fetchList()

const handleSubmit = () => {
	console.log(curProblem.value);
	if (!state.detail) {
		return uni.showToast({
			title: '请输入问题描述',
			icon: 'none'
		})
	}
	const images = state.photoList.map(item => item.name).join(',')

	addAdvice({
		type: curProblem.value,
		content: state.detail,
		images
	}).then(res => {
		uni.showToast({
			icon: 'none',
			title: '提交成功'
		})
		setTimeout(function() {
			uni.navigateBack()
		}, 1500)
	})
}
</script>

<style>
	page{
		height: 100%;
	}
</style>
<style lang="scss" scoped>
.main{
	background-color: white;
}
.textarea-box {
	width: 100%;
	height: 240rpx;
	background: #fff;
	box-sizing: border-box;
	position: relative;
}

.input-num {
	position: absolute;
	right: 30rpx;
	bottom: 20rpx;
	color: #AAAAAA;
	font-size: 30rpx;
	z-index: 10;
}
.title-hd{
	margin: 0rpx 30rpx;
}
.list-bd{
	background-color: #F2F2F2;
	border-radius: 8rpx;
	padding: 10rpx 10rpx 40rpx 10rpx;
	margin: 0 30rpx;
}
.list-color{
	color: #858585;
	background-color: #F0F0F0;
}
</style>
