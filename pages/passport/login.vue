<template>
	<view class="contain">
<view class="padding-15">
			<view class="padding-20"></view>
			<view class="padding-30"></view>
			<view class="padding-lr12">
				<view class="f20-size f-w-b">{{i18n['手机号密码登录']}}</view>
				<view @click="isAgree = !isAgree" class="flex f-a-c margin-t8">
					<text :class="isAgree ? 'van-icon-checked t-color-y' : 'van-icon-circle t-color-b'" class="flex f-a-c f-j-c van-icon  f16-size margin-r4"></text>
					<text class="margin-r4">{{i18n['已阅读并同意']}}</text>
					<text @click="go('/pages/user/rules?type=1')" class="t-color-blue1 margin-r4">{{i18n['用户协议']}}</text>
					<text class="margin-r4">{{i18n['和']}}</text>
					<text @click="go('/pages/user/rules?type=2')" class="t-color-blue1">{{i18n['隐私政策']}}</text>
				</view>
				<view class="padding-tb6"></view>
				<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8">
					<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">+86</view>
					<view class="flex flex-1 padding-lr12">
						<input v-model="phone" type="tel" maxlength="11" :placeholder="i18n['请输入登录账号']">
					</view>
				</view>
				<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8">
					<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">
						<image class="w-20" src="../../static/images/login_passport.png" mode="widthFix"></image>
					</view>
					<view class="flex flex-1 padding-lr12">
						<input v-model="password" type="password" :placeholder="i18n['请输入登录密码']">
					</view>
				</view>
				<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8 over-h">
					<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">
						<image class="w-20" src="../../static/images/login_code.png" mode="widthFix"></image>
					</view>
					<view class="flex flex-1 padding-lr12">
						<input v-model="code" type="number" :placeholder="i18n['图形验证码']">
					</view>
					<view class="flex f-a-c f-s-0">
						<img-code ref="imgCode" class="flex  h-30"></img-code>
					</view>
				</view>
				<view @click="login" class="flex f-a-c f-j-c b-radius-30 h-44 bg-color-linear-y t-color-w f-w-500 margin-t20">{{i18n['登录']}}</view>
				<view class="flex f-j-s ">
					<view @click="go('/pages/passport/register')" class="f12-size  padding-tb20">{{i18n['注册']}}</view>
					<view @click="go('/pages/passport/password')" class="flex f-a-c">
						<text class="f12-size ">{{i18n['忘记了']}}</text>
						<text class="f12-size t-color-y">{{i18n['找回密码']}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import imgCode from '../common/imgcode.vue';
	const $ = require('../../utils/api.js');
	export default {
		data() {
			return {
				phone: '',
				password: '',
				isAgree: false,
				code: '',
			};
		},
		onLoad: function() {
			this.init();
		},
		methods: {
			login() {
				const self = this;
				if(!self.isAgree) {
					$.$toast(self.i18n['请阅读并同意用户协议']);return;
				}
				if (this.phone == '') {
					this.$toast(self.i18n['请输入登录账号']);
					return;
				}
				if (this.password == '' || this.password.length < 6) {
					this.$toast(self.i18n['请输入正确密码']);
					return;
				}
				if (this.code == '') {
					this.$toast(self.i18n['请输入图形验证码']);
					return;
				}
				$.ajax({
					url: 'common/login',
					data: {
						username: this.phone,
						password: this.password,
						type: 1,
						registrationId: '',//	极光注册ID
						cToken: self.$refs.imgCode.code.cToken,
						captcha: self.code,
					},
					
					success (res) {
						uni.setStorageSync('token', res.data.tokenHead + ' ' + res.data.token);
						uni.setStorageSync('userInfo', res.data.member);
						$.$toast(self.i18n['登录成功']);
						self.go('/pages/index/index',3,2000);
						self.socket.close();
						self.socket.creatSocket({
							onMessage(res) {
							}
						})
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
		created() {
		},
		mounted() {},
		destroyed() {},
		components: {imgCode},
		onPullDownRefresh() {
		},
		onReachBottom() {
		}
	}
</script>
<style scoped>
	@import url('../../static/css/passport/login.css');
	@import url('../../static/css/page/white.css');
</style>