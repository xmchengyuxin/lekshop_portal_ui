<template>
	<view class="padding-lr12" :class="bgColor">
		<block v-if="pageType == 1">
			<view  @click="type = 'balance'" v-if="isBalance" class="flex padding-tb10">
				<view class="flex f-a-c f-s-0 w-50 shops-icon shops-icon-qianbao f32-size"></view>
				<view class="flex flex-1 f-c f-j-c">
					<text class="f-w-500 f16-size">{{i18n['余额支付']}}</text>
					<view class="flex f-a-c margin-t4 t-color-9">
						<text class="f11-size margin-r4">{{i18n['可用余额']}}</text>
						<text class="f11-size text-price">{{account != '' ? account.amount : 0}}</text>
					</view>
				</view>
				<view v-if="type != 'balance'"  class="flex f-s-0 f-a-c f-j-c van-icon van-icon-circle f24-size t-color-9"></view>
				<view v-if="type == 'balance'"  class="flex f-s-0 f-a-c f-j-c van-icon van-icon-checked f24-size t-color-y"></view>
			</view>
			<!-- #ifndef MP-WEIXIN -->
			<view  @click="type = 'zfbPay'" class="flex padding-tb10">
				<view class="flex f-a-c f-s-0 w-50 shops-icon shops-icon-zfbpay f32-size"></view>
				<view class="flex flex-1 f-c f-j-c">
					<text class="f-w-500 f16-size">{{i18n['支付宝']}}</text>
				</view>
				<view v-if="type != 'zfbPay'"  class="flex f-s-0 f-a-c f-j-c van-icon van-icon-circle f24-size t-color-9"></view>
				<view v-if="type == 'zfbPay'"  class="flex f-s-0 f-a-c f-j-c van-icon van-icon-checked f24-size t-color-y"></view>
			</view>
			<!-- #endif -->
			<view @click="type = 'wxPay'" class="flex padding-tb10">
				<view class="flex f-a-c f-s-0 w-50 shops-icon shops-icon-wxpay f32-size"></view>
				<view class="flex flex-1 f-c f-j-c">
					<text class="f-w-500 f16-size">{{i18n['微信支付']}}</text>
				</view>
				<view v-if="type != 'wxPay'"  class="flex f-s-0 f-a-c f-j-c van-icon van-icon-circle f24-size t-color-9"></view>
				<view v-if="type == 'wxPay'"  class="flex f-s-0 f-a-c f-j-c van-icon van-icon-checked f24-size t-color-y"></view>
			</view>
		</block>
		<block v-if="pageType != 1">
			<uni-popup ref="wrappay" type="bottom">
				<div class="wrap-popup-radius bg-color-w">
					<view @click="pay('balance')" v-if="isBalance" class="flex f-a-c f-j-c h-44 f12-size">{{i18n['余额支付']}}</view>
					<!-- #ifndef MP-WEIXIN -->
					<view @click="pay('zfbPay')" class="flex f-a-c f-j-c h-44 f12-size">{{i18n['支付宝']}}</view>
					<!-- #endif -->
					<view @click="pay('wxPay')" class="flex f-a-c f-j-c h-44 f12-size">{{i18n['微信支付']}}</view>
					<view class="padding-10"></view>
				</div>
			</uni-popup>	
		</block>
	</view>
</template>
<style scoped>
@import url('../../static/css/iconcolor.css');
</style>
<script>
	const API = require('../../utils/api/user.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		props: {
			bgColor: {
				default: 'bg-color-w'
			},
			isBalance: {
				default: true,
				type: Boolean
			},
			pageType: {
				default: 1
			}
		},
		data() {
			return {
				type: 'wxPay',
				account: '',
			};
		},
		onLoad: function() {
			self = this;
			this.init();
		},
		methods: {
			pay(type) {
				this.$emit('pay',type);
				this.$refs.wrappay.close();
			},
			open() {
				this.$refs.wrappay.open();
			},
			getAccount() {
				self = this;
				$.ajax({
					url: API.getAccountApi,
					data: {},
					method: 'GET',
					success(res) {
						self.account = res.data ? res.data : '';
					}
				})
			},
			init() {},
		},
		created() {
			this.getAccount();
		},
		computed: {
			i18n() {
				return this.$t('pay')
			},
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
