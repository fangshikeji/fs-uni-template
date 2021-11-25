import config from './config'

export default {
	isHttp(path) {
		return path.startsWith('http') || path.startsWith('https')
	},
	upload(data) {
		return uni.uploadFile({
			url: this.isHttp(data.url) ? data.url : config.apiBaseUrl + data.url,
			name: data.name || 'file',
			formData: {
				...data.formData,
				token: uni.getStorageSync('token')
			},
			header: data.header || {},
			filePath: data.filePath
		}).then(res => {
			return JSON.parse(res)
		})
	},
	uploadCloud(data) {
		return uniCloud.uploadFile(data).then(res => {
			return res
		})
	},
	chooseAndUpload(methods, chooseParam, uploadParam, isCloud) {
		const uploadArr = []
		return this[methods](chooseParam).then(file => {
			file.filePaths.forEach((filePath, index) => {
				if (isCloud) {
					uploadArr.push(this.uploadCloud({
						filePath, 
						cloudPath: file.tempFiles[index].name, 
						fileType: file.tempFiles[index].type
					}).then(res => {
						if (res.success) {
							return {
								filePath: res.fileID
							}
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					}))
				} else{
					uploadArr.push(this.upload({
						...uploadParam,
						filePath
					}).then(res => {
						if (res.code === 200 || res.success) {
							return res.data
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					}))
				}
			})
			uni.showLoading({
				title: '上传中...'
			})
			return Promise.all(uploadArr).then(res => {
				uni.hideLoading()
				return res.filter(item => item)
			})
		})
	},
	chooseImage(data) {
		return uni.chooseImage({
			count: 1,
			...data
		}).then(res => {
			console.log(res);
			return {
				filePaths: res.tempFilePaths,
				tempFiles: res.tempFiles
			}
		})
	},
	chooseAndUploadImage(chooseParam, uploadParam, isCloud) {
		return this.chooseAndUpload('chooseImage',chooseParam, uploadParam, isCloud)
	},
	chooseVideo(data) {
		return uni.chooseVideo({
			...data
		}).then(res => {
			return {
				filePaths: [res.tempFilePath],
				tempFiles: [res.tempFile]
			}
		})
	},
	chooseAndUploadVideo(chooseParam, uploadParam, isCloud) {
		return this.chooseAndUpload('chooseVideo',chooseParam, uploadParam, isCloud)
	},
}