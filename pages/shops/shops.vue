<template>
	<view class="contain">
		<view  class="fixed-top h-44 flex bg-color-w box-c"  :style="{ 'padding-top': top + 'px' }">
			<view @click="back(1)" class="flex f-a-c f-s-0 padding-lr10 van-icon van-icon-arrow-left f20-size"></view>
			<view class="flex flex-1">
				<view :class="active == 0 ? 'f-w-b f18-size' : 'f16-size'" class="flex f-a-c f-j-c w-50">推荐</view>
				<view :class="active == 1 ? 'f-w-b f18-size' : 'f16-size'" class="flex f-a-c f-j-c w-50">新品</view>
				<view :class="active == 2 ? 'f-w-b f18-size' : 'f16-size'" class="flex f-a-c f-j-c w-50">拼团</view>
			</view>
			<view class="flex f-s-0">
				<text class="flex f-s-0 f-a-c padding-lr6 van-icon van-icon-search f20-size"></text>
				<text class="flex f-s-0 f-a-c padding-lr10 van-icon van-icon-weapp-nav f20-size"></text>
			</view>
			<xcx-header></xcx-header>
		</view>
		
		<swiper class="wrap-swiper" :current="active" @change="changeSwiper" :indicator-dots="false" :autoplay="false" :interval="1000" :duration="500">
			<swiper-item >
				<scroll-view  scroll-y="true" style="height: 100%;">
					<view :style="{ 'padding-top': top +44+ 'px' }"></view>
					<view class="padding-lr10">
						<view class="bg-color-f7 flex padding-10 b-radius-5">
							<view class="flex flex-1 f-c f-j-c margin-r10">
								<view class="flex f-a-c">
									<text class="f10-size bg-color-r t-color-w b-radius-2 h-16 padding-lr5 margin-r6">自营</text>
									<text class="f-w-b">前海万联旗舰店</text>
								</view>
								<view class="margin-t4 t-color-6 f11-size flex f-a-c">
									<text class="margin-r6">店铺粉丝</text>
									<text>1111</text>
								</view>
							</view>
							<view class="flex f-a-c f-j-c f-s-0">
								<image class="w-30" src="../../static/images/like-on.png" mode="widthFix"></image>
								<!-- <image class="w-36" src="../../static/images/like.png" mode="widthFix"></image> -->
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="bg-color-f7" style="position: relative;">
				<view class="wrap-list-nav bg-color-w"  :style="{ 'top': top +44+ 'px' }">
					<view class="flex h-40 bg-color-f7 wrap-list-nav-info">
						<view class="flex f-a-c f-j-c flex-1 t-color-p">{{i18n['综合']}}</view>
						<view class="flex f-a-c f-j-c flex-1">{{i18n['销量']}}</view>
						<view class="flex f-a-c f-j-c flex-1">{{i18n['新上架']}}</view>
						<view class="flex f-a-c f-j-c flex-1">
							<text class="margin-r4">{{i18n['价格']}}</text>
							<view class="flex f-c f-a-c f-j-c">
								<text class="flex f-a-c f-j-c price-up"></text>
								<text class="flex f-a-c f-j-c price-down margin-t2"></text>
							</view>
						</view>
						<view @click="sortType == 1 ? sortType=2 : sortType=1" class="flex f-a-c padding-lr10 van-icon van-icon-apps-o f20-size"></view>
					</view>
				</view>
				<scroll-view class="padding-lr6" scroll-y="true" style="height: 100%;">
					<view :style="{ 'padding-top': top +44+40+ 'px' }"></view>
					<goodslist class="margin-t12" :offset="6" :sortType="sortType" :list="list"></goodslist>
				</scroll-view>
				
			</swiper-item>
		</swiper>			
		
	</view>
</template>
<style scoped>
@import url('../../static/css/page/white.css');
@import url('../../static/css/shops/shops.css');
</style>
<script>
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				active: 1,
				sortType: 1,
				list: [{
						id: 6,
						image_url: "https://stc.wanlshop.com/1a42d31bbb0f1d8d9aa66f804b47c7a3.jpg?x-oss-process=image/auto-orient,1/interlace,1/format,jpg/quality,q_90/sharpen,50/resize,m_mfit,w_516",
						title: "恐龙",
						text: "恐龙来啦",
					},
					{
						id: 1,
						image_url: "https://stc.wanlshop.com/9b777f933945c6d515ce8313ee3c38cd.jpg?x-oss-process=image/auto-orient,1/interlace,1/format,jpg/quality,q_90/sharpen,50/resize,m_mfit,w_516",
						title: "可爱的小猫咪呀",
						text: "小小的猫咪，甚是呆萌，呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌",
					},
				],
			};
		},
		onLoad: function() {
			self = this;
			this.init();
		},
		methods: {
			changeSwiper(e) {
				self.active = e.detail.current;
			},
			init() {},
		},
		created() {
		},
		computed: {
			i18n() {
				return this.$t('search')
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
