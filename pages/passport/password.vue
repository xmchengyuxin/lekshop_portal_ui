<template>
	<view class="contain flex f-c f-j-s">
			<view class="padding-15">
				<view class=" flex fixed-top h-44 "  :style="{'padding-top': top + 'px'}">
					<view @click="back(1)"  class="flex f-s-0 padding-lr10 f-a-c f-j-c van-icon van-icon-arrow-left f20-size"></view>
				</view>
			<view class="padding-20"></view>
			<view class="padding-6"></view>
			<view class="padding-lr12">
				<view class="f20-size f-w-b">{{i18n['修改登录密码']}}</view>
				<view class="padding-tb6"></view>
				<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8">
					<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">+86</view>
					<view class="flex flex-1 padding-lr12">
						<input class="f16-size" v-model="phone"  type="tel" maxlength="11" :placeholder="i18n['请输入手机号码']">
					</view>
				</view>
				<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8">
					<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">
						<image class="w-20" src="../../static/images/login_passport.png" mode="widthFix"></image>
					</view>
					<view class="flex flex-1 padding-lr12">
						<input class="f16-size" v-model="password" type="password" :placeholder="i18n['请输入新登录密码']">
					</view>
				</view>
				<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8">
					<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">
						<image class="w-20" src="../../static/images/login_passport.png" mode="widthFix"></image>
					</view>
					<view class="flex flex-1 padding-lr12">
						<input class="f16-size" v-model="comfirmPassword" type="password" :placeholder="i18n['请输入确认新密码']">
					</view>
				</view>
				<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8">
					<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">
						<image class="w-20" src="../../static/images/login_code.png" mode="widthFix"></image>
					</view>
					<view class="flex flex-1 padding-lr12">
						<input class="f16-size" v-model="code" type="tel" :placeholder="i18n['请输入验证码']">
					</view>
					<view class="padding-6">
						<img-code class="h-30" @imgSuc="getImgCode"  ></img-code>
					</view>
				</view>
				<view class="flex h-50 b-radius-30 bg-color-f1 margin-t8">
					<view class="flex  f-a-c f-j-c f-s-0 icon-item f-w-b">
						<image class="w-20" src="../../static/images/login_code.png" mode="widthFix"></image>
					</view>
					<view class="flex flex-1 padding-lr12">
						<input class="f16-size" v-model="sms" type="tel" :placeholder="i18n['请输入验证码']">
					</view>
					<view class="padding-6">
						<phone-code :phone="phone" :code="code" :codeImg="codeImg" :sendType="3"  ></phone-code>
					</view>
				</view>
				<view @click="changePay" class="flex f-a-c f-j-c b-radius-30 h-44 bg-color-linear-y t-color-w f-w-500 margin-t20">{{i18n['确定修改']}}</view>
				<view class="flex f-j-s ">
					<view @click="go('/pages/passport/login',2)" class="f12-size  padding-tb20">{{i18n['密码登录']}}</view>
					<view @click="go('/pages/passport/register',2)" class="flex f-a-c">
						<text class="f12-size ">{{i18n['注册']}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="padding-15 safe-area">
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
	import phoneCode from '../common/phonecode.vue';
	const $ = require('../../utils/api.js');
	const api = require('../../utils/validate.js');
	export default {
		data() {
			return {
				phone: '',
				password: '',
				comfirmPassword: '',
				isAgree: false,
				sms: '',
				code: '',
				codeImg: '',
			};
		},
		onLoad: function() {
			this.init();
		},
		methods: {
			getImgCode(info) {
				this.codeImg = info;
			},
			changePay() {
				const self = this;
				if(!self.isAgree) {
					$.$toast(self.i18n['请阅读并同意用户协议']);return;
				}
				let check = api.validate([
					{
						value: this.phone,
						text:self.i18n['请输入手机号码'],
						rules: 'phone'
					},
					{
						value: this.password,
						text:self.i18n['请输入新登录密码'],
						rules: ''
					},
					{
						value: this.comfirmPassword,
						text:self.i18n['请输入确认新密码'],
						rules: ''
					},
					{
						value: this.sms,
						text:self.i18n['请输入验证码'],
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
						$.$toast(self.i18n['操作成功']);
						$.go('/pages/index/index',3,2000);
					}
				})
			},
			init() {
				
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
		components: {phoneCode,imgCode,xieyi},
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