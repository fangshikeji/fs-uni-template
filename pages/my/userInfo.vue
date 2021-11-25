<template>
	<fs-form ref="formRef">
		<fs-cell title="头像" justify="right" border tighten>
			<template #value>
				<fs-avatar bgColor="#EBEFF5" :src="userInfo.photo" @click="handleUpload">
					<fs-icon type="icon-photo"></fs-icon>
				</fs-avatar>
			</template>
		</fs-cell>
		<fs-form-item required label="姓名">
			<fs-field placeholder="请输入姓名" v-model="userInfo.name"></fs-field>
		</fs-form-item>
		<fs-form-item required label="手机号">
			<fs-field placeholder="请输入手机号" v-model="userInfo.mobile"></fs-field>
		</fs-form-item>
		<fs-form-item label="性别">
			<fs-radio-group inline  v-model="userInfo.sex">
				<fs-radio value="1">男</fs-radio>
				<fs-radio value="2">女</fs-radio>
			</fs-radio-group>
		</fs-form-item>
		<fs-gutter height="100rpx"></fs-gutter>
		<fs-button block round @click="handleSave">保存</fs-button>
	</fs-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import useForm from '@/hooks/useForm'
import useValidator from '@/hooks/useValidator'
import utils from '@/utils/utils'

const store = useStore()
const validator = useValidator()

// 测试数据，实际使用过程务必删掉
const testData = {
	name: 'ming',
	mobile: '18734826752',
	sex: '1'
}
const userInfo = computed(() => ({...store.state.userInfo, ...testData}))

const rules = {
	name: {
		required: true,
		message: '请输入姓名'
	},
	mobile: { validator: validator.mobile }
}
const formRef = ref(null)
const form = useForm(rules, 'formRef')

const handleUpload = () => {
	utils.chooseAndUploadImage(
		{}, 
		{
			url: ''
		}
	).then(res => {
		userInfo.photo = res
	})
}

const handleSave = () => {
	form.validate().then(() => {
		console.log('success')
	})
}
</script>

<style lang="scss" scoped>

</style>
