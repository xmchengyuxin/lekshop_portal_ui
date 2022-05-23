<template>
	<view class="contain" >
		<!-- <view @click="back()" class="bg-color-0 back-btn"></view> -->
		<!-- <cover-view @click="back()" class="bg-color-0 back-btn">简单的自定义 controls</cover-view> -->
	
		<web-view class="wrap-kefu"   :src="src" ></web-view>
	</view>
</template>
<style scoped>
/* @import url('../../css/index/index.css'); */
</style>
<script>
	const $ = require('../../utils/api.js');
	export default {
		data() {
			return {
				src: '',
				config: '',
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
			};
		},
		onLoad: function(options) {
			const self = this;
			this.src = uni.getStorageSync('kefuUrl') ? uni.getStorageSync('kefuUrl') : '';
			console.log(this.src)
		},
		methods: {
			init() {
				// #ifdef APP-PLUS
				           var wv = plus.webview.create(this.src, "custom-webview", {
				               //plusrequire: "none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
				               'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
				               top: uni.getSystemInfoSync().statusBarHeight ,//放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
				               height: uni.getSystemInfoSync().screenHeight - uni.getSystemInfoSync().statusBarHeight
				           })
				           var currentWebview = this.$scope.$getAppWebview(); //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()
				           currentWebview.append(wv); //一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
				           // #endif
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
