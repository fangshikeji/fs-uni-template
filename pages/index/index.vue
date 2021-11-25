<template>
	<view>
		<fs-swiper :list="list1"></fs-swiper>
		
		<fs-grid :columnNum="4">
			<fs-grid-item>
				<view class="text-center">
					<fs-avatar size="90rpx" src="/static/images/menu/menu1.png"></fs-avatar>
					<view class="menu-item">菜单1</view>
				</view>
			</fs-grid-item>
			<fs-grid-item>
				<view class="text-center">
					<fs-avatar size="90rpx" src="/static/images/menu/menu2.png"></fs-avatar>
					<view class="menu-item">菜单2</view>
				</view>
			</fs-grid-item>
			<fs-grid-item>
				<view class="text-center">
					<fs-avatar size="90rpx" src="/static/images/menu/menu3.png"></fs-avatar>
					<view class="menu-item">菜单3</view>
				</view>
			</fs-grid-item>
			<fs-grid-item>
				<view class="text-center">
					<fs-avatar size="90rpx" src="/static/images/menu/menu4.png"></fs-avatar>
					<view class="menu-item">菜单4</view>
				</view>
			</fs-grid-item>
		</fs-grid>
	</view>
</template>

<script setup>
const list1 = [
	{
		src: '/static/images/banner.png'
	},
	{
		src: '/static/images/banner.png'
	},
	{
		src: '/static/images/banner.png'
	}
]
</script>

<style lang="scss" scoped>
.menu-item{
	margin-top: 6rpx;
	font-size: 14px;
}
</style>
