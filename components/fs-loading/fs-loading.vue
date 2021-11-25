<template>
	<view class="fs-loading" :style="{backgroundColor: bgColor}">
		<view>
			<view class="loader"></view>
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
	bgColor: {
		type: String,
		default: 'rgba(0,0,0,.5)'
	}
})
</script>

<style lang="scss" scoped>
.fs-loading{
	position: absolute;
	top: 0;
	left: 0;
	text-align: center;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	z-index: 20;
}
.loader {
  margin: 0 auto 20rpx;
  font-size: 12rpx;
  position: relative;
  border-top: 1em solid rgba(255, 255, 255, 0.2);
  border-right: 1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1em solid rgba(255, 255, 255, 0.2);
  border-left: 1em solid #fff;
  animation: load8 1s infinite linear;
}
.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}

@keyframes load8 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
