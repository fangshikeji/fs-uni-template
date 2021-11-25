<template>
	<view class="container">
		<fs-form ref="formRef" :model="formModel" class="main">
			<fs-form-item label="联系人">
				<fs-field placeholder="姓名" v-model="formModel.name"></fs-field>
			</fs-form-item>
			<fs-form-item label="手机号">
				<fs-field placeholder="手机号" v-model="formModel.phone"></fs-field>
			</fs-form-item>
			<fs-cell titleWidth="120rpx" title="地址" :value="formModel.address" border arrow @click="chooseAddress"></fs-cell>
			<fs-form-item label="门牌号">
				<fs-field placeholder="例：1号楼1单元101室" v-model="formModel.detail"></fs-field>
			</fs-form-item>
			<fs-cell border title="设为默认地址" justify="right">
				<template #value>
					<fs-switch checked @change="change"></fs-switch>
				</template>
			</fs-cell>
		</fs-form>
		
		<view class="layout-box">
			<fs-button block round @click="handleSubmit">添加</fs-button>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import useForm from '@/hooks/useForm'
import useValidator from '@/hooks/useValidator'

const validator = useValidator()

const formRules = {
	name: {
		required: true,
		message: '请输入姓名'
	},
	phone: { validator: validator.mobile },
	address: {
		required: true,
		message: '请选择地址'
	}
}
const formModel = ref({
	name: '',
	phone: '',
	address: '',
	detail: '',
	default: true
})
const formRef = ref(null)

if (getApp().globalData.addressDetail) {
	formModel.value = getApp().globalData.addressDetail
}

const chooseAddress = () => {
	uni.chooseLocation().then(res => {
		// const [error, data] = res
		console.log(res);
		formModel.address = res.address
	})
}
const change = e => {
	formModel.default = e
}

const form = useForm(formRules, 'formRef')
const handleSubmit = () => {
	form.validate().then(() => {
		console.log('success')
	})
}
</script>

<style lang="scss">
page{
	height: 100%;
	background-color: #fff;
}
</style>
