<template>
	<view
		class="fs-tag" 
		:class="[
			{
				'fs-tag-round': round,
				'fs-tag-plain': plain,
				'fs-tag-mark': mark,
				'fs-tag-mark-reverse': markReverse,
				'fs-tag-none': closed
			},
			'fs-tag-' + size,
			'bg-' + type,
		]" 
		:style="[
			{color:color,backgroundColor:bgColor},
			customStyle
		]">
		<slot></slot>
		<fs-icon
			class="fs-tag-close"
			size="13px"
			type="icon-close1"
			v-if="closable"
			@click="handleClosed">
		</fs-icon>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
	plain: Boolean,
	round: Boolean,
	mark: Boolean,
	markReverse: Boolean,
	closable: Boolean,
	type: {
		type: String,
		default: 'primary',
		validator(value) {
			return ['primary', 'success', 'info', 'warning', 'danger', 'default'].includes(value)
		}
	},
	color: String,
	bgColor: String,
	size: String,
	customStyle: {
	  type: Object,
	  default() {
			return {}
		}
	},
})

const closed = ref(false)
const handleClosed = () => {
	closed.value = true
}
</script>

<style lang="scss" scoped>
.fs-tag{
  display: inline-flex;
  height: 38rpx;
  line-height: 38rpx;
  padding: 0 10rpx;
  font-size: 11px;
  color: #fff;
  vertical-align: middle;
  border-radius: 4rpx;
	align-items: center;
	white-space: nowrap;
	
	&-plain{
	  background-color: transparent !important;
	  line-height: 32rpx;
		border: 2rpx solid currentColor;
		
		&.bg-default{
			color: var(--disabled);
		}
		&.bg-primary{
		  color: var(--primary);
		}
		&.bg-success{
		  color: var(--success);
		}
		&.bg-warning{
		  color: var(--warning);
		}
		&.bg-info{
		  color: var(--info);
		}
		&.bg-danger{
		  color: var(--danger);
		}
	}
	
	&-round{
	  border-radius: 30rpx;
	}
	&-mark{
	  border-radius: 0 25rpx 25rpx 0;
	}
	&-mark-reverse{
		border-radius: 25rpx 0 0 25rpx;
	}
	
	&-medium{
	  font-size: 12px;
	  height: 48rpx;
	  line-height: 48rpx;
	  padding: 0 20rpx;
		&.plain{
		  line-height: 48rpx;
		}
	}
	&-large{
	  font-size: 13px;
	  height: 58rpx;
	  line-height: 58rpx;
	  padding: 0 30rpx;
		&.fs-tag-plain{
		  line-height: 58rpx;
		}
		&.fs-tag-mark-reverse{
			border-radius: 50rpx 0 0 50rpx;
		}
	}
	
	&-close{
		margin-left: 8rpx;
	}
	&-none{
		display: none;
	}
}
.bg-default{
	background-color: #cfcfcf;
}
</style>
