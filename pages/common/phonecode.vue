<template>
	<view  @click="getCode" :class="[bgColor,textColor,codeClass]">
		{{smsTxt}}
	</view>
</template>
<style scoped>
/* @import url('../../static/css/index/index.css'); */
</style>
<script>
	const $ = require('../../utils/api.js');
	const API = require('../../utils/api/common.js').default;
	let self;
	let codeTimeOut;
	export default {
		props: {
			phone: {
				required: true,
				type: String,
			},
			sendType: {//1注册 2绑定 3忘记密码 4通用
				type: Number,
				default: 4
			},
			bgColor: {
				type: String,
				default: 'bg-color-w'
			},
			textColor: {
				type: String,
				default: 't-color-y'
			},
			codeClass: {
				type: String,
				default: 'flex f-a-c f-j-c  f12-size b-radius-30 w-80 h100'
			},
			code: '',
			codeImg: '',
		},	
		data() {
			return {
				smsTxt: '获取验证码',
				sms: '',
			};
		},
		onLoad: function() {
			this.init();
		},
		methods: {
			getCode() {
				const self = this;
				if(this.code == '') {
					this.$toast(self.i18n['请输入图形验证码']);
					return;
				}
				if (this.phone == '' || this.phone.length != 11) {
					this.$toast(self.i18n['请输入正确手机号']);
					return;
				}
				console.log(this.smsTxt,self.i18n['获取验证码'])
				if (this.smsTxt != self.i18n['获取验证码']) {
					return;
				}
				clearInterval(codeTimeOut);
				let postData = {
					phone: this.phone,
					sendType: this.sendType,
					cToken: this.codeImg.cToken,
					captcha: this.code,
				};
				let time = 60;
				codeTimeOut = setInterval(function() {
					time--;
					self.smsTxt = time + 's';
					if (time <= 0) {
						clearInterval(codeTimeOut);
						self.smsTxt = self.i18n['获取验证码'];
					}
				}, 1000);
				$.ajax({
					url: API.codeApi,
					data: postData,
					success(res) {},
					complete(res) {
						if(res.code != 200) {
							self.$toast(res.message);
							clearInterval(codeTimeOut);
							self.smsTxt = self.i18n['获取验证码'];
						}else{
						}
					}
				});
			},
			init() {
				self.smsTxt = self.i18n['获取验证码'];
			},
		},
		computed: {
			i18n() {
				return this.$t('validate')
			},
		},
		created() {
			self = this;
			this.init();
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
