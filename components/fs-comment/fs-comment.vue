<template>
	<view>
		<fs-cell-group full border :radius="false">
			<fs-cell align="top" v-for="(item,index) in list" :key="item.id">
				<template #title>
					<fs-avatar :src="item[keyMap.avatar]"></fs-avatar>
				</template>
				<template #value>
					<view class="fs-comment-hd">
						<view class="fs-comment-hd-item fs-comment-hd-title">{{item[keyMap.name]}}</view>
						<view class="fs-comment-hd-item">{{item[keyMap.time]}}</view>
					</view>
					<view class="fs-comment-content">
						{{item[keyMap.content]}}
					</view>
					<view class="fs-comment-reply">
						<view class="fs-comment-reply-item" @click="handleLike(item)" v-if="showLike">
							<fs-icon type="icon-like" :color="item[keyMap.isLike] ? 'red' : ''"></fs-icon>
							<view v-if="!item[keyMap.isLike]">点赞</view>
						</view>
						<view class="fs-comment-reply-item" @click="initInput(item)">
							<fs-icon type="icon-comment"></fs-icon> 回复
						</view>
					</view>
					<view class="fs-comment-reply-box">
						<fs-cell-group border bgColor="transparent" full>
							<fs-cell align="top" v-for="reply in item[keyMap.replyList]" :key="reply.id">
								<template #title>
									<fs-avatar :src="reply[keyMap.avatar]"></fs-avatar>
								</template>
								<template #value>
									<view class="fs-comment-hd fs-comment-hd-title">
										<view class="fs-comment-hd-item">{{reply[keyMap.name]}}</view>
										<view class="fs-comment-hd-item">{{reply[keyMap.time]}}</view>
									</view>
									<view class="fs-comment-content">
										{{reply[keyMap.content]}}
									</view>
									<view class="fs-comment-reply">
										<view class="fs-comment-reply-item" @click="handleLike(reply)" v-if="showLike">
											<fs-icon type="icon-like" :color="reply[keyMap.isLike] ? 'red' : ''"></fs-icon>
											<view v-if="!reply[keyMap.isLike]">点赞</view>
										</view>
										<view class="fs-comment-reply-item" @click="initInput(reply)">
											<fs-icon type="icon-comment"></fs-icon> 回复
										</view>
									</view>
								</template>
							</fs-cell>
						</fs-cell-group>
					</view>
				</template>
			</fs-cell>
		</fs-cell-group>
		
		<view class="fs-comment-input-box" v-if="showInput">
			<input 
				type="text"  
				class="fs-comment-input" 
				placeholder="回复..."
				v-model="replyValue"
				:focus="focus"
				@confirm="handleConfirm"/>
			<view
				class="fs-comment-button" 
				@click="handleConfirm">
				发送
			</view>
			<!-- :style="{backgroundColor: replyValue ? '#08bf65' : '#f7f7f7',color: replyValue ? '#fff' : '#cecece'}" -->
		</view>
	</view>
</template>

<script>
export default {
	name: 'fs-comment'
}
</script>

<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
	list: {
		type: Array,
		default() {
			return []
		}
	},
	showLike: Boolean,
	keyMap: {
		type: Object,
		default() {
			return {
				avatar: 'avatar',
				name: 'name',
				time: 'time',
				content: 'content',
				replyList: 'children',
				isLike: 'isLike'
			}
		}
	}
})
const emits = defineEmits(['like', 'reply'])

let focus = ref(false)
let showInput = ref(false)
let reply = ref(null)
let replyValue = ref('')
const initInput = (item) => {
	showInput.value = true
	focus.value = true
	reply.value = item
	replyValue.value = ''
}
const handleBlur = () => {
	nextTick(() => {
		showInput.value = false
		focus.value = false
	})
}
const handleConfirm = () => {
	if (replyValue.value) {
		emits('reply', reply.value)
	}
	showInput.value = false
	focus.value = false
}

const handleLike = (item) => {
	item[props.keyMap.isLike] = !item[props.keyMap.isLike]
	emits('like', item)
}
</script>

<style lang="scss">
.fs-comment{
	font-size: 14px;
	
	&-hd{
		display: flex;
		
		&-title{
			color: #222;
		}
		
		&-item{
			padding-right: 30rpx;
			position: relative;
			margin-bottom: 10rpx;
			
			& + &{
				padding-left: 30rpx;
				
				&::before{
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					width: 2rpx;
					height: 24rpx;
					background-color: #D9D9D9;
					content: '';
				}
			}
		}
	}
	
	&-content{
		font-size: 14px;
	}
	
	&-reply-box{
		background-color: #f7f8fa;
		margin-top: 10rpx;
		border-radius: var(--radius);
		overflow: hidden;
	}
	
	&-reply{
		display: flex;
		font-size: 14px;
		margin-top: 10rpx;
		align-items: center;
		
		&-item{
			display: flex;
			align-items: center;
			margin-right: 30rpx;
		}
	}
	
	&-input-box{
		height: 110rpx;
		position: fixed;
		display: flex;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 20rpx;
		border-top: 1rpx solid #eaeaea;
		background-color: #fff;
		align-items: center;
		z-index: 10;
	}
	&-input{
		height: 100%;
		margin-right: 20rpx;
		flex: 1;
		background-color: #fff;
		border-radius: 8rpx;
		padding-left: 20rpx;
	}
	
	&-button {
		height: 100%;
		padding: 10rpx 20rpx;
		border-radius: 8rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		background-color: #08bf65;
		color: #fff;
	}
}
</style>
