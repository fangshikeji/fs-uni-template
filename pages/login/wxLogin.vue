<template>
	<view class="">
		<image src="/static/images/login/login-bg.png" mode="widthFix" style="width: 100vw;"></image>
		<view class="login-box">
			<fs-button block type="success" radius @click="getUserProfile">微信登录</fs-button>
		</view>
	</view>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()

const getUserProfile = () => {
	wx.getUserProfile({
		desc: '用于完善会员资料',
		success: res => {
			store.dispatch('wxLogin').then(res => {
				
			})
		}
	})
}
</script>

<style>
page{
	background-color: #fff;
	height: 100%;
	overflow: hidden;
}
</style>
<style lang="scss" scoped>
.login-box{
	position: fixed;
	bottom: 100rpx;
	left: 0;
	right: 0;
}
</style>
