<template>
	<view class="text-center" :class="[sticky ? 'fs-tab-sticky' : '']">
		<scroll-view
			:scroll-x="scrollable" 
			:style="{'background-color':bgColor}">
			<view
			class="fs-tab"
			:class="[
				'fs-tab-' + type,
				colorType,
				round ? 'round' : '',
				center ? 'fs-tab-center' : '',
				gutter ? 'fs-tab-gutter' : '',
			]">
				<view
					class="fs-tab-item" 
					:class="[type+'-item', type + '-item-' + colorType, {active: index == curIndex}]" 
					:style="itemStyle"
					v-for="(item, index) in tabs"
					:key="index"
					@click="setActive(index)">
						{{item.name}}
						<view 
							v-if="type === 'line' && index == curIndex" 
							class="fs-tab-item-bar" 
							:style="{width: barWidth}">
						</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { reactive, computed } from 'vue'

const props = defineProps({
	color: String,
	colorType: {
		type: String,
		default: 'primary',
		validator(value) {
			return ['primary', 'success', 'info', 'warning', 'danger'].includes(value)
		}
	},
	bgColor: {
		type: String,
		default: '#fff'
	},
	barWidth: {
		type: String,
		default: '100%'
	},
	scrollThreshold: {
		type: Number,
		default: 5
	},
	type: {
		type: String,
		default: 'line',
		validator(value) {
			return ['line', 'card'].includes(value)
		}
	},
	tabs: {
		type: Array,
		default() {
			return []
		}
	},
	center: Boolean,
	round: Boolean,
	sticky: Boolean,
	gutter: Boolean,
	modelValue: {
		type: [String, Number],
		default: 0
	}
})
const emits = defineEmits(['change', 'update:modelValue'])

const scrollable = computed(() => props.scrollThreshold <= props.tabs.length)
const itemStyle = computed(() => scrollable.value ? `flex: 0 0 ${88 / props.scrollThreshold}%;` : '1')
const curIndex = computed(() => props.modelValue)

const setActive = index => {
	emits('update:modelValue', index)
	emits('change', index)
}
</script>

<style lang="scss" scoped>
.fs-tab {
	display: flex;
	height: 90rpx;
	line-height: 90rpx;
	background-color: #fff;
	text-align: center;
	white-space: nowrap;
	
	&-line{
		&.primary .active {
			color: var(--primary);
		}
		&.danger .active {
			color: var(--danger);
		}
		&.warning .active {
			color: var(--warning);
		}
		&.success .active {
			color: var(--success);
		}
		&.info .active {
			color: var(--info);
		}
		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 200%;
			transform: scale(0.5);
			transform-origin: 0 0;
			height: 1px;
			background-color: var(--border-color);
		}
	}
	
	&-card {
		border: 2rpx solid var(--primary);
		border-radius: var(--radius);
		overflow: hidden;
	
		&.round {
			border-radius: 30px;
		}
		&.danger {
			border-color: var(--danger);
		}	
		&.warning {
			border-color: var(--warning);
		}	
		&.info {
			border-color: var(--info);
		}	
		&.success {
			border-color: var(--success);
		}
		
		& .active {
			color: #fff;
		}
		&.primary .active {
			background-color: var(--primary);
		}
		&.danger .active {
			background-color: var(--danger);
		}
		&.warning .active {
			background-color: var(--warning);
		}
		&.success .active {
			background-color: var(--success);
		}
		&.info .active {
			background-color: var(--info);
		}
	}
	
	&-center {
		display: inline-flex;
		width: auto;
		
		& .fs-tab-item {
			padding: 0 30px;
		}
	}
	&-sticky {
		position: sticky;
		top: 0;
		z-index: 10;
	}
	&-gutter {
		margin-bottom: var(--gutter);
	}
}

.fs-tab-item {
	flex: 1;
	position: relative;
	box-sizing: border-box;
	color: var(--content);
	
	&-bar {
		position: absolute;
		bottom: 0;
		height: 2px;
		background-color: currentColor;
		width: 100%;
		left: 50%;
		transform: translateX(-50%);
		animation: width .5s;
		z-index: 10;
	}
}

.card-item-primary+.card-item-primary {
	border-left: 1px solid var(--primary);
}

.card-item-danger+.card-item-danger {
	border-left: 1px solid var(--danger);
}

.card-item-warning+.card-item-warning {
	border-left: 1px solid var(--warning);
}

.card-item-success+.card-item-success {
	border-left: 1px solid var(--success);
}

.card-item-info+.card-item-info {
	border-left: 1px solid var(--info);
}

@keyframes width {
	0% {
		transform: translateX(-50%) scale(0);
		opacity: 0;
	}

	100% {
		transform: translateX(-50%) scale(1);
	}
}

/* #ifdef H5 */
// 通过样式穿透，隐藏H5下，scroll-view下的滚动条
scroll-view ::v-deep ::-webkit-scrollbar {
	display: none;
	width: 0 !important;
	height: 0 !important;
	-webkit-appearance: none;
	background: transparent;
}
::v-deep .fs-tab .uni-scroll-view-content{
	display: flex;
}
/* #endif */
</style>
