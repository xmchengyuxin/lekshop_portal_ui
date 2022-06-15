<template>
	<view class="contain flex f-c f-j-s">
		<view class="padding-15">
			<view class="padding-20"></view>
			<view class="padding-6"></view>
			<view class="padding-lr12">
				<view class="f20-size f-w-b">{{i18n['手机号密码登录']}}</view>
				
				<view class="padding-tb6"></view>
				<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8">
					<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">+86</view>
					<view class="flex flex-1 padding-lr12">
						<input class="f16-size" v-model="phone" type="number" maxlength="11" :placeholder="i18n['请输入登录账号']">
					</view>
				</view>
				<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8">
					<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">
						<image class="w-20" src="../../static/images/login_passport.png" mode="widthFix"></image>
					</view>
					<view class="flex flex-1 padding-lr12">
						<input class="f16-size" v-model="password" type="password" :placeholder="i18n['请输入登录密码']">
					</view>
				</view>
				<!-- <view class="flex h-50 b-radius-30 bg-color-f1 margin-t8 over-h">
					<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">
						<image class="w-20" src="../../static/images/login_code.png" mode="widthFix"></image>
					</view>
					<view class="flex flex-1 padding-lr12">
						<input v-model="code" type="number" :placeholder="i18n['图形验证码']">
					</view>
					<view class="flex f-a-c f-s-0">
						<img-code ref="imgCode" class="flex  h-30"></img-code>
					</view>
				</view> -->
				<view @click="login"
					class="flex f-a-c f-j-c b-radius-30 h-44 bg-color-linear-y t-color-w f-w-500 margin-t20">
					{{i18n['登录']}}
				</view>
				<view class="flex f-j-s ">
					<view @click="go('/pages/passport/register')" class="f12-size  padding-tb20">{{i18n['注册']}}</view>
					<view @click="go('/pages/passport/password')" class="flex f-a-c">
						<text class="f12-size ">{{i18n['忘记了']}}</text>
						<text class="f12-size t-color-y">{{i18n['找回密码']}}</text>
					</view>
				</view>
				
			</view>
		</view>
		<view class="padding-15 safe-area">
			<view class="flex f-a-c f-j-c ">
				<!-- #ifdef MP-WEIXIN -->
				<button class="flex f-a-c bg-color-f7 h-36 b-radius-30 padding-lr15" @click="getUserInfo">
					<image class="w-20 margin-r4" src="../../static/images/wx_icon.png" mode="widthFix"></image>
					<text>微信快捷登录</text>
				</button>
				<!-- #endif -->
			</view>
			<view @click="isAgree = !isAgree" class="flex f-a-c margin-t12">
				<text :class="isAgree ? 'van-icon-checked t-color-y' : 'van-icon-circle t-color-b'" class="flex f-a-c f-j-c van-icon  f16-size margin-r4"></text>
				<text class="margin-r4 flex f-s-0">{{i18n['已阅读并同意']}}</text>
				<text @click="go('/pages/user/rules?type=1')" class="t-color-blue1 margin-r4  flex f-s-0">《{{i18n['用户协议']}}》</text>
				<text @click="go('/pages/user/rules?type=2')" class="t-color-blue1  flex f-s-0">《{{i18n['隐私政策']}}》</text>
			</view>
			<view class="padding-6"></view>
			<xieyi ref='xieyi' @agree="agree"></xieyi>
		</view>
	</view>
</template>
<script>
	import xieyi from '../common/xieyi.vue';
	import imgCode from '../common/imgcode.vue';
	const $ = require('../../utils/api.js');
	let nums = 0;
	export default {
		data() {
			return {
				phone: '',
				password: '',
				isAgree: false,
				code: '',
				url: '',
			};
		},
		onLoad: function(options) {
			this.url = options.url ? options.url : '';
			this.init();
			// #ifdef MP-WEIXIN
			this.getToken();
			// #endif
		},
		methods: {
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
								if (a) {
									if (nums >= 6) {
										nums = 0;
										uni.showToast({
											title: '授权失败,请重新授权',
											icon: 'none'
										});
									} else {
										self.postUserInfo(a, b, user, data.session_key);
									}
								}


						}
					}
				});
			},
			/**
			 * 从微信服务器获取用户信息
			 */
			getUserInfo: function(e) {
				uni.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: res => {

						// 提交用户数据
						let encryptedData = res.encryptedData;
						let iv = res.iv;
						this.postUserInfo(encryptedData, iv, res.userInfo);

					}
				});

			},
			/**
			 * 提交用户信息
			 */
			postUserInfo: function(a, b, user, session_key) {
				const self = this;
				if (!session_key) {
					session_key = ''
				};
				// if (!uni.getStorageSync('unionid')) {//公众号和小程序一起才需要unionid
				// 	self.getToken(a, b, user);
				// 	return;
				// }
				if (!uni.getStorageSync('session_key') && session_key != '') {
					self.getToken(a, b, user);
					return;
				}
				let postData = {
					encryptedData: a,
					iv: b,
					sessionKey: session_key != '' ? session_key : uni.getStorageSync('session_key'),
					openId: uni.getStorageSync('xcxopenid'),
					unionId: uni.getStorageSync('unionid'),
				};
				$.ajax({
					url: 'common/xcx/regitser',
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
			agree() {
				this.isAgree = true;
			},
			login() {
				const self = this;
				
				if (this.phone == '') {
					this.$toast(self.i18n['请输入登录账号']);
					return;
				}
				if (this.password == '' || this.password.length < 6) {
					this.$toast(self.i18n['请输入正确密码']);
					return;
				}
				// if (this.code == '') {
				// 	this.$toast(self.i18n['请输入图形验证码']);
				// 	return;
				// }
				if (!self.isAgree) {
					// $.$toast(self.i18n['请阅读并同意用户协议']);
					self.$refs.xieyi.open();
					return;
				}
				$.ajax({
					url: 'common/login',
					data: {
						username: this.phone,
						password: this.password,
						type: 1,
						registrationId: '', //	极光注册ID
						// cToken: self.$refs.imgCode.code.cToken,
						// captcha: self.code,
					},
					success(res) {
						uni.setStorageSync('token', res.data.tokenHead + ' ' + res.data.token);
						uni.setStorageSync('userInfo', res.data.member);
						$.$toast(self.i18n['登录成功']);
						if(self.url != '') {
							self.go(self.url, 2, 2000);
						}else {
							self.go('/pages/index/index', 3, 2000);
						}
						self.socket.close();
						self.socket.creatSocket({
							onMessage(res) {}
						})
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
									if(self.url != '') {
										self.go(self.url, 2, 2000);
									}else {
										self.go('/pages/index/index', 3, 2000);
									}
									self.socket.close();
									self.socket.creatSocket({
										onMessage(res) {}
									})
									
								}
							}
						});
					},
			init() {},


		},
		computed: {
			i18n() {
				return this.$t('login')
			},
		},
		created() {},
		mounted() {},
		destroyed() {},
		components: {
			imgCode,
			xieyi
		},
		onPullDownRefresh() {},
		onReachBottom() {}
	}
</script>
<style scoped>
	@import url('../../static/css/passport/login.css');
	@import url('../../static/css/page/white.css');
</style>
