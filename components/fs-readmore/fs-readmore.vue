<template>
	<view class="fs-readmore" :style="{height: isOpen ? 'auto' : `${height + 70}rpx`,color}">
		<view class="fs-readmore-content layout-box" :style="{backgroundColor:bgColor}">
			<slot></slot>
		</view>
		
		<view class="fs-readmore-footer" :style="{backgroundColor:bgColor}" @click="handleToggle" v-if="visible">
			<view>{{isOpen ? '收起' : label}}</view>
			<fs-icon class="fs-readmore-icon" type="icon-d-down" size="26rpx" :class="{isOpen}"></fs-icon>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 限定多高时展示更多按钮
			maxHeight: {
				type: Number,
				default: 100
			},
			label: {
				type: String,
				default: '展开更多'
			},
			open: Boolean,
			bgColor: {
				type: String,
				default: '#fff'
			},
			color: {
				type: String,
				default: '#666666'
			}
		},
		data() {
			return {
				isOpen: false,
				visible: false
			}
		},
		mounted() {
			uni.createSelectorQuery().in(this).select('.fs-readmore-content').boundingClientRect(data => {
				this.visible = data.height > this.height
			}).exec()
		},
		computed: {
			height() {
				return parseFloat(this.maxHeight)
			}
		},
		methods: {
			handleToggle() {
				this.isOpen = !this.isOpen
			}
		}
	}
</script>

<style lang="scss" scoped>
.fs-readmore{
	position: relative;
	overflow: hidden;
	
	&-content{
		overflow: hidden;
	}
	
	&-footer{
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		z-index: 10;
		width: 100%;
		bottom: 0;
		font-size: 13px;
		height: 70rpx;
		line-height: 70rpx;
		// box-shadow: 0 -6rpx 2rpx rgba(65, 65, 70, 0.2);
	}
	
	&-icon{
		transition: all .2s;
		margin-left: 6rpx;
	}
	.isOpen{
		transform: rotate(180deg);
	}
}
</style>
