<template>
	<view class="contain">
		<view class="padding-tb25">
			<view class="padding-10">
				<view class="flex f-j-c f-a-c ">
					<text class="t-color-9">{{i18n['订单号']}}：5173271901114797</text>
				</view>
				<view class="flex f-j-c f-a-c f44-size text-price margin-t12">2700</view>
			</view>
		</view>
		<view class="padding-lr20">
		<view class="padding-lr10">
			<view class="flex padding-tb10">
				<view class="flex f-a-c f-s-0 w-50 shops-icon shops-icon-qianbao f32-size"></view>
				<view class="flex flex-1 f-c f-j-c">
					<text class="f-w-500 f16-size">{{i18n['余额支付']}}</text>
					<view class="flex f-a-c margin-t4 t-color-9">
						<text class="f11-size margin-r4">{{i18n['可用余额']}}</text>
						<text class="f11-size text-price">9102</text>
					</view>
				</view>
				<view class="flex f-s-0 f-a-c f-j-c van-icon van-icon-circle f24-size t-color-9"></view>
			</view>
			<view class="flex padding-tb10">
				<view class="flex f-a-c f-s-0 w-50 shops-icon shops-icon-zfbpay f32-size"></view>
				<view class="flex flex-1 f-c f-j-c">
					<text class="f-w-500 f16-size">{{i18n['支付宝']}}</text>
				</view>
				<view class="flex f-s-0 f-a-c f-j-c van-icon van-icon-circle f24-size t-color-9"></view>
			</view>
			<view class="flex padding-tb10">
				<view class="flex f-a-c f-s-0 w-50 shops-icon shops-icon-wxpay f32-size"></view>
				<view class="flex flex-1 f-c f-j-c">
					<text class="f-w-500 f16-size">{{i18n['微信支付']}}</text>
				</view>
				<view class="flex f-s-0 f-a-c f-j-c van-icon van-icon-circle f24-size t-color-9"></view>
			</view>
			<view class="padding-15"></view>
			<view class="flex f-a-c f-j-c b-radius-5 bg-color-linear-y t-color-w h-40">{{i18n['确认支付']}}</view>
		</view>
		</view>
	</view>
</template>
<style scoped>
@import url('../../static/css/page/white.css');
@import url('../../static/css/iconcolor.css');
</style>
<script>
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {};
		},
		onLoad: function() {
			self = this;
			this.init();
			$.setTitle(self.i18n['收银台']);
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
