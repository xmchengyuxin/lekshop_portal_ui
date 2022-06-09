<template>
	<view >
		<view class="warp-tabbar bg-color-w flex" :style="{'padding-bottom': isIphonex ? '34px' : ''}">
			<view @click="goTab(item.pagePath)" v-for="(item,index) in list" class="flex flex-1 f-c f-a-c f-j-c p-r">
				<text v-if="index == 1 && len > 0"
					class="flex f-a-c f-j-c box-b f11-size t-color-w bg-color-r wrap-len b-radius padding-lr2 h-16"
					style="min-width: 16px;">{{len}}</text>
				<image class="w-24" :src="index == active ? item.selectedIconPath : item.iconPath" mode="widthFix"></image>
				<text class="f11-size margin-t2" :class="index == active ? 't-color-0' : 't-color-9'">{{item.text}}</text>
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
	.wrap-len {
		position: absolute;
		left: 44px;
		top: 3px;
		z-index: 1;
	}
</style>
<script>
	const API = require('../../utils/api/user.js').default;
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
						"pagePath": "/pages/chat/index",
						"iconPath": "../../static/images/tab_cate.png",
						"selectedIconPath": "../../static/images/tab_cate_on.png",
						"text": "消息"
					},
					{
						"pagePath": "/pages/find/index",
						"iconPath": "../../static/images/tab_find.png",
						"selectedIconPath": "../../static/images/tab_find_on.png",
						"text": "逛逛"
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
				len: 0
			};
		},
		onLoad: function() {
			uni.hideTabBar();
			this.init();
		},
		onShow() {
			// this.getChatLen();
		},
		methods: {
			getChatLen() {
				const self= this;
				$.ajax({
					url: API.chatNumApi,
					data: {},
					isAuth: true,
					method: 'GET',
					success(res) {
						self.len = res.data ? res.data : 0;
					}
				})
			},
			goTab(url) {
				uni.switchTab({
					url: url
				})
			},
			init() {},


		},
		created() {
			this.getChatLen();
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
