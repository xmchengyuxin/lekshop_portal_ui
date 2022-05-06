<template>
	<view class="contain flex f-c f-j-s" style="min-height: 90vh;">
		<view>
		<view class="h-50 flex f-a-c padding-lr12">
			<text class="f16-size t-color f-w-b">手机号：</text>
			<text class="f16-size t-color-b f-w-b">{{user.phone | hideCenterText}}</text>
		</view>
		<view class="bg-color-w padding-lr12">
			<view class="flex h-50 f-a-c b-bottom">
				<text class="flex f-s-0 t-color f-w-b">新的二级密码</text>
				<view class="flex flex-1">
					<input v-model="password" type="password" class="input f-w-500" placeholder="请输入" placeholder-class="t-color-9"> 
				</view>
			</view>
			<view class="flex h-50 f-a-c b-bottom">
				<text class="flex f-s-0 t-color f-w-b">确认新的二级密码</text>
				<view class="flex flex-1">
					<input v-model="surePassword" type="password" class="input f-w-500" placeholder="请输入" placeholder-class="t-color-9"> 
				</view>
			</view>
			<view class="flex h-50 f-a-c b-bottom">
				<text class="flex f-s-0 t-color f-w-b">手机验证码</text>
				<view class="flex flex-1">
					<input v-model="sms" maxlength="6" type="text" class="input f-w-500" placeholder="请输入" placeholder-class="t-color-9"> 
				</view>
			</view>
			<view class="flex h-50 f-a-c">
				<text class="flex f-s-0 t-color f-w-b">图形验证码</text>
				<view class="flex flex-1 f-a-c">
					<input v-model="codeText" maxlength="6" type="text" class="input f-w-500 margin-r12" placeholder="请输入" placeholder-class="t-color-9"> 
					<image class="flex f-s-0" style="width: 80px;height: 30px;" @click="getCode" :src="'data:image/png;base64,'+code.img" ></image>
				</view>
			</view>
			
		</view>
		</view>
		<view class="padding-12">
			<view @click="getCodeText" class="flex f-a-c f-j-c h-50 bg-color-w bg-shadow-0 b-radius-5 t-color-r">
				<text class="f16-size t-color-r f-w-b">{{smsTxt}}</text>
			</view>
			<view @click="changePay" class="flex f-a-c f-j-c h-50 bg-color-linear-g b-radius-5 t-color-w margin-t12">
				<text class="f16-size t-color-w f-w-500">确定修改</text>
			</view>
		</view>
	</view>
</template>
<style scoped>
@import url('../../static/css/passport/pay.css');
@import url('../../static/css/page/white.css');
</style>
<script>
	const $ = require('../../utils/api.js');
	const api = require('../../utils/validate.js');
	let codeTimeOut;
	export default {
		data() {
			return {
				user: '',
				surePassword: '',
				password: '',
				code: '',
				sms: '',
				codeText: '',
				smsTxt: '获取验证码',
			};
		},
		onLoad: function() {
			this.init();
		},
		methods: {
			getCodeText() {
				const self = this;
				
				if (this.smsTxt != '获取验证码') {
					return;
				}
				clearInterval(codeTimeOut);
				let postData = {
					phone: this.user.phone,
					sendType: 4
				};
				let time = 60;
				codeTimeOut = setInterval(function() {
					time--;
					self.smsTxt = '重新发送(' + time + 's)';
					if (time <= 0) {
						clearInterval(codeTimeOut);
						self.smsTxt = '获取验证码';
					}
				}, 1000);
				$.ajax({
					url: 'common/sendCode',
					data: postData,
					method: 'POST',
					success(res) {
						
					},
					complete(res) {
						if(res.code != 200) {
							self.$toast(res.message);
							clearInterval(codeTimeOut);
							self.smsTxt = '获取验证码';
						}else{
						}
					}
				})
			
			},
			getCode() {
				const self = this;
				$.ajax({
					url: 'common/captcha',
					data: {},
					method: 'GET',
					success(res) {
						self.code  = res.data;
					}
				})
			
			},
			changePay() {
				const self = this;
				let check = api.validate([
					{
						value: this.password,
						text:'请输入新的二级密码',
						rules: ''
					},
					{
						value: this.surePassword,
						text:'请输入确认新的二级密码',
						rules: ''
					},
					{
						value: this.codeText,
						text:'请输入图形验证码',
						rules: ''
					},
					{
						value: this.sms,
						text:'请输入手机验证码',
						rules: ''
					}
				]);
				if(!check){return};
				$.ajax({
					url: 'techUser/updatePayPassword',
					data: {
						password: this.password,
						comfirmPassword: this.surePassword,
						cToken: this.code.cToken,
						captcha: this.codeText,
						code: this.sms,
					},
					method: 'POST',
					success(res) {
						self.$toast('操作成功');
						$.back(1,2000);
					}
				})
			},	  
			init() {
				this.user = uni.getStorageSync('userInfo');
				this.getCode();
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
