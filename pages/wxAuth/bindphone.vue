<template>
	<view class="contain login">
			<view class="user-img b-radius" :style="logo | bgimg(200)+''"></view>
			<view class="wrap-info flex f-c f-j-c bg-color-w b-radius-5" style="height: auto;">
				<!-- #ifdef MP-WEIXIN -->
				<view class="wrap-input flex f-a-c padding-lr12">
					<button class="flex f-a-c f-j-s t-color-8" @getphonenumber="getPhoneNumber" open-type="getPhoneNumber" v-if="showPhone">请输入手机号</button>
					<input v-if="!showPhone" v-model="username"  type="number" maxlength="11" placeholder="请输入手机号"  class="flex flex-1"></input>
				</view>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<view class="wrap-input flex f-a-c code-icon padding-lr12" style="position: relative;">
					<input  v-model="username" type="number" maxlength="11" placeholder="请输入手机号"  class="flex flex-1 w100"></input>
				</view> 
				<!-- #endif -->
				
				<view class="wrap-input flex f-a-c code-icon padding-lr12" style="position: relative;">
					<input  v-model="password" type="password" placeholder="请输入密码"  class="flex flex-1 w100"></input>
				</view> 
				<view class="wrap-input flex f-a-c code-icon padding-lr12" style="position: relative;">
					<input  v-model="confirmPassword" type="password" placeholder="请确认密码"  class="flex flex-1 w100"></input>
				</view>
				<!-- #ifndef MP-WEIXIN -->
				<view class="wrap-input flex f-a-c code-icon padding-lr12" style="position: relative;">
					<input v-model="sms" type="number" placeholder="请输入验证码"  class="flex flex-1" style="width: 60%;"></input>
					<span :class="smsTxt == '获取验证码' ? '' : 'on'" class="code-btn flex f-a-c f-j-c"  @click="getCode">{{smsTxt}}</span>
				</view> 
				<!-- #endif -->
			</view>
			<view class="btn flex f-a-c f-j-c bg-color-linear-g t-color-w f16-size b-radius-30"  @click="loginBtn">确定</view>
		
	</view>
</template>
<style scoped>

</style>
<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	const $ = require('@/utils/api.js');
	const api = require('@/utils/validate.js');
	let codeTimeOut;
	export default {
		data() {
			return {
				username: '',
				sms: '',
				smsTxt: '获取验证码',
				type: '1',
				show: false,
				begin: '',
				isFlag: false,
				showPhone: true,
				user: '',
				confirmPassword: '',
				password: '',
				logo: '',
			};
		},
		onLoad: function() {
			this.user = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
			if(getApp().globalData.isWeiXin) {
				this.showPhone = false;
			}
			this.init();
			this.logo = uni.getStorageSync('config') ? uni.getStorageSync('config').logo : '';
		},
		methods: {
			getPhoneNumber(e) {
				const self = this;
				$.ajax({
					url: 'common/xcx/getPhone',
					data: {
						encryptedData: e.detail.encryptedData,
						sessionKey: uni.getStorageSync('session_key'),
						iv: e.detail.iv
					},
					method: 'GET',
					success(res) {
						self.username = res.data;
						self.showPhone = false;
						
						// self.loginBtn();
					}
				})
			
			},
			onCancel() {},
			onConfirm(e) {
				console.log(e);
				this.begin = e.result;
			},
			showTime() {
				this.show = true;
			},
			cancel() {
				this.show = false;
			},
			loginBtn() {
				const self = this;
				let check = api.validate([
					{
						value: this.username,
						text: '',
						rules: 'phone'
					},
					{
						value: this.password,
						text: '请输入登录密码',
						rules: ''
					},
					{
						value: this.confirmPassword,
						text: '请确认登录密码',
						rules: ''
					},
					// {
					// 	value: this.data.begin,
					// 	text: '请选择您的生日',
					// 	rules: ''
					// },
				]);
				if (!check) {
					return
				};
				// #ifndef MP-WEIXIN
				if(self.sms == '') {
					$.$toast('请输入验证码');return
				}
				// #endif
				$.ajax({
					url: 'bindPhone',
					data: {
						phone: this.username,
						// birthday: this.data.begin + ' 00:00:00',
						code: this.sms,
						password: self.password,
						confirmPassword: self.confirmPassword
					},
					method: 'POST',
					success(res) {
						$.$toast('绑定成功');
						wx.setStorageSync('token', res.data.tokenHead + ' ' + res.data.token);
					
						let pages = getCurrentPages(); // 当前页面
						let beforePage = pages[pages.length - 2]; // 前一个页面
						let len = 1;
					
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
				})
			
			},
			getCode() {
			
				const self = this;
				if (this.username == '' || this.username.length != 11) {
					$.$toast('请输入正确手机号');
					return;
				}
				if (this.smsTxt != '获取验证码') {
					return;
				}
				clearInterval(codeTimeOut);
				let postData = {
					phone: this.username,
					sendType: 2
				};
				let time = 60;
				codeTimeOut = setInterval(function() {
					time--;
					let text = '重新发送(' + time + 's)';
					self.smsTxt = text;
					if (time <= 0) {
						clearInterval(codeTimeOut);
						self.smsTxt = '获取验证码';
					}
				}, 1000);
			
				$.ajax({
					url: 'common/sendCode',
					data: postData,
					method: 'post',
					success(res) {
			
					},
					complete(res) {
					}
				})
			
			},
			init() {},


		},
		created() {
		},
		mounted() {},
		destroyed() {},
		components: {
			wPicker
		},
		onPullDownRefresh() {
		},
		onReachBottom() {
		}
	}
</script>
<style scoped>
	.login {
		padding: 50px 15px 30px;
	}
	.wrap-info {
		padding: 0 15px;
	}
	.wrap-input {
		height: 50px;
		border-bottom: 1px solid #F4F4F4;
	}
	.wrap-input button {
		margin: 0;
	}
	.btn {
		height: 44px;
		margin-top: 50px;
	}
	.user-img {
		width: 70px;
		height: 70px;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		background-color: #D2D2D2;
		margin: 0 auto 45px;
	}
	button {
		width: 100%;
		height: 100%;
	}
	button::after {
		border: none;
	}
</style>