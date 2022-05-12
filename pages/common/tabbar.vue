<template>
	<view >
		<view class="warp-tabbar bg-color-w flex" :style="{'padding-bottom': isIphonex ? '34px' : ''}">
			<view @click="goTab(item.pagePath)" v-for="(item,index) in list" class="flex flex-1 f-c f-a-c f-j-c">
				<image class="w-24" :src="index == active ? item.selectedIconPath : item.iconPath" mode="widthFix"></image>
				<text class="f10-size margin-t2" :class="index == active ? 't-color-0' : 't-color-9'">{{item.text}}</text>
			</view>
		</view>
		<view v-if="isShow" :style="{'padding-bottom': isIphonex ? '84px' : '50px'}"></view>
	</view>
</template>
<style scoped>
	.warp-tabbar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 50px;
		background: rgba(255, 255, 255, 0.98);
		box-shadow: 0px -1px 10px 0px rgba(188, 188, 188, 0.5);
		border-radius: 20px 20px 0px 0px;
		box-sizing: content-box;
		z-index: 1111;
	}
</style>
<script>
	const $ = require('../../utils/api.js');
	export default {
		props: {
			 active: { type: Number, default: 0 },
			isShow: { type: Boolean, default: true },
		},
		data() {
			return {
				"isIphonex": uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				"list": [
					{
						"pagePath": "/pages/index/index",
						"iconPath": "../../static/images/tab_index.png",
						"selectedIconPath": "../../static/images/tab_index_on.png",
						"text": "首页"
					},
					{
						"pagePath": "/pages/index/cate",
						"iconPath": "../../static/images/tab_cate.png",
						"selectedIconPath": "../../static/images/tab_cate_on.png",
						"text": "分类"
					},
					{
						"pagePath": "/pages/find/index",
						"iconPath": "../../static/images/tab_find.png",
						"selectedIconPath": "../../static/images/tab_find_on.png",
						"text": "发现"
					},
					{
						"pagePath": "/pages/cart/index",
						"iconPath": "../../static/images/tab_cart.png",
						"selectedIconPath": "../../static/images/tab_cart_on.png",
						"text": "购物车"
					},
					{
						"pagePath": "/pages/user/index",
						"iconPath": "../../static/images/tab_user.png",
						"selectedIconPath": "../../static/images/tab_user_on.png",
						"text": "我的"
					},
					
				],
			};
		},
		onLoad: function() {
		uni.hideTabBar();
			this.init();
		},
		methods: {
			goTab(url) {
				$.go(url);
			},
			init() {},


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
