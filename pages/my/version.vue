<template>
	<view class="fs-version-list">
		<view class="fs-version-list-item" v-for="item in vList">
			<view class="flex justify-between align-center">
				<view class="fs-version-bd primary">{{item.number}}</view>
				<view class="fs-version-time">
					<fs-date-format :date="item.date"></fs-date-format>
				</view>
			</view>
			<view class="title">本次更新</view>
			<view class="content">{{item.content}}</view>
		</view>
	</view>
</template>

<script setup>
const vList = [
	{
		number: '2.0',
		date: '2021/08/10',
		content: '更新内容'
	},
	{
		number: '1.0',
		date: '2021/05/10',
		content: '更新内容'
	}
]
</script>

<style lang="scss" scoped>
.fs-version-list{
	background-color: #fff;
	padding: 0 var(--gutter);
	
	&-item {
		padding: 20rpx 0;

		&+& {
			border-top: 2rpx solid #DDDFE5;
		}
	}
	.title{
		color: #162746;
		font-size: 15px;
		line-height: 26px;
	}

	.content {
		color: #5E6678;
		position: relative;
		padding-left: 30rpx;
		line-height: 26px;

		&::before {
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 8rpx;
			height: 8rpx;
			border-radius: 50%;
			background-color: var(--primary);
			content: '';
		}
	}
}
	
.fs-version{
	&-time{
		font-size: 13px;
		color: #5E6678;
		letter-spacing: 1px;
	}

	&-bd{
		font-size: 18px;
		position: relative;
	
		&::before {
			position: absolute;
			bottom: 5px;
			left: 0;
			width: 100%;
			height: 5px;
			background-color: currentColor;
			opacity: 0.2;
			content: '';
		}
	}
}
</style>
