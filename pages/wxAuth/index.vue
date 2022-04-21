<template>
	<view class="contain">
		<view class="">
			<view class="content">
				<view class="padding-15"></view>
				<text class="t-color-0">暂未授权</text>
				<text class="long-tips margin-t10">
					您需要微信授权登录后才能继续，请点击下面的
					<text class="stress t-color-g">“微信登录”</text>
					按钮进行登录，如果弹出授权提醒请点击
					<text class="stress t-color-g">“允许”</text>
					才能登录！
				</text>
				<button class="bg-color-linear-g t-color-w  b-radius-30 f16-size f-w-500 post-btn" @click="getUserInfo">微信授权</button>
				<!-- <button class="bg-color t-color-w b-color b-radius-30 f16-size f-w-500 post-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">微信授权</button> -->
				<button class="b-radius-30 t-color-5 f16-size f-w-500 post-btn login-out" @click="noLogin">暂不授权</button>
			</view>
		</view>
	</view>
</template>
<style scoped>
@import url('../../static/css/wxAuth/index.css');
</style>
<script>
const $ = require('../../utils/api.js');
const app = getApp().globalData;
const apiUrl = {
	postUserInfo: 'common/xcx/regitser'
};
let nums = 0;
export default {
	data() {
		return {};
	},
	onLoad: function() {
		this.getToken();
		this.init();
	},
	methods: {
		/**
		 * 从微信服务器获取用户信息
		 */
		getUserInfo: function(e) {
			
			uni.getUserProfile({
				desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				success: res => {
					// 写入全局
					app.userInfo =res.userInfo;
					
					// 提交用户数据
					let encryptedData = res.encryptedData;
					let iv = res.iv;
					this.postUserInfo(encryptedData, iv, res.userInfo);
					
				}
			});
			
		},
		noLogin() {
			$.go('/pages/index/index',3);return;
			let pages = getCurrentPages(); // 当前页面
			let beforePage = pages[pages.length - 2]; // 前一个页面
			uni.navigateBack({
				delta: 1,
				success: function() {
					// #ifndef MP-WEIXIN
					if (beforePage.$vm.onLoad) {
						beforePage.$vm.onLoad(); // 执行前一个页面的changeBanner方法
					}
					// #endif
					
					// #ifdef MP-WEIXIN
					if (beforePage.onLoad) {
						beforePage.onLoad(); // 执行前一个页面的changeBanner方法
					}
					// #endif
				}
			});
			
		},
		getToken(a, b, user) {
			const self = this;
			// 登录获取token
			$.getToken().then(res => {
				if (res.errMsg == 'request:ok') {
					switch (res.data.code) {
						case 200:
							let data = res.data.data;
							uni.setStorageSync('session_key', data.session_key);
							uni.setStorageSync('xcxopenid', data.openid);
							uni.setStorageSync('unionid', data.unionid);
							nums += 1;
							if(a) {
								if(nums >= 6) {
									nums = 0;
									uni.showToast({
										title: '授权失败,请重新授权',
										icon: 'none'
									});
								}else{
									self.postUserInfo(a, b, user,data.session_key);
								}
							}
							
							
					}
				}
			});
		},
		/**
		 * 提交用户信息
		 */
		postUserInfo: function(a, b, user,session_key) {
			const self = this;
			if(!session_key) {session_key= ''};
			if(!uni.getStorageSync('unionid')) {
				self.getToken(a, b, user);
				return;
			}
			if(!uni.getStorageSync('session_key') && session_key != '') {
				self.getToken(a, b, user);
				return;
			}
			let postData = {
				encryptedData: a,
				iv: b,
				sessionKey: session_key != '' ? session_key : uni.getStorageSync('session_key'),
				openId: uni.getStorageSync('xcxopenid'),
				unionId: uni.getStorageSync('unionid'),
				inviteCode: app.tuijianren,
			};
			$.ajax({
				url: apiUrl.postUserInfo,
				data: postData,
				method: 'POST',
				complete(res) {
					if (res.data && res.data.token) {
						uni.setStorageSync('token', res.data.tokenHead + ' ' + res.data.token);
					} else {
						//'session_key'本地缓存过期
						// uni.removeStorageSync('session_key');
						// session_key 已经失效，需要重新执行登录流程
						self.getToken(a, b, user);
						
						return;
					}
					if (res.code == 200) {
						uni.showToast({
							title: '登录成功',
							icon: 'none'
						});

						self.getUser();
					}
				}
			});
		},
		getUser: function() {
			const self = this;
			$.ajax({
				url: 'member/getUser',
				data: {},
				method: 'GET',
				success(res) {
					uni.setStorageSync('userInfo', res.data);
					if(!res.data.phone) {//无绑定手机情况下前往绑定手机
						$.go('/pages/wxAuth/bindphone',2);
					}else{
						let pages = getCurrentPages(); // 当前页面
						let beforePage = pages[pages.length - 2]; // 前一个页面
						let len = 0;

						for (var i = 0; i < pages.length; i++) {
							if (pages[i].route == 'pages/wxAuth/index') {
								len += 1;
							}
						}
						//避免多个请求都调用授权导致有多个授权页面
						uni.navigateBack({
							delta: len,
							success: function() {
								// #ifndef MP-WEIXIN
								if (beforePage.$vm.onLoad) {
									beforePage.$vm.onLoad(); // 执行前一个页面的changeBanner方法
								}
								// #endif
								
								// #ifdef MP-WEIXIN
								if (beforePage.onLoad) {
									beforePage.onLoad(); // 执行前一个页面的changeBanner方法
								}
								// #endif
							}
						});
					}
				}
			});
		},
		init() {}
	},
	created() {},
	mounted() {},
	destroyed() {},
	components: {},
	onPullDownRefresh() {},
	onReachBottom() {}
};
</script>
