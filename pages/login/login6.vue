<template>
	<view class="login-box">
		<view class="top-right-corner"></view>
		<view class="lower-left-corner"></view>
		<view class="login-top">欢迎登录</view>
		<fs-form ref="loginRef" :model="loginModel">
			<fs-field bgColor="#f8f7fc" placeholder="请输入账号" v-model="loginModel.name">
				<template #before>
					<fs-icon type="icon-user" color="#666666"></fs-icon>
				</template>
			</fs-field>
			<fs-gutter height="40rpx" bgColor="#fff"></fs-gutter>
			<fs-field bgColor="#f8f7fc" placeholder="请输入密码" v-model="loginModel.password">
				<template #before>
					<fs-icon type="icon-password" color="#666666"></fs-icon>
				</template>
			</fs-field>
			<fs-gutter height="100rpx" bgColor="#fff"></fs-gutter>
			<fs-button full round @click="handleLogin" type="danger">登录</fs-button>
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
.top-right-corner {
	position: fixed;
	top: -280rpx;
	right: -280rpx;
	width: 600rpx;
	height: 600rpx;
	background-color: #fff;
	border: 100rpx solid #ffdddf;
	border-radius: 100%;
	z-index: 1;
}

.lower-left-corner {
	position: fixed;
	bottom: -450rpx;
	left: -200rpx;
	width: 600rpx;
	height: 600rpx;
	background-color: #fff;
	border: 100rpx solid #c7e1fa;
	transform: rotate(-45deg);
	z-index: 1;
}
.login-box{
	padding: 30rpx;
}
.login-top{
	font-size: 50rpx;
	letter-spacing: 5rpx;
	font-weight: bold;
	text-align: center;
	margin: 300rpx 0 100rpx;
}
</style>
