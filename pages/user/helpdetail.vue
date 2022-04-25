<template>
	<view class="contain">
				<view class="padding-lr15">
					<rich-text :nodes="info.content | html"></rich-text>
				</view>
				<view class="padding-10"></view>
	</view>
</template>
<style scoped>
/* @import url('../../css/index/index.css'); */
page {
		background-color: #fff;
	}
	/* #ifdef APP-PLUS */
	.contain {
		min-height: 100vh;
		background-color: #fff;
	}
	/* #endif */
</style>
<script>
	const $ = require('../../utils/api.js');
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				height: 0,
				info: '',
				id: '',
				title: '',
			};
		},
		onLoad: function(options) {
			let height = getApp().globalData.height;
			height = height-44-this.top-15;
			this.height = height;
			this.id = options.id ? options.id : '';
			this.init();
		},
		methods: {
			getDetail() {
				const self = this;
				$.ajax({
					url: 'common/article/get',
					data: {articleId: self.id},
					method: 'GET',
					success(res) {
						self.info = res.data ? res.data : '';
						self.title = self.info.title ? self.info.title : '';
						$.setTitle(self.title)
					}
				})
			},
			init() {
				this.getDetail();
			},


		},
		created() {
		},
		mounted() {},
		destroyed() {},
		components: {},
		onPullDownRefresh() {
		},
		onReachBottom() {
		}
	}
</script>
