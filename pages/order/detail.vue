<template>
	<view class="contain">
		<view class="padding-12">
			<view class="flex bg-color-w b-radius-5 margin-b12">
				<view class="flex flex-1">
					<view class="flex f-a-c f-j-c f-s-0 shops-icon shops-icon-address f44-size padding-10"></view>
					<view class="flex f-c flex-1 f-j-c">
						<view class="flex f-a-c">
							<text class="flex f-a-c f-w-b f15-size margin-r12">saa</text>
							<text class="flex f-a-c f12-size t-color-9">19829382912</text>
						</view>
						<view class="line1 margin-t4 f12-size">天津市 天津市 和平区 万通上游国际尚都家园11号1门2103室</view>
					</view>
				</view>
				<view class="padding-lr5"></view>
			</view>
			
			<view class="bg-color-w b-radius-5 padding-12 margin-b12">
				<view class="flex f-j-s margin-b16">
					<view class="flex f-a-c ">
						<text class="flex f-a-c van-icon van-icon-shop-o  margin-r6"></text>
						<text class="f-w-500 t-color-3 margin-r4 ">万通上游国际</text>
						<text class="flex f-a-c van-icon van-icon-arrow t-color-9 "></text>
					</view>
				</view>
				
				<view class="flex margin-b10">
					<view class="flex f-s-0 w-70 h-70 b-radius-5 bg-img bg-color margin-r10"></view>
					<view class="flex flex-1 f-c margin-r8">
						<view class="line2 f12-size">Theory 新品女装 缎面V领吊带连衣裙 K026604R</view>
						<view class="flex f-a-c margin-t6">
							<view class="flex f-a-c f-j-c padding-lr6 bg-color-f7 f11-size t-color-9 b-radius-2 h-20">-燕麦色</view>
						</view>
					</view>
					<view class="flex f-s-0 f-c">
						<view class="text-price f12-size">2700</view>
						<view class="flex f-j-e margin-t6 t-color-9 f11-size">x3</view>
					</view>
				</view>
				<view class="flex f-j-s padding-tb6 f11-size">
					<text>{{i18n['商品总价']}}</text>
					<text class="text-price">24.00</text>
				</view>
				<view class="flex f-j-s padding-tb6 f11-size">
					<text>{{i18n['运费']}}</text>
					<text class="text-price">24.00</text>
				</view>
				<view class="flex f-j-s padding-tb6 f11-size">
					<text>{{i18n['优惠']}}</text>
					<text class="text-price">24.00</text>
				</view>
				<view class="flex f-j-e f12-size t-color-y f-w-500 margin-t6">
					<text>{{i18n['实付款']}}：</text>
					<text class="text-price">23</text>
				</view>
			</view>
			
			<view class="bg-color-w b-radius-5 padding-12 margin-b12">
				<view class="flex f-j-s margin-b10">
					<view class="flex f-a-c ">
						<text class="f-w-500 t-color-3 margin-r4 ">{{i18n['订单详情']}}</text>
					</view>
				</view>
				<view class="flex f-a-c padding-tb6 f12-size">
					<text class="t-color-9 w-80">{{i18n['订单编号']}}：</text>
					<text class="">5180132774114797</text>
				</view>
				<view class="flex f-a-c padding-tb6 f12-size">
					<text class="t-color-9 w-80">{{i18n['支付交易号']}}：</text>
					<text class="">5180132774114797</text>
				</view>
				<view class="flex f-a-c padding-tb6 f12-size ">
					<text class="t-color-9 w-80">{{i18n['创建时间']}}：</text>
					<text class="">5180132774114797</text>
				</view>
				<view class="b-bottom margin-t10"></view>
				<view class="flex f-a-c f-j-c" style="padding-top: 10px;">
					<text class="flex f-a-c f-j-c van-icon van-icon-chat-o t-color-y margin-r4"></text>
					<text class="f12-size f-w-500">{{i18n['联系卖家']}}</text>
				</view>
			</view>	
			
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
		data() {
			return {};
		},
		onLoad: function() {
			self = this;
			this.init();
			$.setTitle(self.i18n['订单详情']);
		},
		methods: {
			init() {},
		},
		created() {
		},
		computed: {
			i18n() {
				return this.$t('orderlist')
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
