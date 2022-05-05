<template>
	<view class="contain">
		<view class="padding-12">
			
			<view class="flex bg-color-w b-radius-5">
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
				<view class="flex f-s-0 f-a-c f-j-c padding-lr6 van-icon van-icon-arrow t-color-9"></view>
			</view>
			
			<view class="bg-color-w b-radius-5 padding-12 margin-t12">
				<view class="flex f-a-c margin-b10">
					<text class="flex f-a-c van-icon van-icon-shop-o t-color-y margin-r6"></text>
					<text class="f-w-500 t-color-3">万通上游国际</text>
				</view>
				<view class="flex margin-b10">
					<view class="flex f-s-0 w-70 h-70 b-radius-5 bg-img bg-color margin-r10"></view>
					<view class="flex flex-1 f-c margin-r8">
						<view class="line2 f12-size">Theory 新品女装 缎面V领吊带连衣裙 K026604R</view>
						<view class="flex f-a-c margin-t6">
							<view class="flex f-a-c f-j-c padding-lr6 bg-color-f7 f12-size t-color-9 b-radius-2 h-20">-燕麦色</view>
						</view>
					</view>
					<view class="flex f-s-0 f-c">
						<view class="text-price f12-size">2700</view>
						<view class="flex f-j-e margin-t6 t-color-9 f11-size">x3</view>
					</view>
				</view>
				
				<view class="flex f-a-c f-j-s h-36">
					<text class="f12-size t-color-9 margin-r10">{{i18n['快递运费']}}</text>
					<text class=" ">{{i18n['包邮']}}</text>
				</view>
				<view class="flex f-a-c f-j-s h-36">
					<text class="f12-size t-color-9 margin-r10">{{i18n['优惠折扣']}}</text>
					<view class="flex f-a-c">
						<view class="t-color-9 margin-r6">{{i18n['请选择']}}</view>
						<text class="flex f-a-c van-icon van-icon-arrow t-color-9 "></text>
					</view>
				</view>
				<view class="flex  f-j-s padding-tb10">
					<text class="flex f-s-0 f12-size t-color-9 margin-r10">{{i18n['订单备注']}}</text>
					<view class="flex flex-1">
						<textarea class="f12-size input h-30" value="" placeholder="订单备注可选" />
					</view>
				</view>
				<view class="flex f-a-c f-j-e">
					<text class="f12-size t-color-9">{{i18n['共1件'] | i18n(2)}}，</text>
					<text class="f12-size ">{{i18n['小计']}}：</text>
					<text class="f12-size text-price t-color-y">2700</text>
				</view>
			</view>
			
		</view>
		<view :style="isIphonex ? 'padding-top:84px;' : 'padding-top:50px;'"></view>
		<view class="flex f-a-c f-j-e h-50 fixed-top bg-color-w padding-lr12 box-c" :style="isIphonex ? 'padding-bottom:34px;' : ''">
			<text class=" t-color-9">{{i18n['共1件'] | i18n(2)}}，</text>
			<text class=" ">{{i18n['小计']}}：</text>
			<text class="text-price t-color-y margin-r12">2700</text>
			<view class="flex f-a-c f-j-c b b-radius-30 w-100 h-36 bg-color-linear-y t-color-w">{{i18n['提交订单']}}</view>
		</view>
	</view>
</template>
<style scoped>
@import url('../../static/css/iconcolor.css');
.fixed-top {
	top: auto;
	bottom: 0;
}
</style>
<script>
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
			};
		},
		onLoad: function() {
			self = this;
			this.init();
			$.setTitle(self.i18n['确认订单']);
		},
		methods: {
			init() {},
		},
		computed: {
			i18n() {
				return this.$t('order')
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
