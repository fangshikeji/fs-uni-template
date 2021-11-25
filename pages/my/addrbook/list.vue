<template>
	<view class="container">
		<view class="fs-index-search" v-if="state.showSearch">
			<fs-search round placeholder="搜索姓名" v-model="state.keywords"></fs-search>
		</view>
		<view class="main">
			<fs-index-list :showSearch="state.showSearch" :list="state.list" avatarKey="img" link="./detail"></fs-index-list>
			<fs-empty v-if="!state.list.length && state.loaded"></fs-empty>
		</view>
	</view>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { getAddrbookList } from '@/services/common'

let oldList = []
const state = reactive({
	showSearch: false,
	keywords: '',
	list: [{"name":"C","list":[{"img":"http://img.towantto.com/zone/4a2ef5eca78c4113b7a10b8b1a8ac53b.jpg","phone":"15135404788","sex":"1","name":"崔超","company":"山西方是科技股份有限公司","id":"028b8b8cfa774ed888ba17965797e3c2","email":""},{"img":"http://img.towantto.com/zone/bb3e286705884d698b7e21fdb6313b06.png","phone":"13513513241","sex":"1","name":"陈跃君","company":"山西方是科技股份有限公司","id":"220fde1793d84f1ca686c26cada81ab2"}]},{"name":"D","list":[{"img":"http://img.towantto.com/zone/e90a86ade8e14c97a75291c0922c6528.jpg","phone":"18500160816","sex":"1","name":"杜勇","company":"山西方是科技股份有限公司","id":"4cafa5dcf9884e5686f4f0025b95f90e"},{"img":"http://img.towantto.com/zone/f963f0209fc94cce924143ac02cd07ac.png","phone":"13835195455","sex":"","name":"代增平","company":"山西方是科技股份有限公司","id":"fdb655e98086402489ba3fa88b43d909"}]},{"name":"F","list":[{"img":"http://img.towantto.com/zone/5104df9606164efda709b52a7dbca476.jpg","phone":"13103408437","sex":"1","name":"樊佳鑫","company":"山西方是科技股份有限公司","id":"129feef6963548169eb03afb4aba78fe"},{"img":"http://img.towantto.com/zone/f99d96f236354c04a1f51d417bedcee0.png","phone":"13503512069","sex":"1","name":"冯帆","company":"山西方是科技股份有限公司","id":"9c844d037b494faeb409c4378c6a5676"},{"img":"http://img.towantto.com/zone/817610b7c26f4183962ecbd0602cbb48.jpg","phone":"13753488158","sex":"1","name":"冯磊","company":"山西方是科技股份有限公司","id":"aeba8074cda84940a4eaf744ba9b8b67"}]},{"name":"G","list":[{"img":"http://img.towantto.com/zone/39ab7ec2e0f14e4babfb955b9fd57322.jpg","phone":"15665713796","sex":"","name":"郭钰烜","company":"山西方是科技股份有限公司","id":"22f2b6e67171431088bbdac266de7e4c"},{"img":"http://img.towantto.com/zone/c1fcb466d28f4577909a22aa183a048d.jpeg","phone":"13111010883","sex":"","name":"郭展麟","company":"山西方是科技股份有限公司","id":"4a9c1e9ad9d2473b87a72b12c08a9759"}]},{"name":"H","list":[{"img":"http://img.towantto.com/zone/c0e53882fd0e40159867a008ddb1d71e.jpg","phone":"15502416656","sex":"0","name":"胡雪倩","company":"山西方是科技股份有限公司","id":"1331cbaf777b44c68e7baec98087f41c"},{"img":"http://img.towantto.com/zone/c9c481bc657843e99625e9a223a98355.jpg","phone":"18734922328","sex":"1","name":"胡晓峰","company":"山西方是科技股份有限公司","id":"3996e344731d491598f9449c82db3ecc"},{"img":"http://img.towantto.com/zone/3e520df40fd245f7b1af6ba12be9e209.png","phone":"13834513191","sex":"","name":"何林","company":"山西方是科技股份有限公司","id":"7303501f7c884887ba2f7a551c37f556"}]},{"name":"J","list":[{"img":"http://img.towantto.com/zone/94c9e1ae54ca47089d831d9d90c1a544.png","phone":"15513881817","sex":"","name":"姜涛","company":"山西方是科技股份有限公司","id":"11c6b058b7aa46c581deea3763eec8ea"},{"img":"http://img.towantto.com/zone/befbe4cf231e4cf8b0df8b55c3541f42.jpg","phone":"18834821642","sex":"","name":"吉宇晟","company":"山西方是科技股份有限公司","id":"1f35a0fe76f1479eacadd08253703abd"}]},{"name":"K","list":[{"img":"http://img.towantto.com/zone/f8e735149d8e4b569e0b59f80f7db9f8.jpg","phone":"15652653569","sex":"","name":"孔祥慧","company":"山西方是科技股份有限公司","id":"344c2678d255415db6d691834aa01d5d"},{"img":"http://img.towantto.com/zone/f4475d9a09474f87943d6c730edff3d7.jpg","phone":"18434346561","sex":"2","name":"康鹏嫒","company":"山西方是科技股份有限公司","id":"8cad615c59d643c2840986bf7ee9b7cf","email":""}]},{"name":"L","list":[{"img":"http://img.towantto.com/zone/6ddbbfddf414480282d33b2421531a23.jpg","phone":"18534306254","sex":"1","name":"李志桐","company":"山西方是科技股份有限公司","id":"6ef0784aabd448918c8bd0715e2f728e"},{"img":"http://img.towantto.com/zone/6bf13e7a7f794432b23b0e79244d46b1.png","phone":"13803497668","sex":"0","name":"刘致远","company":"山西方是科技股份有限公司","id":"c39b7e8435574851a8e7cd76d30c4155"},{"img":"http://img.towantto.com/zone/3339e6fa57cf45a39f7426493b99dcbd.jpg","phone":"13393403680","sex":"1","name":"李文丽","company":"山西方是科技股份有限公司","id":"fd304bb1fc264cd8a2b24883ba1d8d1f"}]},{"name":"O","list":[{"img":"http://img.towantto.com/zone/9bf41ee365c140bfa9b43913feafbef0.jpg","phone":"18636194858","sex":"2","name":"欧阳东亚","company":"山西方是科技股份有限公司","id":"0071119011e64dd9840c234f5df475a1"}]},{"name":"Q","list":[{"img":"http://img.towantto.com/zone/e34ffea124b34ebd8e7d2d738bdc0c60.jpg","phone":"13613474952","sex":"","name":"秦亚茹","company":"山西方是科技股份有限公司","id":"5812cf80be924d58ac5b875015bc4f40"},{"img":"http://img.towantto.com/zone/79eb36ea9a934df397fc555b82ad32a0.jpeg","phone":"18903547777","sex":"","name":"裘永清","company":"山西方是科技股份有限公司","id":"ec8dfd0006c44a3ebf1939a40560d954"}]},{"name":"R","list":[{"img":"http://img.towantto.com/zone/9ffc9f7c41ba432b9dcb279924230fdb.jpg","phone":"17836211402","sex":"1","name":"任鹏云","company":"山西方是科技股份有限公司","id":"125d0e23e8264a2db9d86fdae9f61758"},{"img":"http://img.towantto.com/zone/3d029d546c5548099b0a37196235343f.jpg","phone":"18135180155","sex":"1","name":"任天亮","company":"山西方是科技股份有限公司","id":"27e87eb6c69249f8bbba39c6e4b5fff5"},{"img":"http://img.towantto.com/zone/271790cfc72645f4b1fc6037a22d9773.jpg","phone":"13283512921","sex":"1","name":"任鹏飞","company":"山西方是科技股份有限公司","id":"abfceccbb9904380b6a614b9c53949bc"}]},{"name":"S","list":[{"img":"http://img.towantto.com/zone/d0de9eee7a034535891847c8193a90da.jpg","phone":"15003550062","sex":"2","name":"石丽青","company":"山西方是科技股份有限公司","id":"32768f754f2f471c8a9d80f1027738c3"}]},{"name":"T","list":[{"img":"http://img.towantto.com/zone/7e5ba6b4de2841ecadfb4c70213b556a.jpg","phone":"18636632773","sex":"1","name":"田裕","company":"山西方是科技股份有限公司","id":"36d8939938424bdd9892a0c95992ad85"}]},{"name":"W","list":[{"img":"http://img.towantto.com/zone/cc723a1515c4421da1bd5dbeb3230e53.jpg","phone":"15235181888","sex":"","name":"王斌","company":"山西方是科技股份有限公司","id":"043c9f3f3030426e857024e6df9b2a50"},{"img":"http://img.towantto.com/zone/fc238dce3cc04e869a152cf2701821a4.jpg","phone":"15296619861","sex":"1","name":"王建文","company":"山西方是科技股份有限公司","id":"5680cfa4cd874367a918d1c6575a046e"},{"img":"http://img.towantto.com/zone/2cb9bb6f38074ecdb03fd1be1a81cedf.png","phone":"13453407779","sex":"","name":"王博宇","company":"山西方是科技股份有限公司","id":"67fa60b8c71a48f188b6a3f4156de424"},{"img":"http://img.towantto.com/zone/11a223504b584e64878a5a1a0923532e.jpg","phone":"18035182114","sex":"1","name":"温志明","company":"山西方是科技股份有限公司","id":"9803249d581c457e815de123ab263e37"},{"img":"http://img.towantto.com/zone/604298a25e0e42f8b7b08f25a22d2e11.jpg","phone":"13903407460","sex":"","name":"武建平","company":"山西方是科技股份有限公司","id":"a12565d865e34301a64816dc8231dfba"}]},{"name":"Y","list":[{"img":"http://img.towantto.com/zone/ac4dd789281c435eac005b2edefa2ce8.jpg","phone":"15513268669","sex":"","name":"杨帆","company":"山西方是科技股份有限公司","id":"1de78a7da2d9477d9c3c0f42c31e37a2"},{"img":"http://img.towantto.com/zone/dacf83d1bc394922b63c2003fc61d508.jpg","phone":"15935682338","sex":"1","name":"杨立锐","company":"山西方是科技股份有限公司","id":"7f525d75c455406e9ed01e2251d4e912","email":""},{"img":"http://img.towantto.com/zone/7fb4ec57bad3429887f91ca4c34b9287.jpg","phone":"13994285257","sex":"1","name":"闫小虎","company":"山西方是科技股份有限公司","id":"d598ec982203485d97cfd4406cf7ed77"},{"img":"http://img.towantto.com/zone/a3ee20df08df40e3b7e3e8bd12d6fcbf.jpg","phone":"18534578631","sex":"0","name":"尹嘉鹏","company":"山西方是科技股份有限公司","id":"e8b68bebeb2d46fa93e537e5c28cb5d5","email":""}]},{"name":"Z","list":[{"img":"http://img.towantto.com/zone/2b27d02d4eab485fa3dba7bd9d45c2d0.png","phone":"13453098788","sex":"","name":"张培华","company":"山西方是科技股份有限公司","id":"2a4edece1eba4e939581f3f8c3757d23"},{"img":"http://img.towantto.com/zone/f74d62492cab45c882d13540969d4aa4.jpg","phone":"17836228189","sex":"","name":"赵加琦","company":"山西方是科技股份有限公司","id":"db15beb6561241a09d55691bfb0e64ce"}]}],
	loaded: false
})
const fetchList = () => {
	getAddrbookList().then(res => {
		state.list = res.data
		oldList = [...state.list]
		state.loaded = true
	}).catch(err => {
		state.loaded = true
	})
}
// fetchList()

// 搜索相关逻辑
oldList = [...state.list]
watch(() => state.keywords, e => {
	state.list = [
		...oldList.map(item => {
			return {
				list: item.list.filter(sub => sub.name.includes(e) || sub.phone.includes(e)),
				name: item.name
			}
		}).filter(item => item.list.length)
	]
})
</script>

<style>
page{
	height: 100%;
}
</style>
<style lang="scss" scoped>
.fs-index-search{
	position: fixed;
	top: var(--window-top);
	left: var(--gutter);
	right: 60rpx;
}
</style>
