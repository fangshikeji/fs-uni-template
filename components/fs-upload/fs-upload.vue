<template>
	<view class="fs-file-list">
		<view v-for="(item, index) in modelValue" :key="index" class="fs-file-box">
			<fs-icon
				type="icon-close"
				size="20px"
				colorType="danger"
				class="fs-file-del"
				@click="handleDel(index)">
			</fs-icon>
			<fs-avatar
				v-if="mediaType === 'image'"
				:src="formatPath(item)"
				:shape="shape"
				:size="size"
				radius
				@click="handlePreview(formatPath(item))">
			</fs-avatar>
			<video v-else :src="formatPath(item)" controls class="fs-file-video"></video>
		</view>
		<view class="fs-file-box" v-if="modelValue.length < count">
			<fs-avatar
				:shape="shape"
				:size="size"
				radius
				bgColor="#EBEFF5"
				@click="upload">
				<fs-icon type="icon-plus2" size="50px"></fs-icon>
			</fs-avatar>
		</view>
	</view>
</template>

<script setup>
import utils from '@/utils/utils'
import config from '@/utils/config'

const props = defineProps({
	action: String,
	name: {
		type: String,
		default: 'file'
	},
	header: {
		type: Object,
		default: () => {}
	},
	count: {
		type: Number,
		default: 1
	},
	chooseData: {
		type: Object,
		default: () => {}
	},
	modelValue: {
		type: Array,
		default: () => []
	},
	mediaType: {
		type: String,
		default: 'image',
		validator(value) {
			return ['image', 'video'].includes(value)
		}
	},
	shape: {
		type: String,
		default: 'square',
		validator(value) {
			return ['square', 'circle'].includes(value)
		}
	},
	size: {
		type: String,
		default: '150rpx'
	},
	formData: {
		type: Object,
		default() {
			return {}
		}
	},
	pathKey: {
		type: String,
		default: 'filePath'
	},
	cloudUpload: Boolean
})
const emit = defineEmits(['update:modelValue'])

const handlePreview = current => {
	uni.previewImage({
		current,
		urls: props.modelValue.map(item => formatPath(item))
	})
}
const upload = async () => {
	let methods = ''
	if (props.mediaType === 'image') {
		methods = 'chooseAndUploadImage'
	} else {
		methods = 'chooseAndUploadVideo'
	}
	utils[methods](
		{
			count: props.count,
			...props.chooseData
		}, 
		{
			url: props.action,
			name: props.name,
			header: props.header,
			formData: props.formData
		},
		props.cloudUpload
	).then(res => {
		const fileList = [...props.modelValue, ...res]
		fileList.length > props.count && fileList.splice(props.count)
		console.log(fileList);
		emit('update:modelValue', fileList)
	})
}
const handleDel = index => {
	props.modelValue.splice(index, 1)
	emit('update:modelValue',props.modelValue)
}


const formatPath = item => {
	const path = props.pathKey ? item[props.pathKey] : item
	return utils.isHttp(path) ? path : config.baseUrl + path
}
</script>

<style lang="scss" scoped>
.fs-file{
	&-list{
		display: flex;
		flex-wrap: wrap;
		padding-top: var(--gutter);
	}
	&-box{
		position: relative;
		margin-bottom: var(--gutter);
		margin-left: var(--gutter);
	}
	&-video{
		width: 300rpx;
		height: 200rpx;
	}
	&-del{
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(50%, -50%);
		font-size: 22px;
		color: var(--sub);
		z-index: 10;
	}
}
</style>
