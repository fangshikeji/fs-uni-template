<template>
	<view>
		<view class="fs-sidebar" @touchmove="handleMove" @touchend="handleEnd" v-if="list.length">
			<view class="fs-sidebar-item" :class="{primary: state.activeId === item}" v-for="(item, index) in letters" :key="index" @click="handleClick(item)">
				{{item}}
			</view>
		</view>
		
		<view class="fs-contact" :style="{'margin-top': showSearch ? '110rpx' : ''}">
			<scroll-view scroll-y :scroll-into-view="state.intoView" @scroll="scroll" class="fs-contact-list">
				<view v-for="item in list" :key="item.name" :id="item.name" class="fs-contact-list-item">
					<view class="fs-panel-title" :class="{'fs-sticky': sticky}">{{item[titleKey]}}</view>
					<fs-cell
						v-for="subitem in item[childrenKey]"
						:key="subitem.name"
						border
						justify="left"
						align="center"
						:link="link + '?id=' + subitem.id"
						@click="handleRoute(subitem)">
						<template #title>
							<fs-avatar :src="subitem[avatarKey]">{{subitem.alais}}</fs-avatar>
						</template>
						<template #value>
							<view class="fs-contact-hd">{{subitem[hdKey]}}</view>
							<view class="fs-contact-bd">{{subitem[bdKey]}}</view>
						</template>
					</fs-cell>
				</view>
			</scroll-view>
		</view>
		<view class="fs-layer" v-if="state.showLayer">{{state.activeId}}</view>
	</view>
</template>

<script setup>
import { reactive } from 'vue'

const letters = []
for (var i = 0; i < 26; i++) {
	letters.push(String.fromCharCode(65 + i))
}

const props = defineProps({
	list: Array,
	childrenKey: {
		type: String,
		default: 'list'
	},
	titleKey: {
		type: String,
		default: 'name'
	},
	avatarKey: {
		type: String,
		default: 'src'
	},
	hdKey: {
		type: String,
		default: 'name'
	},
	bdKey: {
		type: String,
		default: 'phone'
	},
	link: String,
	sticky: {
		type: Boolean,
		default: true
	},
	showSearch: Boolean,
})

const windowHeight = uni.getSystemInfoSync().windowHeight
const offsetHeight = 50
const navHeight = windowHeight - offsetHeight * 2
const letterPos = []
const letterHeight = navHeight / letters.length

letters.forEach((item, index) => {
	letterPos.push(offsetHeight + letterHeight * index)
})

const state = reactive({
	intoView: '',
	activeId: '',
	showLayer: false
})
const handleClick = (id) => {
	state.intoView = id
	state.activeId = id
}
const handleMove = (e) => {
	const y = e.touches[0].clientY

	for (let i = 0, len = letterPos.length; i < len; i++) {
		if (y >= letterPos[i] && y <= letterPos[i] + letterHeight) {
			state.intoView = letters[i]
			state.activeId = letters[i]
			state.showLayer = true
			break
		}
	}
}
const handleEnd = (e) => {
	setTimeout(() => {
		state.showLayer = false
	}, 200)
}
const scroll = (e) => {
	uni.createSelectorQuery().selectAll('.list-item').boundingClientRect(rects => {
		for (let i = 0; i < rects.length; i++) {
			let rect = rects[i]
			if (rect.top === 0 || rect.bottom > 0) {
				state.activeId = rect.id
				break
			}
		}
	}).exec()
}

const handleRoute = (item) => {
	getApp().globalData.addrbookDetail = item
}
</script>

<style lang="scss" scoped>
.fs-sidebar {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: fixed;
	top: 50%;
	right: 0;
	align-items: center;
	z-index: 1000;
	transform: translateY(-50%);
	
	&-item {
		padding: 6rpx 20rpx;
		flex-shrink: 1;
		font-size: 24rpx;
	}
}

.fs-sticky {
	position: sticky;
	top: 0;
	z-index: 100;
}

.fs-contact {
	position: fixed;
	top: var(--window-top);
	left: var(--gutter);
	right: 60rpx;
	bottom: 0;
	
	&-list {
		height: 100%;
	}
	
	&-hd {
		font-size: 16px;
	}
	
	.fs-panel-title {
		padding: var(--gutter);
		color: var(--title);
		text-align: left;
		background-color: var(--bg-color);
	}
}

.fs-layer {
	width: 150rpx;
	height: 150rpx;
	background: rgba(0, 0, 0, .5);
	border-radius: 50%;
	line-height: 150rpx;
	color: #ffffff;
	text-align: center;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-weight: bolder;
	font-size: 28px;
}
</style>
