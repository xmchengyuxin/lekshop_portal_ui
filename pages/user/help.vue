<template>
	<view class="contain">
		<view style="padding-top: 1px;"></view>
		<view class="padding-lr15">
			<view @click="go('/pages/user/helpdetail?id='+item.id)" v-for="(item,index) in list">
				<view class="f15-size f-w-b margin-t16">{{index+1}}、{{item.title}}</view>
				<view class="f13-size t-color-9 margin-t8">{{item.produce}}</view>
				<view class="h-120 b-radius-8  margin-t10 bg-img" :style="item.image | bgimg(600)+''"></view>
			</view>
		</view>
		<view class="padding-10"></view>
	</view>
</template>
<style scoped>
	@import url('../../static/css/page/white.css');
</style>
<script>
	const $ = require('../../utils/api.js');
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				height: 0,
				list: [],
			};
		},
		onLoad: function() {
			let height = getApp().globalData.height;
			height = height - 44 - this.top - 15;
			this.height = height;
			this.init();
		},
		methods: {
			getList() {
				const self = this;
				$.ajax({
					url: 'common/article/getList',
					data: {
						cateId: 1
					},
					method: 'GET',
					success(res) {
						self.list = res.data ? res.data : [];
					}
				})
			},
			init() {
				this.getList();
			},


		},
		created() {},
		mounted() {},
		destroyed() {},
		components: {},
		onPullDownRefresh() {},
		onReachBottom() {}
	}
</script>
