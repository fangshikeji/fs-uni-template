<template>
	<view class="login-box">
		<view class="login-top">
			<view>您好</view>
			<view>欢迎登录</view>
		</view>
		<fs-form ref="loginRef" :model="loginModel">
			<fs-form-item>
				<template #before>
					<fs-icon type="icon-user"></fs-icon>
				</template>
				<fs-field placeholder="请输入账号" v-model="loginModel.name"></fs-field>
			</fs-form-item>
			<fs-form-item>
				<template #before>
					<fs-icon type="icon-password"></fs-icon>
				</template>
				<fs-field placeholder="请输入密码" v-model="loginModel.password"></fs-field>
			</fs-form-item>
			<fs-gutter height="100rpx" bgColor="#fff"></fs-gutter>
			<fs-button full @click="handleLogin">登录</fs-button>
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
.login-box{
	padding: 30rpx;
}
.login-top{
	color: #222222;
	font-size: 30px;
	font-weight: bold;
	margin: 100rpx 0;
}
</style>
