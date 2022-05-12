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
			sendType: {
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
			}
		},	
		data() {
			return {
				smsTxt: '获取验证码',
				sms: '',
			};
		},
		onLoad: function() {
			self = this;
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
					sendType: this.sendType
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
					url: API.codeApi,
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
