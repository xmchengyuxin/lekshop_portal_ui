<template>
	<view class="contain">
<view class="padding-15">
			<view class="padding-20"></view>
			<view class="padding-30"></view>
			<view class="padding-lr12">
				<view class="f20-size f-w-b">手机号密码登录</view>
				<view @click="isAgree = !isAgree" class="flex f-a-c margin-t8">
					<text :class="isAgree ? 'van-icon-checked t-color-y' : 'van-icon-circle t-color-b'" class="flex f-a-c f-j-c van-icon  f16-size margin-r4"></text>
					<text class="margin-r4">已阅读并同意</text>
					<text @click="go('/pages/user/rules?type=1')" class="t-color-blue1 margin-r4">用户协议</text>
					<text class="margin-r4">和</text>
					<text @click="go('/pages/user/rules?type=2')" class="t-color-blue1">隐私政策</text>
				</view>
				<view class="padding-tb6"></view>
				<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8">
					<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">+86</view>
					<view class="flex flex-1 padding-lr12">
						<input v-model="phone" type="tel" maxlength="11" placeholder="请输入">
					</view>
				</view>
				<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8">
					<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">
						<image class="w-20" src="../../static/images/login_passport.png" mode="widthFix"></image>
					</view>
					<view class="flex flex-1 padding-lr12">
						<input v-model="password" type="password" placeholder="请输入">
					</view>
				</view>
				<view @click="login" class="flex f-a-c f-j-c b-radius-30 h-44 bg-color-linear-y t-color-w f-w-500 margin-t20">登录</view>
				<view class="flex f-j-s ">
					<view @click="go('/pages/passport/register')" class="f12-size  padding-tb20">注册</view>
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
	const $ = require('../../utils/api.js');
	export default {
		data() {
			return {
				phone: '',
				password: '',
				isAgree: false,
			};
		},
		onLoad: function() {
			this.init();
		},
		methods: {
			login() {
				const self = this;
				if(!self.isAgree) {
					$.$toast('请阅读并同意用户协议');return;
				}
				if (this.phone == '') {
					this.$toast('请输入登录账号');
					return;
				}
				if (this.password == '' || this.password.length < 6) {
					this.$toast('请输入正确密码');
					return;
				}
				$.ajax({
					url: 'common/login',
					data: {
						username: this.phone,
						password: this.password,
						registrationId: '',//	极光注册ID
					},
					
					success (res) {
						uni.setStorageSync('token', res.data.tokenHead + ' ' + res.data.token);
						uni.setStorageSync('userInfo', res.data.member);
						$.$toast('登录成功');
						self.go('/pages/index/index',3,2000);
					}
				});
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
<style scoped>
	@import url('../../static/css/passport/login.css');
	@import url('../../static/css/page/white.css');
</style>