<template>
	<view>
		<image src="/static/images/login/login-car.png" mode="widthFix" style="width: 100vw;"></image>
		
		<view class="login-box">
			<view class="login-box-top">手机号登录</view>
			<fs-form ref="loginRef" :model="loginModel">
				<fs-form-item>
					<fs-field placeholder="请输入手机号" v-model="loginModel.phone"></fs-field>
				</fs-form-item>
				<fs-form-item>
					<fs-field placeholder="请输入验证码" v-model="loginModel.code">
						<template #after>
							<fs-captcha :mobile="loginModel.phone" @start="sendCaptcha" @end="endCaptcha"></fs-captcha>
						</template>
					</fs-field>
				</fs-form-item>
				<fs-gutter height="160rpx" bgColor="#fff"></fs-gutter>
				<fs-button full round @click="handleLogin">登录</fs-button>
				<fs-gutter height="60rpx" bgColor="#fff"></fs-gutter>
			</fs-form>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import useForm from '@/hooks/useForm'
import useValidator from '@/hooks/useValidator'
import { useStore } from 'vuex'

const store = useStore()
const validator = useValidator()
const loginRules = {
	phone: { validator: validator.mobile},
	code: {
		required: true,
		message: '请输入密码'
	}
}
const loginModel = reactive({
	phone: '',
	code: ''
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

const sendCaptcha = () => {
	console.log('sendCaptcha');
}
const endCaptcha = () => {
	console.log('endCaptcha');
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
	left: 40rpx;
	right: 40rpx;
	top: 260rpx;
	background-color: #fff;
	border-radius: 20rpx;
	padding: 60rpx;
	overflow: hidden;
	
	&-top{
		font-size: 20px;
		color: #222;
		font-weight: 500;
		margin: 40rpx 0;
	}
}
.login-top{
	color: #222222;
	font-size: 30px;
	font-weight: bold;
	margin: 100rpx 0;
}
</style>
