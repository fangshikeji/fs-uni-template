<template>
	<view class="fs-panel">
	  <view class="fs-panel-title">
	    <view v-if="title">{{title}}</view>
	    <view v-else><slot name="title"></slot></view>
	  </view>
	  <view 
			class="fs-panel-content" 
			:class="{'fs-panel-padding': padding}" 
			:style="{'background-color':bgColor}"
		>
			<slot name="content"></slot>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps({
		title: String,
		padding: Boolean,
		bgColor: {
			type: String,
			default: '#fff'
		}
	})
</script>

<style lang="scss">
.fs-panel-title{
  padding: 20rpx var(--gutter);
  color: var(--title);
  text-align: left;
  background-color: var(--bg-color);
}
.fs-panel-padding{
  padding: var(--gutter);
}
</style>
