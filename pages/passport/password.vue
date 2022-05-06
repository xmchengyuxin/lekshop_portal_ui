<template>
	<view class="contain">
<view class="padding-15">
			<view class="padding-30"></view>
			<view class="padding-lr12">
				<view class="f20-size f-w-b">修改登录密码</view>
				<view @click="isAgree = !isAgree" class="flex f-a-c margin-t8">
					<text :class="isAgree ? 'van-icon-checked t-color-g1' : 'van-icon-circle t-color-b'" class="flex f-a-c f-j-c van-icon  f16-size margin-r4"></text>
					<text class="margin-r4">已阅读并同意</text>
					<text @click="go('/pages/user/rules?type=1')" class="t-color-blue1 margin-r4">用户协议</text>
					<text class="margin-r4">和</text>
					<text @click="go('/pages/user/rules?type=2')" class="t-color-blue1">隐私政策</text>
				</view>
				<view class="padding-tb6"></view>
				<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8">
					<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">+86</view>
					<view class="flex flex-1 padding-lr12">
						<input v-model="phone"  type="tel" maxlength="11" placeholder="请输入">
					</view>
				</view>
				<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8">
					<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">
						<image class="w-20" src="../../static/images/login_passport.png" mode="widthFix"></image>
					</view>
					<view class="flex flex-1 padding-lr12">
						<input v-model="password" type="password" placeholder="请输入密码">
					</view>
				</view>
				<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8">
					<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">
						<image class="w-20" src="../../static/images/login_passport.png" mode="widthFix"></image>
					</view>
					<view class="flex flex-1 padding-lr12">
						<input v-model="comfirmPassword" type="password" placeholder="请确认密码">
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
						<view @click="getCode" class="flex f-a-c f-j-c bg-color-w t-color-y f12-size b-radius-30 w-80 h100">{{smsTxt}}</view>
					</view>
				</view>
				<view @click="changePay" class="flex f-a-c f-j-c b-radius-30 h-44 bg-color-linear-g t-color-w f-w-500 margin-t20">登录</view>
				<view class="flex f-j-s ">
					<view @click="go('/pages/passport/login',2)" class="f12-size  padding-tb20">密码登录</view>
					<view @click="go('/pages/passport/register',2)" class="flex f-a-c">
						<text class="f12-size ">注册</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	const $ = require('../../utils/api.js');
	const api = require('../../utils/validate.js');
	let codeTimeOut;
	export default {
		data() {
			return {
				phone: '',
				password: '',
				comfirmPassword: '',
				codeText: '',
				code: '',
				smsTxt: '获取验证码',
				sms: '',
				isAgree: false,
			};
		},
		onLoad: function() {
			this.init();
		},
		methods: {
			getCode() {
				const self = this;
				if (this.phone == '' || this.phone.length != 11) {
					this.$toast('请正确手机号');
					return;
				}
				if (this.smsTxt != '获取验证码') {
					return;
				}
				clearInterval(codeTimeOut);
				let postData = {
					phone: this.phone,
					sendType: 3
				};
				let time = 60;
				codeTimeOut = setInterval(function() {
					time--;
					self.smsTxt = time + 's';
					if (time <= 0) {
						clearInterval(codeTimeOut);
						self.smsTxt = '获取验证码';
					}
				}, 1000);
				$.ajax({
					url: 'common/sendCode',
					data: postData,
					success(res) {},
					complete(res) {
						if(res.code != 200) {
							self.$toast(res.message);
							clearInterval(codeTimeOut);
							self.smsTxt = '获取验证码';
						}else{
						}
					}
				});
			},
			changePay() {
				const self = this;
				if(!self.isAgree) {
					$.$toast('请阅读并同意用户协议');return;
				}
				let check = api.validate([
					{
						value: this.phone,
						text:'请输入手机号码',
						rules: 'phone'
					},
					{
						value: this.password,
						text:'请输入新登录密码',
						rules: ''
					},
					{
						value: this.comfirmPassword,
						text:'请输入确认新密码',
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
					url: 'common/loginByCode',
					data: {
						username: this.phone,
						code: this.sms,
					},
					method: 'POST',
					success(res) {
						uni.setStorageSync('token',res.data.tokenHead + ' ' + res.data.token);
						uni.setStorageSync('userInfo',res.data.member);
						self.setPassword();
					}
				})
			},	 
			setPassword() {
				const self = this;
				$.ajax({
					url: 'member/setPassword',
					data: {
						password: self.password,
						comfirmPassword: self.comfirmPassword,
					},
					method: 'POST',
					success(res) {
						$.$toast('操作成功');
						$.go('/pages/index/index',3,2000);
					}
				})
			},
			init() {
				
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
<style scoped>
	@import url('../../static/css/passport/login.css');
	@import url('../../static/css/page/white.css');
</style>