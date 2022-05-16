<template>
	<view class="contain">
<view class="padding-15">
	<view class="padding-20"></view>
			<view class="padding-6"></view>
			<view class="padding-lr12">
				<view class="f20-size f-w-b">手机号注册</view>
				<view @click="isAgree = !isAgree" class="flex f-a-c margin-t8">
					<text :class="isAgree ? 'van-icon-checked t-color-g1' : 'van-icon-circle t-color-b'" class="flex f-a-c f-j-c van-icon  f16-size margin-r4"></text>
					<text class="margin-r4">已阅读并同意</text>
					<text @click="go('/pages/user/rules?type=1')" class="t-color-blue1 margin-r4">用户协议</text>
					<text class="margin-r4">和</text>
					<text @click="go('/pages/user/rules?type=2')" class="t-color-blue1">隐私政策</text>
				</view>
				<view class="padding-tb6"></view>
				<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8">
					<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">
						<image class="w-20" src="../../static/images/tab_user.png" mode="widthFix"></image>
					</view>
					<view class="flex flex-1 padding-lr12">
						<input v-model="name" type="text" placeholder="请输入">
					</view>
				</view>
				<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8">
					<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">+86</view>
					<view class="flex flex-1 padding-lr12">
						<input v-model="phone" type="tel" placeholder="请输入">
					</view>
				</view>
				<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8 over-h">
					<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">
						<image class="w-20" src="../../static/images/login_code.png" mode="widthFix"></image>
					</view>
					<view class="flex flex-1 padding-lr12">
						<input v-model="code" type="number" placeholder="请输入">
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
						<input v-model="sms" type="tel" placeholder="请输入验证码">
					</view>
					<view class="padding-6">
						<phone-code ref="phonecode" :codeImg="codeImg" :code="code" :phone="phone"  :sendType="1"  ></phone-code>
					</view>
				</view>
				<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8">
					<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">
						<image class="w-20" src="../../static/images/login_passport.png" mode="widthFix"></image>
					</view>
					<view class="flex flex-1 padding-lr12">
						<input v-model="password" type="password" placeholder="设置输入新密码">
					</view>
				</view>
				<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8">
					<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">
						<image class="w-20" src="../../static/images/login_passport.png" mode="widthFix"></image>
					</view>
					<view class="flex flex-1 padding-lr12">
						<input v-model="confirmPassword" type="password" placeholder="确认新密码">
					</view>
				</view>
				<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8">
					<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">
						<image class="w-20" src="../../static/images/login_invite.png" mode="widthFix"></image>
					</view>
					<view class="flex flex-1 padding-lr12">
						<input v-model="invite" type="text" placeholder="请输入邀请码（选填）">
					</view>
				</view>
				<view @click="register" class="flex f-a-c f-j-c b-radius-30 h-44 bg-color-linear-g t-color-w f-w-500 margin-t20">注册</view>
				<view class="flex f-j-s ">
					<view @click="back(1)" class="f12-size  padding-tb20">密码登录</view>
					<view @click="go('/pages/passport/password')" class="flex f-a-c">
						<text class="f12-size ">忘记了？</text>
						<text class="f12-size t-color-y">找回密码</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import imgCode from '../common/imgcode.vue';
	import phoneCode from '../common/phonecode.vue';
	const $ = require('../../utils/api.js');
	const api = require('../../utils/validate.js');
	export default {
		data() {
			return {
				name: '',
				phone: '',
				sms: '',
				code: '',
				codeImg: '',
				password: '',
				confirmPassword: '',
				invite: '',
				isAgree: false,
			};
		},
		onLoad: function(options) {
			this.invite = options.invite ? options.invite : '';
			this.init();
		},
		methods: {
			getImgCode(res) {
				this.codeImg = res;
			},
			register() {
				const self = this;
				if(!self.isAgree) {
					$.$toast('请阅读并同意用户协议');return;
				}
				let check = api.validate([
					{
						value: this.name,
						text:'请输入用户名',
						rules: ''
					},
					{
						value: this.phone,
						text:'请输入正确手机号码',
						rules: 'phone'
					},
					{
						value: this.password,
						text:'请输入登录密码',
						rules: ''
					},
					{
						value: this.confirmPassword,
						text:'请输入确认密码',
						rules: ''
					},
					{
						value: this.sms,
						text:'请输入验证码',
						rules: ''
					}
				]);
				if(!check){return};
				$.ajax({
					url: 'common/register',
					data: {
						username: self.name,
						phone: self.phone,
						password: this.password,
						code: this.sms,
						inviteCode: this.invite,
						confirmPassword: this.confirmPassword,
						type: 1,
						
					},
					success(res) {
						self.$toast('注册成功');
						uni.setStorageSync('token',res.data.tokenHead + ' ' + res.data.token);
						uni.setStorageSync('userInfo',res.data.member);
						self.go('/pages/index/index',3,2000);
					}
				});
			},
			init() {
				// #ifdef H5
				var ua = window.navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i) == 'micromessenger'){
					if(uni.getStorageSync('token') >= 0) {
						self.go('/pages/index/index',3,2000);
					}
				    return true;
				}else{
				    return false;
				}
				// #endif
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
	@import url('../../static/css/passport/login.css');
	@import url('../../static/css/page/white.css');
</style>