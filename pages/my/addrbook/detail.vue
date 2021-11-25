<template>
	<view class="container">
		<view class="main">
			<fs-cell-group justify="right" border full>
				<fs-cell title="姓名" :value="detail.name"></fs-cell>
				<fs-cell title="电话" :value="detail.phone"></fs-cell>
				<fs-cell title="职位" :value="detail.position"></fs-cell>
				<!-- <fs-cell title="照片">
					<fs-avatar slot="value" :src="detail.icon && config.imgBaseUrl + detail.icon || config.defaultStaffLogo"></fs-avatar>
				</fs-cell> -->
				<fs-cell title="入职日期" :value="detail.enterDate"></fs-cell>
			</fs-cell-group>
		</view>
		
		<fs-grid class="text-center" style="padding-bottom: 60rpx;" bgColor="transparent">
			<fs-grid-item @click="handleCall">
				<fs-avatar>
					<fs-icon type="icon-call" size="20px"></fs-icon>
				</fs-avatar>
				<view class="content fs12">拨打电话</view>
			</fs-grid-item>
			<fs-grid-item @click="handleSave">
				<fs-avatar colorType="success">
					<fs-icon type="icon-tongxunlu" size="20px"></fs-icon>
				</fs-avatar>
				<view class="content fs12">保存到通讯录</view>
			</fs-grid-item>
			<fs-grid-item @click="handleDelete">
				<fs-avatar colorType="error">
					<fs-icon type="icon-user-minus" size="20px"></fs-icon>
				</fs-avatar>
				<view class="content fs12">移除联系人</view>
			</fs-grid-item>
		</fs-grid>
	</view>
</template>

<script setup>
const detail = getApp().globalData.addrbookDetail

const handleCall = () => {
	uni.makePhoneCall({
		phoneNumber: detail.phone
	})
}
const handleSave = () => {
	uni.addPhoneContact({
		firstName: detail.name,
		mobilePhoneNumber: detail.phone
	})
}
const handleDelete = () => {
	uni.showModal({
		title: '您确定移除该联系人吗?'
	}).then(res => {
		if (res.confirm) {
			uni.showToast({
				title: '移除成功'
			})
			setTimeout(() => {
				uni.navigateBack()
			}, 1500)
		}
	})
}
</script>

<style lang="scss">
page{
	height: 100%;
}
</style>
