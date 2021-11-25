<template>
  <button
		hover-class="fs-hover"
    class="fs-button"
    :class="[
      type,
      size,
      plain ? 'plain' : '',
      radius ? 'radius' : '',
      round ? 'round' : '',
      disabled ? 'disabled' : '',
      block ? 'block' : '',
      full ? 'block full' : '',
    ]"
    :style="[
      { width: width },
      customStyle,
    ]"
    @click="handleClick"
  >
		<view class="fs-loader" v-if="loading"></view>
    <template v-else>
    	<slot></slot>
    </template>
  </button>
</template>

<script setup>
	import { computed, useAttrs } from 'vue'
	
	const props = defineProps({
    size: {
      type: String,
      validator(value) {
      	return ['mini', 'small', 'medium'].includes(value)
      }
    },
    type: {
      type: String,
      default: 'primary',
			validator(value) {
				return ['primary', 'success', 'info', 'warning', 'danger', 'default'].includes(value)
			}
    },
    plain: Boolean,
    radius: Boolean,
    round: Boolean,
    disabled: Boolean,
    full: Boolean,
    block: Boolean,
    link: String,
    linkType: {
      type: String,
      default: 'navigateTo'
    },
    width: String,
    customStyle: {
      type: Object,
      default() {
				return {}
			}
    },
		loading: Boolean
  })
	
	const emits = defineEmits(['click'])
		
	const handleClick = e =>  {
	  if (props.link && !props.disabled) {
	    uni[props.linkType]({
	      url: props.link
	    })
	  }
	  !props.disabled && emits('click')
	}
</script>

<style lang="scss" scoped>
.fs-button {
  font-weight: normal;
  font-size: 14px;
  color: #fff;
  padding: 0 40rpx;
  line-height: 1;
  text-align: center;
  border-radius: 0;
  display: inline-block;
  vertical-align: bottom;
  background-color: #cfcfcf;
  margin: 0;
  border: 0;
	height: 70rpx;
	line-height: 70rpx;

  &.primary,
  &.primary.selected,
  &.selected {
    background-color: var(--primary);
  }
  &.success {
    background-color: var(--success);
  }
  &.info {
    background-color: var(--info);
  }
  &.warning {
    background-color: var(--warning);
  }
  &.danger {
    background-color: var(--danger);
  }

  &.plain,
  &.plain.selected {
    background-color: transparent;
    box-shadow: inset 0 0 0 1px currentColor;
    color: #999999;
  }

  &.medium {
    // width: auto !important;
    height: 60rpx;
    line-height: 60rpx;
    font-size: 13px;
    padding: 0 30rpx;
  }
  &.small {
    width: auto !important;
    height: 50rpx;
    line-height: 50rpx;
    font-size: 12px;
    padding: 0 20rpx;
  }
	&.mini {
	  width: auto !important;
	  height: 40rpx;
	  line-height: 40rpx;
	  font-size: 12px;
	  padding: 0 20rpx;
	}
	&.block {
	  display: block;
	  height: 100rpx;
	  line-height: 100rpx;
	  margin-left: var(--gutter) !important;
	  margin-right: var(--gutter) !important;
	  font-size: 18px;
	  width: auto;
	
	  &.radius {
	    border-radius: 16rpx;
	  }
	}
	&.full {
	  margin-left: 0 !important;
	  margin-right: 0 !important;
	}
	
	&::after {
		border: none;
	}
	
	&.radius {
	  border-radius: 8rpx;
	}
	&.round {
	  border-radius: 30px;
	}
	
	&.plain.primary,
	&.plain.selected {
	  color: var(--primary);
	}
	
	&.plain.success {
	  color: var(--success);
	}
	
	&.plain.warning {
	  color: var(--warning);
	}
	
	&.plain.danger {
	  color: var(--danger);
	}
	
	&.plain.info {
	  color: var(--info);
	}
	
	&.disabled {
	  opacity: 0.5;
	}
}

.fs-hover {
  opacity: 0.5;
}

.fs-loader {
	display: inline-block;
	width: 40rpx;
	height: 40rpx;
	color: inherit;
	vertical-align: middle;
	border: 4rpx solid currentcolor;
	border-bottom-color: transparent;
	border-radius: 50%;
	animation: 1s loader linear infinite;
	position: relative;
}
@keyframes loader {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
