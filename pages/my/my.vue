<template>
	<view>
		<view class="top pr">
			<image src="/static/images/my/my-bg2.png" mode="widthFix" style="width: 100%;"></image>
			<view class="userInfo" v-if="userInfo.name">
				<fs-cell justify="left" bgColor="transparent">
					<template #title>
						<fs-avatar border :src="userInfo.photo" size="120rpx" link="./userInfo" v-if="userInfo.photo"></fs-avatar>
						<fs-wx-avatar v-else></fs-wx-avatar>
					</template>
					<template #value>
						<view class="cell-right">
							<view class="title">{{userInfo.name || userInfo.nickName}}</view>
							<view class="sub">{{userInfo.phone}}</view>
						</view>
					</template>
				</fs-cell>
			</view>
			<navigator url="../login/login" class="login" v-else>登录</navigator>
			
			<view class="top-menu">
				<fs-card>
					<fs-grid :columnNum="4">
						<fs-grid-item>
							<fs-icon type="icon-image" size="40rpx"></fs-icon>
							<view class="content">菜单1</view>
						</fs-grid-item>
						<fs-grid-item>
							<fs-icon type="icon-image" size="40rpx"></fs-icon>
							<view class="content">菜单2</view>
						</fs-grid-item>
						<fs-grid-item>
							<fs-icon type="icon-image" size="40rpx"></fs-icon>
							<view class="content">菜单3</view>
						</fs-grid-item>
						<fs-grid-item>
							<fs-icon type="icon-image" size="40rpx"></fs-icon>
							<view class="content">菜单4</view>
						</fs-grid-item>
					</fs-grid>
				</fs-card>
			</view>
		</view>

		<fs-cell-group arrow border>
			<fs-cell link="./licensePlate/list" value="车辆管理">
				<template #title>
					<fs-icon type="icon-car" colorType="primary"></fs-icon>
				</template>
			</fs-cell>
			<fs-cell link="./address/list" value="地址管理">
				<template #title>
					<fs-icon type="icon-location" colorType="primary"></fs-icon>
				</template>
			</fs-cell>
			<fs-cell link="./org" value="组织架构">
				<template #title>
					<fs-icon type="icon-org" colorType="primary"></fs-icon>
				</template>
			</fs-cell>
			<fs-cell link="./addrbook/list" value="通讯录">
				<template #title>
					<fs-icon type="icon-tongxunlu" colorType="primary"></fs-icon>
				</template>
			</fs-cell>
			<fs-cell link="./notice" value="我的消息">
				<template #title>
					<fs-icon type="icon-notice" colorType="primary"></fs-icon>
				</template>
			</fs-cell>
			<fs-cell link="./feedback" value="意见反馈">
				<template #title>
					<fs-icon type="icon-feedback" colorType="primary"></fs-icon>
				</template>
			</fs-cell>
			<fs-cell link="./version" value="版本记录">
				<template #title>
					<fs-icon type="icon-version" colorType="primary"></fs-icon>
				</template>
			</fs-cell>
		</fs-cell-group>
		
		<fs-gutter height="120rpx"></fs-gutter>
		<fs-button type="primary" round block @click="handleLogout">退出登录</fs-button>
		<fs-gutter height="60rpx"></fs-gutter>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const userInfo = computed(() => store.state.userInfo)

const handleLogout = () => {
	store.dispatch('logout').then(res => {
		console.log('logout')
	})
}
</script>

<style lang="scss" scoped>
.top{
	.userInfo {
		position: absolute;
		left: 20rpx;
		top: 40rpx;
	
		.title,
		.sub {
			color: #fff;
		}
	}
	
	&-menu{
		margin-top: -70rpx;
		margin-bottom: 40rpx;
		position: relative;
		z-index: 100;
	}
}

.login {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, 50%);
	margin-top: -50px;
	color: #fff;
	border: 1px solid #fff;
	height: 40px;
	line-height: 40px;
	width: 100px;
	border-radius: 20px;
	text-align: center;
}
.logout{
	margin: 0 var(--gutter);
}
</style>
