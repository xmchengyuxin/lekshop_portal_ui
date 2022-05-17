<template>
	<view class="contain">
		<view class="padding-tb25">
			<view class="padding-10">
				<view class="flex f-j-c f-a-c ">
					<text class="t-color-9">{{i18n['订单号']}}：{{orderNo}}</text>
				</view>
				<view class="flex f-j-c f-a-c f44-size text-price margin-t12">{{amount}}</view>
			</view>
		</view>
		<view class="padding-lr20">
		<pay-item ref="payitem"></pay-item>
		<view class="padding-lr10">
			<view class="padding-15"></view>
			<view @click="pay" class="flex f-a-c f-j-c b-radius-5 bg-color-linear-y t-color-w h-40">{{i18n['确认支付']}}</view>
		</view>
		</view>
	</view>
</template>
<style scoped>
@import url('../../static/css/page/white.css');
@import url('../../static/css/iconcolor.css');
</style>
<script>
	import payItem from '../common/payitem';
	const API = require('../../utils/api/order.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				orderNo: '',
				amount: 0
			};
		},
		onLoad: function(options) {
			self = this;
			self.orderNo = options.orderNo ? options.orderNo: '';
			self.amount = options.amount ? options.amount: '';
			this.init();
			$.setTitle(self.i18n['收银台']);
		},
		methods: {
			pay() {
				$.ajax({
					url: API.payOrderApi,
					data: {
						payOrderNo: self.orderNo,
						payMethod: self.$refs.payitem.type
					},
					method: 'POST',
					success(res) {
						self.go('/pages/order/suc',2);
					}
				})
			},
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
		components: {payItem},
		onPullDownRefresh() {
		},
		onReachBottom() {
		}
	}
</script>
