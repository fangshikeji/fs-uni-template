<template>
	<view class="container">
		<slot name="header"></slot>
		<view class="main">
			<slot></slot>
		</view>
		<slot name="footer"></slot>
	</view>
</template>

<script>
	export default {
		name:"fs-container",
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
