<template>
	<view class="login-box">
		<view class="text-center">
			<image src="/static/images/login/logo.png" mode="widthFix" style="width: 500rpx"></image>
		</view>
		<view class="login-top">
			<view>欢迎回来!</view>
		</view>
		<fs-form ref="loginRef" :model="loginModel">
			<fs-field class="radius" placeholder="请输入账号" v-model="loginModel.name">
				<template #before>
					<fs-icon type="icon-user" color="#666666"></fs-icon>
				</template>
			</fs-field>
			<fs-gutter height="40rpx" bgColor="#F6F7FB"></fs-gutter>
			<fs-field class="radius" placeholder="请输入密码" v-model="loginModel.password">
				<template #before>
					<fs-icon type="icon-password" color="#666666"></fs-icon>
				</template>
			</fs-field>
			<fs-gutter height="100rpx" bgColor="#F6F7FB"></fs-gutter>
			<fs-button full radius @click="handleLogin">登录</fs-button>
		</fs-form>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import useForm from '@/hooks/useForm'

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
		console.log('success')
	})
}
</script>

<style lang="scss" scoped>
page{
	background-color: #F6F7FB;
}

.login-box{
	padding: 30rpx;
}
.login-top{
	color: #041B3D;
	font-size: 24px;
	font-family: Source Han Sans SC;
	margin: 50rpx 0;
	
	&-sub{
		font-size: 18px;
		color: #b0b0b1;
	}
}
</style>
