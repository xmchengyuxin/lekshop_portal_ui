<template>
	<view class="padding-lr12" :class="bgColor">
		<view  @click="type = 'balance'" v-if="isBalance" class="flex padding-tb10">
			<view class="flex f-a-c f-s-0 w-50 shops-icon shops-icon-qianbao f32-size"></view>
			<view class="flex flex-1 f-c f-j-c">
				<text class="f-w-500 f16-size">{{i18n['余额支付']}}</text>
				<view class="flex f-a-c margin-t4 t-color-9">
					<text class="f11-size margin-r4">{{i18n['可用余额']}}</text>
					<text class="f11-size text-price">9102</text>
				</view>
			</view>
			<view v-if="type != 'balance'"  class="flex f-s-0 f-a-c f-j-c van-icon van-icon-circle f24-size t-color-9"></view>
			<view v-if="type == 'balance'"  class="flex f-s-0 f-a-c f-j-c van-icon van-icon-checked f24-size t-color-y"></view>
		</view>
		<view  @click="type = 'zfbPay'" class="flex padding-tb10">
			<view class="flex f-a-c f-s-0 w-50 shops-icon shops-icon-zfbpay f32-size"></view>
			<view class="flex flex-1 f-c f-j-c">
				<text class="f-w-500 f16-size">{{i18n['支付宝']}}</text>
			</view>
			<view v-if="type != 'zfbPay'"  class="flex f-s-0 f-a-c f-j-c van-icon van-icon-circle f24-size t-color-9"></view>
			<view v-if="type == 'zfbPay'"  class="flex f-s-0 f-a-c f-j-c van-icon van-icon-checked f24-size t-color-y"></view>
		</view>
		<view @click="type = 'wxPay'" class="flex padding-tb10">
			<view class="flex f-a-c f-s-0 w-50 shops-icon shops-icon-wxpay f32-size"></view>
			<view class="flex flex-1 f-c f-j-c">
				<text class="f-w-500 f16-size">{{i18n['微信支付']}}</text>
			</view>
			<view v-if="type != 'wxPay'"  class="flex f-s-0 f-a-c f-j-c van-icon van-icon-circle f24-size t-color-9"></view>
			<view v-if="type == 'wxPay'"  class="flex f-s-0 f-a-c f-j-c van-icon van-icon-checked f24-size t-color-y"></view>
		</view>
	</view>
</template>
<style scoped>
@import url('../../static/css/iconcolor.css');
</style>
<script>
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
			}
			
		},
		data() {
			return {
				type: 'wxPay'
			};
		},
		onLoad: function() {
			self = this;
			this.init();
		},
		methods: {
			init() {},
		},
		created() {
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
