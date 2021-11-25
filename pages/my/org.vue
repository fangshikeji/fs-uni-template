<template>
	<view class="container">
		<view class="bg-white" style="padding: 10rpx 20rpx;">
			<scroll-view scroll-x :scroll-into-view="state.intoView" class="org-nav">
				<view 
					class="org-nav-item" 
					:id="'id' + item.id" 
					v-for="(item, index) in state.navList" 
					:key="item.id" @click="handleNav(index)">
						{{item.name}}
				</view>
			</scroll-view>
		</view>
		<fs-gutter></fs-gutter>
		<view class="main">
			<fs-swipe-action-group v-if="state.curOrgList.length">
				<fs-swipe-action
					v-for="(item, index) in state.curOrgList"
					:key="item.id"
					:options="swipeOptions"
					:optionData="{...item, index}"
					@clickOption="handleOrgOption">
					<fs-cell arrow border :title="item.name" @click="handleOrg(item)"></fs-cell>
				</fs-swipe-action>
			</fs-swipe-action-group>
			
			<fs-swipe-action-group v-if="state.curStaffList.length">
				<fs-swipe-action 
					v-for="(staff, index) in state.curStaffList"
					:key="staff.id" :options="swipeOptions"
					:optionData="{...staff, index}"
					@clickOption="handleStaffOption">
					<fs-cell border>
						<template #title>
							<fs-avatar :src="staff.icon"></fs-avatar>
						</template>
						<template #value>
							<view class="title">{{staff.name}}</view>
							<view class="sub">{{staff.phone}}</view>
						</template>
					</fs-cell>
				</fs-swipe-action>
			</fs-swipe-action-group>
			<fs-empty v-if="!state.curOrgList.length && !state.curStaffList.length && state.loaded"></fs-empty>
		</view>
		
		<fs-row gutter="30rpx" class="org-ft">
			<fs-col span="6">
				<fs-button block round @click="orgState.showAddOrg = true">添加组织</fs-button>
			</fs-col>
			<fs-col span="6">
				<fs-button block round @click="staffState.showAddStaff = true">添加员工</fs-button>
			</fs-col>
		</fs-row>
		
		<fs-popup v-model="orgState.showAddOrg" direction="right">
			<view class="container">
				<view class="main">
					<fs-form>
						<fs-form-item label="名称">
							<fs-field required  placeholder="请输入组织名称" v-model="orgState.orgForm.name" border maxlength="10"></fs-field>
						</fs-form-item>
					</fs-form>
				</view>
				<view class="org-ft">
					<fs-button block round @click="handleAddOrg">{{orgState.orgForm.id ? '修改组织' : '添加组织'}}</fs-button>
				</view>
			</view>
		</fs-popup>
		
		<fs-popup v-model="staffState.showAddStaff" direction="right">
			<view class="container">
				<view class="main">
					<fs-form>
						<fs-form-item label="姓名" required>
							<fs-field placeholder="请输入员工姓名" v-model="staffState.staff.name" border  maxlength="10"></fs-field>
						</fs-form-item>
						<fs-form-item label="手机号" required>
							<fs-field placeholder="请输入员工手机号" v-model="staffState.staff.phone" border></fs-field>
						</fs-form-item>
						<fs-form-item label="职位">
							<fs-field placeholder="请输入员工职位" v-model="staffState.staff.position" border></fs-field>
						</fs-form-item>
						<fs-form-item label="照片">
							<fs-upload
								action=""
								size="200rpx"
								v-model="staffState.staff.icon"
								:count="1">
							</fs-upload>
						</fs-form-item>
					</fs-form>
				</view>
				<view class="org-ft">
					<fs-button block round @click="handleAddStaff">{{staffState.staff.id ? '修改员工' : '添加员工'}}</fs-button>
				</view>
			</view>
		</fs-popup>
	</view>
</template>

<script setup>
import { reactive } from 'vue'
import { getOrgList, addOrg, delOrg, editOrg, addStaff, delStaff, editStaff } from '@/services/company'

const swipeOptions = [
	{
		name: '修改',
		bgColor: '#2975EF',
		type: 'edit'
	},
	{
		name: '删除',
		bgColor: '#ff6059',
		type: 'del'
	}
]

const state = reactive({
	intoView: '',
	navList: [],
	orgList: [],
	curOrgList: [],
	curOrgId: '',
	curStaffList: [],
	loaded: false
})

const handleOrg = item => {
	state.navList.push(item)
	state.intoView = 'id' + item.id
	// 这里特意没用state.curOrgList = item.son || []，要利用引用类型的特点管理数据
	state.curOrgList = item.son
	if (!state.curOrgList) {
		state.curOrgList = []
	}
	state.curStaffList = item.staffs
	if (!state.curStaffList) {
		state.curStaffList = []
	}
	state.curOrgId = item.id
}
const handleNav = index => {
	state.curOrgList = state.navList[index].son
	state.curStaffList = state.navList[index].staffs
	if (!state.curOrgList) {
		state.curOrgList = []
	}
	if (!state.curStaffList) {
		state.curStaffList = []
	}
	state.navList.splice(index + 1)
	state.showUser = false
}

const fetchOrgList = () => {
	return getOrgList().then(res => {
		state.orgList = res.data.results || []
		if (state.orgList.length) {
			state.orgList[0].son = state.orgList[0].son || []
			state.curOrgList = state.orgList[0].son
			state.navList = state.orgList
			state.curOrgId = state.orgList[0].id
			state.curStaffList = state.orgList[0].staffs
		}
		state.loaded = true
	})
}
fetchOrgList()


// 添加组织相关逻辑
const orgState = reactive({
	showAddOrg: false,
	orgForm: {
		name: ''
	},
})
const handleAddOrg = () => {
	if(!orgState.orgForm.name) {
		return uni.showToast({
			title: '请输入组织名称',
			icon: 'none'
		})
	}
	if (orgState.orgForm.id) {
		editOrg(orgState.orgForm).then(res => {
			getOrgList().then(res => {
				state.orgList = res.data.results || []
				
				uni.showToast({
					title: '修改成功',
					icon: 'none'
				})
				state.curOrgList.splice(orgState.orgForm.index, 1, orgState.orgForm)
				orgState.orgForm = {
					name: ''
				}
				orgState.showAddOrg = false
			})
		})
	} else{
		addOrg({
			...orgState.orgForm,
			parentId: orgState.curOrgId
		}).then(res => {
			getOrgList().then(data => {
				orgState.orgList = data.data.results || []
				
				uni.showToast({
					title: '添加成功',
					icon: 'none'
				})
				orgState.curOrgList.push(res.data)
				orgState.orgForm = {
					name: ''
				}
				orgState.showAddOrg = false
			})
		})
	}
}
const handleOrgOption = ({option, data}) => {
	if (option.type === 'del') {
		uni.showModal({
			title: '您确定移除该组织吗?'
		}).then(res => {
			if (res.confirm) {
				delOrg(data.id).then(res => {
					uni.showToast({
						icon: 'none',
						title: '删除成功'
					})
					orgState.curOrgList.splice(data.index, 1)
				})
			}
		})
	} else if (option.type === 'edit') {
		orgState.showAddOrg = true
		orgState.orgForm = data
	}
}


// 添加员工相关逻辑
const staff = {
	name: '',
	phone: '',
	position: '',
	icon: []
}
const staffState = reactive({
	showAddStaff: false,
	staff: {
		...staff
	},
})
const handleStaffOption = ({option, data}) => {
	if (option.type === 'del') {
		uni.showModal({
			title: '您确定移除该员工吗?'
		}).then(res => {
			if (res.confirm) {
				delStaff(data.id).then(res => {
					uni.showToast({
						icon: 'none',
						title: '删除成功'
					})
					state.curStaffList.splice(data.index)
				})
			}
		})
	} else if (option.type === 'edit') {
		staffState.showAddStaff = true
		staffState.staff = {
			...data,
			icon: data.icon ? [data.icon] : ''
		}
	}
}
const handleAddStaff = () => {
	if (staffState.staff.id) {
		editStaff({
			...staffState.staff,
			icon: staffState.staff.icon[0] || '',
		}).then(res => {
			uni.showToast({
				title: '修改成功',
				icon: 'none'
			})
			staffState.curStaffList.splice(staffState.staff.index, 1, staffState.staff)
			staffState.staff = {
				...staff
			}
			staffState.showAddStaff = false
		})
	} else{
		addStaff({
			...staffState.staff,
			icon: staffState.staff.icon[0] || '',
			orgId: staffState.curOrgId,
		}).then(res => {
			uni.showToast({
				title: '添加成功',
				icon: 'none'
			})
			staffState.curStaffList.push(res.data)
			staffState.staff = {
				...staff
			}
			staffState.showAddStaff = false
		})
	}
}
</script>

<style lang="scss" scoped>
page{
	height: 100%;
}
.org-nav{
	height: 60rpx;
	line-height: 60rpx;
	white-space: nowrap;
	
	&-item {
		display: inline-block;
		white-space: nowrap;
		& + & {
			padding-left: 40rpx;
			position: relative;
			&::before{
				position: absolute;
				content: '>';
				left: 14rpx;
				color: #AAAAAA;
			}
		}
		&:last-child{
			color: #3D71ED;
		}
	}
}
.org-ft{
	padding: 40rpx 0;
	flex-shrink: 0;
	text-align: center;
}
</style>
