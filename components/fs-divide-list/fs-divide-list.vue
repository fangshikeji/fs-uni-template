<template>
	<view class="fs-divide-list" :class="{'gutter-v': gutter}">
		<fs-grid :columnNum="list.length" :padding="false">
			<view v-for="item in list" class="fs-divide-list-item">
				<fs-grid-item>
					<slot :item="item"></slot>
				</fs-grid-item>
			</view>
		</fs-grid>
	</view>
</template>

<script setup>
const props = defineProps({
	list: {
		type: Array,
		default: () => []
	},
	gutter: Boolean
})
</script>

<style lang="scss" scoped>
.fs-divide-list{
	background-color: #fff;
	border-radius: var(--radius);
	
	&-item{
		position: relative;
		padding: 20rpx;
		& + &{
			&::before{
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 2rpx;
				height: 43rpx;
				background-color: #D9D9D9;
				content: '';
			}
		}
	}
}
</style>
