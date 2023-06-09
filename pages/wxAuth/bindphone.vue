<template>
	<view class="contain login">
			<swiper class="wrap-swiper" :disable-touch="true" :current="active" @change="changeSwiper" :indicator-dots="false" :autoplay="false" :interval="1000" :duration="500">
				<swiper-item catchtouchmove='onTouchMove' class="padding-lr30 box-b">
					<view class="padding-6"></view>
					<view @click="goBack()" class="flex f-j-e margin-b16 t-color-y">{{i18n['跳过']}}</view>
					<view class="flex f-a-c f-j-c f16-size">{{i18n['绑定安全手机']}}</view>
					<view class="f13-size t-color-9 margin-t20">{{i18n['您当前没有绑定手机号码，当忘记密码时，无法登录账号或申诉找回。请先绑定手机号。']}}</view>
					
					<view class="flex h-50 b-radius-30 bg-color-f1 margin-t20">
						<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">+86</view>
						<view class="flex flex-1 padding-lr12">
							<button v-if="showPhone" class="flex f-a-c f16-size f-j-s t-color-8" @getphonenumber="getPhoneNumber" open-type="getPhoneNumber">{{username == '' ? i18n['请输入手机号'] : username}}</button>
							<input v-else class="f16-size" v-model="username" type="number" maxlength="11" :placeholder="i18n['请输入手机号']">
						</view>
					</view>
					<view class="h-40 margin-t30 flex f-a-c f-j-c bg-color-linear-y t-color-w f16-size b-radius-30"  @click="next()">{{i18n['下一步']}}</view>
				</swiper-item>
				<swiper-item catchtouchmove='onTouchMove' class="padding-lr30 box-b">
					<view class="padding-6"></view>
					<view @click="goBack()" class="flex f-j-e margin-b16 t-color-y">{{i18n['跳过']}}</view>
					<view class="flex f-a-c f-j-c f16-size">{{i18n['绑定安全手机']}}</view>
					<view class="f13-size f-w t-color-9 margin-t20">
						{{i18n['我们向您的手机1发送了一条验证短信'] | i18n('+86 '+username)}}
					</view>
					<view class="flex h-50 b-radius-30 bg-color-f1 margin-t20 over-h">
						<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">
							<image class="w-20" src="../../static/images/login_code.png" mode="widthFix"></image>
						</view>
						<view class="flex flex-1 padding-lr12">
							<input class="f16-size" v-model="code" type="number"  :placeholder="i18n['请输入图形验证码']">
						</view>
						<view class="flex f-a-c f-s-0">
							<img-code ref="imgCode" @imgSuc="getImgCode" class="flex  h-30"></img-code>
						</view>
					</view>
					<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8">
						<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">
							<image class="w-20" src="../../static/images/login_code.png" mode="widthFix"></image>
						</view>
						<view class="flex flex-1 padding-lr12">
							<input class="f16-size" v-model="sms" type="tel"  :placeholder="i18n['请输入手机验证码']">
						</view>
						<view class="padding-6">
							<phone-code ref="phonecode" :codeImg="codeImg" :code="code" :phone="username"  :sendType="2"  ></phone-code>
						</view>
					</view>
					<view class="h-40 margin-t30 flex f-a-c f-j-c bg-color-linear-y t-color-w f16-size b-radius-30"  @click="bindPhone()">{{i18n['下一步']}}</view>
					<view class="h-40 margin-t12 flex f-a-c f-j-c b-color-y t-color-y f16-size b-radius-30"  @click="active=0">{{i18n['返回']}}</view>
				</swiper-item>
				<swiper-item catchtouchmove='onTouchMove' class="padding-lr30 box-b">
					<view class="padding-6"></view>
					<view @click="goBack()" class="flex f-j-e margin-b16 t-color-y">{{i18n['跳过']}}</view>
					<view class="flex f-a-c f-j-c f16-size">{{i18n['设置登录密码']}}</view>
					<view class="padding-6"></view>
					<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8">
						<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">
							<image class="w-20" src="../../static/images/login_passport.png" mode="widthFix"></image>
						</view>
						<view class="flex flex-1 padding-lr12">
							<input class="f16-size" v-model="password" type="password"  :placeholder="i18n['请输入登录密码']">
						</view>
					</view>
					<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8">
						<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">
							<image class="w-20" src="../../static/images/login_passport.png" mode="widthFix"></image>
						</view>
						<view class="flex flex-1 padding-lr12">
							<input class="f16-size" v-model="confirmPassword" type="password"  :placeholder="i18n['请输入确认密码']">
						</view>
					</view>
					
					<view class="h-40 margin-t30 flex f-a-c f-j-c bg-color-linear-y t-color-w f16-size b-radius-30"  @click="setPassword">{{i18n['保存']}}</view>
					<view v-if="showPhone" class="h-40 margin-t12 flex f-a-c f-j-c b-color-y t-color-y f16-size b-radius-30"  @click="active=0">{{i18n['返回']}}</view>
					<view v-else class="h-40 margin-t12 flex f-a-c f-j-c b-color-y t-color-y f16-size b-radius-30"  @click="active=1">{{i18n['返回']}}</view>
				</swiper-item>
			</swiper>		
	</view>
</template>
<style scoped>
@import url('../../static/css/page/white.css');
	@import url('../../static/css/passport/login.css');
</style>
<script>
	import imgCode from '../common/imgcode.vue';
	import phoneCode from '../common/phonecode.vue';
	const $ = require('@/utils/api.js');
	const api = require('@/utils/validate.js');
	let codeTimeOut;
	export default {
		data() {
			return {
				username: '',
				sms: '',
				code: '',
				codeImg: '',
				type: '1',
				isFlag: false,
				showPhone: false,
				user: '',
				confirmPassword: '',
				password: '',
				logo: '',
				active: 0,
				url: '',
			};
		},
		onLoad: function(options) {
			this.url = options.url ? options.url : '';
			this.user = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
			this.init();
		},
		methods: {
			onTouchMove() {
				return false;
			},
			getImgCode(res) {
				this.codeImg = res;
			},
			changeSwiper(e) {
				this.active = e.detail.current;
			},
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
						
						// self.loginBtn();
					}
				})
			
			},
			next() {
				if(this.active == 0) {
					if(this.username == ''){
						$.$toast(this.i18n('请输入手机号码'));return;
					}
					if(this.showPhone){
						this.sms = '102938';
						this.bindPhone();
					}else{
						this.active = 1;
					}
					return;
				}
				if(this.active == 1) {
					this.active = 2;
				}
			},
			bindPhone() {
				const self = this;
				let check = api.validate([
					{
						value: this.username,
						text: '',
						rules: 'phone'
					},
					{
						value: this.sms,
						text: this.i18n['请输入验证码'],
						rules: ''
					},
				]);
				if (!check) {
					return
				};
				$.ajax({
					url: 'member/updatePhone',
					data: {
						phone: this.username,
						code: this.sms,
					},
					method: 'POST',
					success(res) {
						self.active = 2;
						if(res.data && res.data.token) {
							uni.setStorageSync('token', res.data.tokenHead + ' ' + res.data.token);
							uni.setStorageSync('userInfo', res.data.member);
						}
						
					}
				})
			
			},
			setPassword() {
				const self = this;
				let check = api.validate([
					{
						value: this.password,
						text:self.i18n['请输入登录密码'],
						rules: ''
					},
					{
						value: this.confirmPassword,
						text:self.i18n['请输入确认密码'],
						rules: ''
					},
				]);
				if (!check) {
					return
				};
				$.ajax({
					url: 'member/setPassword',
					data: {
						password: this.password,
						comfirmPassword: this.confirmPassword,
					},
					method: 'POST',
					success(res) {
						wx.setStorageSync('token', res.data.tokenHead + ' ' + res.data.token);
						if(res.data.member) {
							uni.setStorageSync('userInfo', res.data.member);
						}
						setTimeout(() => {
							self.goBack();
						},2000)
						$.$toast(self.i18n('操作成功'));
					}
				})
			},
			goBack() {
				const self = this;
				if(self.url != '') {
					self.go(self.url, 2);
				}else {
					self.go('/pages/index/index', 3);
				}
			},
			init() {
				// #ifdef MP-WEIXIN
				this.showPhone = true;
				// #endif
			},
		},
		computed: {
			i18n() {
				return this.$t('login')
			},
		},
		created() {
		},
		mounted() {},
		destroyed() {},
		components: {phoneCode,imgCode},
		onPullDownRefresh() {
		},
		onReachBottom() {
		}
	}
</script>
<style scoped>
	.wrap-swiper {
		height: 100%;
	}
	button {
		width: 100%;
		height: 100%;
		margin: 0;
	}
	button::after {
		border: none;
	}
</style>