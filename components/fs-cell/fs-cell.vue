<template>
	<view 
		class="fs-cell" 
		:class="[cls,{shadow}]" 
		:style="{backgroundColor:bgColor}" 
		@click="handleClick"
	>
		<view class="fs-cell-flex" :class="['fs-cell-align-' + align, justify,{reverse}]">
			<view class="fs-cell-title" :style="titleStyle">
				<template v-if="title">{{title}}</template>
				<slot v-else name="title"></slot>
			</view>
			<view class="fs-cell-value">
				<template v-if="value">{{value}}</template>
				<slot v-else name="value"></slot>
			</view>
			<view class="fs-cell-extra">
				<template v-if="extra">{{extra}}</template>
				<slot v-else name="extra"></slot>
			</view>
		</view>
		<view class="fs-cell-label">
			<template v-if="label">{{label}}</template>
			<slot v-else name="label"></slot>
		</view>
		<view class="arrow-icon">
			<fs-icon type="icon-d-down" rotate="-90" size="28rpx" :color="arrowColor" :colorType="arrowColorType"></fs-icon>
		</view>
	</view>
</template>

<script setup>
	import { computed, toRefs, inject } from 'vue'
	
	const props = defineProps({
		title: String,
		titleWidth: String,
		value: String,
		extra: String,
		label: String,
		arrow: Boolean,
		arrowColor: {
			type: String,
			default: ''
		},
		arrowColorType: {
			type: String,
			validator(value) {
				return ['primary', 'success', 'info', 'warning', 'danger'].includes(value)
			}
		},
		border: Boolean,
		tighten: Boolean,
		gutter: Boolean,
		radius: Boolean,
		reverse: Boolean,
		align: {
			type: String,
			default: 'center',
			validator(value) {
				return ['top', 'center', 'bottom', 'stretch'].includes(value)
			}
		},
		justify: {
			type: String,
			validator(value) {
				return ['left', 'center', 'right'].includes(value)
			}
		},
		bgColor: {
			type: String,
		},
		shadow: Boolean,
		link: String,
		linkType: {
			type: String,
			default: 'navigateTo'
		},
	})
	
	const emits = defineEmits(['click'])
	const cellGroup = inject('cellGroup', {})
	
	const justify = props.justify || cellGroup.justify || 'left'
	const bgColor = props.bgColor || cellGroup.bgColor || '#fff'
	const arrowColor = props.arrowColor || cellGroup.arrowColor
	const arrowColorType = props.arrowColorType || cellGroup.arrowColorType
	const cls = computed(() => {
		const classNames = [];
			
		(props.arrow || cellGroup.arrow) && classNames.push('arrow');
		(props.border || cellGroup.border) && classNames.push('border');
		(props.tighten || cellGroup.tighten) && classNames.push('tighten')
		props.gutter && classNames.push('gutter')
		props.radius && classNames.push('radius')
			
		return classNames.join(' ')
	})
	const titleStyle = computed(() => {
		const width = props.titleWidth || cellGroup.titleWidth
		return width ? `width: ${width}` : ''
	})
	
	const handleClick = () => {
		if (props.link) {
			uni[props.linkType]({
				url: props.link
			})
		}
		emits('click')
	}
</script>

<style lang="scss" scoped>
.fs-cell {
	padding: 30rpx var(--gutter);
	position: relative;
	font-size: var(--content-size);
	background-color: #fff;
	line-height: 1.4;
	width: 100%;
	box-sizing: border-box;
	
	&-flex {
		display: flex;
		justify-content: space-between;
	}
	&-value {
		flex: 1;
		padding-left: 20rpx;
		text-align: right;
	}
	&-label {
		font-size: var(--sub-size);
		color: var(--sub);
	}
	
	&-align-top {
		align-items: flex-start;
	}
	&-align-center {
		align-items: center;
	}
	&-align-bottom {
		align-items: flex-end;
	}
	
	&.arrow {
		padding-right: 50rpx;
		
		.arrow-icon{
			display: block;
		}
	}
	
	&.gutter {
		margin-bottom: var(--gutter-v);
	}
	&.radius {
		border-radius: var(--radius);
	}
	&.reverse{
		flex-direction: row-reverse;
	}
	&.tighten {
		padding: var(--tighten-gutter);
	}
	&.border {
		border-bottom: 2rpx solid var(--border-color);
	}
}
.arrow-icon{
	display: none;
	position: absolute;
	right: 10rpx;
	top: 50%;
	transform: translateY(-50%);
}
.left .fs-cell-value {
	text-align: left;
}
.center .fs-cell-value {
	text-align: center;
}
.right .fs-cell-value {
	text-align: right;
}
</style>
