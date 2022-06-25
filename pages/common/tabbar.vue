<template>
	<view >
		<view class="warp-tabbar bg-color-w flex" :style="{'padding-bottom': isIphonex ? '34px' : ''}">
			<view v-if="showLogin && !isLogin" class="wrap-login flex f-a-c f-j-s h-44 padding-lr15">
				<text class="t-color-w">{{i18n['要是你不登录，我就赖这不走啦']}}</text>
				<text @click="go('/pages/passport/login')" class="flex f-a-c  f-j-c b-radius-5 t-color-w h-32 bg-color-linear-y padding-lr20">{{i18n['立即登录']}}</text>
			</view>
			<view @click="goTab(item.pagePath)" v-for="(item,index) in list" class="flex flex-1 f-c f-a-c f-j-c p-r">
				<text v-if="index == 1 && len > 0"
					class="flex f-a-c f-j-c box-b f11-size t-color-w bg-color-r wrap-len b-radius padding-lr2 h-16"
					style="min-width: 16px;">{{len}}</text>
				<image class="w-22 margin-t2" :src="index == active ? item.selectedIconPath : item.iconPath" mode="widthFix"></image>
				<text class="f11-size margin-t4" :class="index == active ? 't-color-0' : 't-color-9'">{{i18n[item.text]}}</text>
			</view>
		</view>
		<view v-if="isShow" :style="{'padding-bottom': isIphonex ? '84px' : '50px'}"></view>
		<view v-if="isShow && showLogin" style="padding-bottom: 54px;"></view>
	</view>
</template>
<style scoped>
	.wrap-login {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		transform: translateY(-100%);
		background-color: rgba(0,0,0,0.6);
	}
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
	let count = 0;
	export default {
		props: {
			isShow: { type: Boolean, default: true },
			showLogin: { type: Boolean, default: false },
		},
		data() {
			return {
				"isIphonex": uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				"list": [],
				len: 0,
				isLogin: uni.getStorageSync('token') ? true : false,
				active: 0,
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
				// this.list.forEach((ele,index) => {
				// 	ele['text'] = self.i18n[ele.text];
				// })
			},
			goTab(url) {
				uni.switchTab({
					url: url
				})
			},
			init() {
				const self = this;
				let arr = [
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
				];
				let config = uni.getStorageSync('config') ? uni.getStorageSync('config') : '';
				
				self.list = [];
				arr.forEach((ele,index) => {
					if(config == '' || config.guangguang_status == 0) {
						if(ele.pagePath != '/pages/find/index') {
							self.list.push(ele);
						}
					}else{
						self.list.push(ele);
					}
				});
				this.getActive();
				if(config == '') {
					if(count >= 5){return}
					count+=1;
					setTimeout(() => {
						self.init();
					},400);
				}
			},
			getActive() {
				let pages = getCurrentPages(); // 当前页面
				let beforePage = pages[pages.length - 1]; // 前一个页面
				this.list.forEach((ele,index) => {
					if(ele.pagePath == '/'+beforePage.route) {
						this.active = index;
					}
				})
			},


		},
		computed: {
			i18n() {
				return this.$t('tabbar')
			},
		},
		created() {
			this.init();
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
