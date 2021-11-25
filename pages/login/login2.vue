<template>
	<view class="layout-box">
		<view class="login-bg pr">
			<image src="/static/images/login/login-sw.jpg" mode="widthFix" style="width: 100%;"></image>
			<view class="bg-text">
				<view class="bg-text-hd">您好</view>
				<view class="bg-text-bd">欢迎登录</view>
			</view>
		</view>
		<view class="login-shadow">
			<fs-tab :tabs="tabs" v-model="curTab" barWidth="96rpx"></fs-tab>
			<fs-form ref="loginRef" :model="curLoginModel">
				<view v-show="curTab === 0">
					<fs-form-item>
						<fs-field placeholder="请输入手机号" type="number" v-model="loginModel1.phone" maxlength=11></fs-field>
					</fs-form-item>
					<fs-form-item>
						<fs-field type="number" placeholder="请输入验证码" v-model="loginModel1.code" maxlength=6>
							<template #after>
								<fs-captcha :mobile="loginModel1.phone" @start="sendCaptcha" @end="endCaptcha"></fs-captcha>
							</template>
						</fs-field>
					</fs-form-item>
				</view>
				<view v-show="curTab === 1">
					<fs-form-item>
						<fs-field placeholder="账号" v-model="loginModel2.name" maxlength=11></fs-field>
					</fs-form-item>
					<fs-form-item>
						<fs-field placeholder="密码" type="password" v-model="loginModel2.password" maxlength=20></fs-field>
					</fs-form-item>
				</view>
			</fs-form>
			
			<fs-cell justify="right">
				<navigator class="primary fs12" slot="title" url="./forgetPwd" v-show="curTab === 0">忘记密码？</navigator>
				<navigator class="primary fs12" slot="value" url="./register">去注册</navigator>
			</fs-cell>
		</view>
		<view class="login-btn">
			<fs-button block round type="primary" @click="handleLogin">登录</fs-button>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import useForm from '@/hooks/useForm'
import useValidator from '@/hooks/useValidator'
import { useStore } from 'vuex'

const store = useStore()
const tabs = [
	{
		name: '验证码登录',
	},
	{
		name: '密码登录',
	}
]
const curTab = ref(0)

const validator = useValidator()
const loginRules1 = {
	phone: { validator: validator.mobile },
	code: { required: true, message: '请输入验证码'}
}
const loginModel1 = reactive({
	phone: '',
	code: ''
})
const loginRules2 = {
	name: { required: true, message: '请输入账号'},
	password: { required: true, message: '请输入密码'}
}
const loginModel2 = reactive({
	name: '',
	password: ''
})
const curLoginModel = computed(() => curTab.value === 0 ? loginModel1 : loginModel2)

const loginRef = ref(null)
const loginForm = useForm(loginRules1, 'loginRef')
watch(curTab, () => {
	loginForm.setRules(curTab.value === 0 ? loginRules1 : loginRules2)
})
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
page {
	background-color: #fff;
}
</style>
<style lang="scss" scoped>
.login-bg{
	margin-top: 20rpx;
}
.bg-text{
	position: absolute;
	left: 80rpx;
	top: 0;
	
	&-hd{
		font-size: 25px;
		line-height: 20px;
		margin-bottom: 20rpx;
	}
	&-bd{
		font-size: 16px;
	}
}
.login-shadow {
	border-radius: 40rpx;
	overflow: hidden;
	padding-bottom: 60rpx;
	// box-shadow: 0 0 8px 1px rgba(65, 65, 70, 0.2);
}

.login-btn {
	padding: 0 100rpx;
	margin-top: -50rpx;
}
</style>
