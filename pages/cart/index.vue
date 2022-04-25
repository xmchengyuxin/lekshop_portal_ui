<template>
	<view class="contain">
		<view class="flex fixed-top h-44 bg-color-f7"  :style="{'padding-top': top + 'px'}">
			<view class="flex f-s-0 padding-lr10 f-a-c f-j-c van-icon van-icon-arrow-left f20-size"></view>
			<view class="flex flex-1 f-a-c f-j-c f16-size">{{i18n['购物车']}}</view>
			<view @click="showDel=!showDel" class="flex f-s-0 f-a-c padding-lr10" :class="showDel ? 't-color-y' : ''">{{showDel ? i18n['完成'] : i18n['管理']}}</view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="flex f-s-0" style="width: 180upx;"></view>
			<!-- #endif -->
		</view>
		<view :style="{'padding-top': top+44+'px'}"></view>
		<view class="padding-10">
			<view class="bg-color-w b-radius-5 padding-tb6">
				<view class="flex f-j-s h-40">
					<view class="flex flex-1">
						<view class="padding-lr10 flex f-a-c f-j-c van-icon van-icon-circle f20-size t-color-9"></view>
						<view class=" flex f-a-c">
							<text class="flex f-a-c f-j-c van-icon van-icon-shop-collect-o f18-size margin-r4"></text>
							<text class="t-color-0">前海万联旗舰店</text>
						</view>
					</view>
					<view class="flex f-a-c padding-lr10 van-icon van-icon-arrow t-color-9"></view>
				</view>
				<view v-for="(item,index) in 2" class="flex padding-tb6">
					<view class="padding-lr10 flex f-s-0 f-a-c f-j-c van-icon van-icon-circle f20-size t-color-9"></view>
					<view class="w-90 h-90 b-radius-5 bg-color flex f-s-0"></view>
					<view class="padding-lr10 flex flex-1 f-c">
						<view class="flex flex-1 f-c">
							<view class="line2 t-color-6">郭郭定制秋季风衣女2020年新款气质中长款过膝大衣韩版小个子外套</view>
							<view class="flex margin-t4">
								<view class="flex f-a-c f-j-c b-radius-2 bg-color-f7 t-color-9 f10-size h-18 padding-lr6">规格：S 紫色</view>
							</view>
						</view>
						<view class="flex f-a-c f-j-s">
							<view class="text-price t-color-y f16-size">123</view>
							<view class="flex">
								<view class="flex f-a-c f-j-c add-reduce dis"></view>
								<view class="flex f-a-c f-j-c add-num">1</view>
								<view class="flex f-a-c f-j-c add-btn"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fixed-top wrap-btn  h-50 bg-color-f7 flex f-j-s">
			<view class="flex padding-lr10 f-a-c">
				<text class="flex f-a-c van-icon van-icon-circle t-color-9 f18-size margin-r4"></text>
				<text class="f11-size">{{i18n['全选']}}</text>
			</view>
			<view v-if="!showDel" class="flex f-a-c padding-lr10">
				<text class="f11-size margin-r4">{{i18n['合计']}}:</text>
				<text class="f18-size text-price t-color-y f-w-b margin-r12">0</text>
				<view class="flex f-a-c f-j-c b-radius-30 h-32 t-color-w bg-color-linear-y w-80">{{i18n['结算']}}</view>
			</view>
			<view v-if="showDel" class="flex f-a-c padding-lr10">
				<view class="flex f-a-c f-j-c b-radius-30 h-28 f10-size t-color-y b-color-y padding-lr12 margin-r12">{{i18n['移入收藏夹']}}</view>
				<view class="flex f-a-c f-j-c b-radius-30 h-28 f10-size t-color-w bg-color-linear-y w-80">{{i18n['删除']}}</view>
			</view>
		</view>
		<view class="padding-30"></view>
		<tab-bar :active="3"></tab-bar>
	</view>
</template>
<style scoped>
@import url('../../static/css/cart/index.css');
</style>
<script>
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				showDel: false,
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
				return this.$t('cart')
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
