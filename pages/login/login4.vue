<template>
	<view class="login-box">
		<view class="login-bg"></view>
		<view class="login-bg2"></view>
		<view class="login-top">
			<view>登录</view>
			<view class="login-top-sub">欢迎再次回来~</view>
		</view>
		<fs-form ref="loginRef" :model="loginModel">
			<fs-field bgColor="#f8f8f8" round placeholder="请输入账号" v-model="loginModel.name">
				<template #before>
					<fs-icon type="icon-user" color="#666666"></fs-icon>
				</template>
			</fs-field>
			<fs-gutter height="40rpx" bgColor="#fff"></fs-gutter>
			<fs-field bgColor="#f8f8f8" round placeholder="请输入密码" v-model="loginModel.password">
				<template #before>
					<fs-icon type="icon-password" color="#666666"></fs-icon>
				</template>
			</fs-field>
			<fs-gutter height="100rpx" bgColor="#fff"></fs-gutter>
			<fs-button full round @click="handleLogin" :customStyle="{background: 'linear-gradient(to right, #00c6fc, #9adcf1)'}">登录</fs-button>
		</fs-form>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import useForm from '@/hooks/useForm'
import { useStore } from 'vuex'

const store = useStore()
const loginRules = {
	name: {
		required: true,
		message: '请输入账号'
	},
	password: {
		required: true,
		message: '请输入密码'
	}
}
const loginModel = reactive({
	name: '',
	password: ''
})
const loginRef = ref(null)

const loginForm = useForm(loginRules, 'loginRef')
const handleLogin = () => {
	loginForm.validate().then(() => {
		store.dispatch('login', {
			...loginModel
		}).then(res => {
			uni.navigateBack()
		})
	})
}
</script>

<style>
page{
	background-color: #fff;
}
</style>
<style lang="scss" scoped>
.login{
	&-bg {
		position: fixed;
		top: -250rpx;
		right: -250rpx;
		width: 600rpx;
		height: 600rpx;
		border-radius: 100%;
		background-color: #00baef;
		z-index: 2
	}
	
	&-bg2 {
		position: fixed;
		top: -150rpx;
		right: -300rpx;
		width: 600rpx;
		height: 600rpx;
		border-radius: 100%;
		background-color: #ade8f9;
		z-index: 1;
	}
}
.login-box{
	padding: 30rpx;
}
.login-top{
	color: #222222;
	font-size: 30px;
	font-weight: bold;
	margin: 150rpx 0;
	
	&-sub{
		font-size: 16px;
		color: #b0b0b1;
	}
}
</style>
