<template>
	<view class="contain">
		<view class="fixed-top flex h-44 bg-color-f3" :style="{'padding-top': top + 'px'}">
			<view @click="back(1)" class="flex f-a-c f-j-c padding-lr12 van-icon van-icon-arrow-left f20-size"></view>
			<view class="flex flex-1 f-a-c margin-r4">
				<view class="flex flex-1 f-a-c h-32 bg-color-w b-radius-30 padding-lr10">
					<text class="flex f-a-c van-icon van-icon-search f16-size margin-r4"></text>
					<text class="t-color-9">搜索商品、类目</text>
				</view>
			</view>
			<view class="flex f-a-c f-j-c padding-lr5 van-icon van-icon-share-o f20-size"></view>
			<view class="flex f-a-c f-j-c padding-lr5 van-icon van-icon-bars f20-size"></view>
			<view class="flex f-a-c f-j-c padding-lr5 van-icon van-icon-shopping-cart-o f20-size "></view>
			<view class="padding-lr2"></view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="flex f-s-0" style="width: 180upx;"></view>
			<!-- #endif -->
		</view>
		<view :style="{'padding-top': top+44+'px'}"></view>
		<view class="wrap-banner" >
			<swiper class="wrap-banner" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item >
					<view class="bg-color h100 "></view>
				</swiper-item>
				<swiper-item>
					<view class="bg-color-linear-y h100 "></view>
				</swiper-item>
			</swiper>
			<view class="flex f-a-c f-j-c wrap-dot  b-radius-30 t-color-w f10-size">5/6</view>
		</view>
		
		<view class="padding-12">
			<view class="bg-color-w b-radius-10 padding-12">
				<view class="flex ">
					<view class="text-price f18-size f-w-b t-color-p margin-r8">18</view>
					<view class="flex f-a-c f10-size t-color-9">
						<text class="margin-r4">价格</text>
						<text class="text-price del-line">155</text>
					</view>
				</view>
				<view class="flex f-a-c f-j-s margin-t6">
					<view class="flex f-a-c f-j-c h-16 b-radius-30 t-color-w bg-color-r f10-size padding-lr6">自营</view>
					<view class="f10-size t-color-9">月销 5</view>
				</view>
				<view class="f12-size f-w-b margin-t6">针织衫春秋季新款女装毛衣2020春温柔风黑色长袖短款上衣开衫外套</view>
			</view>
			<view class="bg-color-w b-radius-10 padding-12 margin-t12">
				<view class="flex padding-tb8">
					<view class="flex f-s-0 f12-size t-color-9 margin-r10">选择</view>
					<view class="flex f12-size flex-1 padding-lr10">颜色分类</view>
					<view class="flex f-a-c f-s-0 van-icon f12-size van-icon-arrow t-color-9"></view>
				</view>
				<view class="flex padding-tb8">
					<view class="flex f-s-0 f12-size t-color-9 margin-r10">发货</view>
					<view class="flex f12-size flex-1 padding-lr10">
						<text class="margin-r12">山东济宁</text>
						<text class="margin-r12 t-color-9">|</text>
						<text class="margin-r12">快递：免运费</text>
					</view>
					<view class="flex f-a-c f-s-0 van-icon f12-size van-icon-arrow t-color-9"></view>
				</view>
				<view class="flex padding-tb8">
					<view class="flex f-s-0 f12-size t-color-9 margin-r10">参数</view>
					<view class="flex f12-size flex-1 padding-lr10">颜色分类</view>
					<view class="flex f-a-c f-s-0 van-icon f12-size van-icon-arrow t-color-9"></view>
				</view>
			</view>
			
			<view class="bg-color-w b-radius-10 padding-12 margin-t12">
				<view class="flex f-a-c f-j-s">
					<view class="f-w-b">宝贝评价(100+)</view>
					<view class="flex f-a-c">
						<text class="f10-size t-color-y margin-r4">查看全部</text>
						<text class="flex f-a-c van-icon van-icon-arrow f10-size t-color-y"></text>
					</view>
				</view>
				<view class="flex margin-t12">
					<view class="flex w-30 h-30 b-radius bg-color margin-r12"></view>
					<view class="flex f-c f-j-s">
						<text class="f10-size">dsasdasa</text>
						<text class="f10-size t-color-9">22天前</text>
					</view>
				</view>
				<view class="f12-size margin-t10">查看全部查看全部查看全部查看全部查看全部查看全部</view>
			</view>
			
			<view class="bg-color-w b-radius-10 padding-12 margin-t12">
				<view class="flex">
					<view class="flex w-50 h-50 b-radius bg-color margin-r12"></view>
					<view class="flex f-c f-j-c">
						<text class="f15-size f-w-b">前海万联旗舰店</text>
						<text class="f12-size t-color-9 margin-t4">249 人关注店铺</text>
					</view>
				</view>
			</view>
			
		</view>
		<view class="flex f-a-c f-j-c no-more t-color-9 f12-size margin-t2">宝贝详情</view>
		<view class="padding-tb6"></view>
		<view  :style="{'padding-bottom': isIphonex ? '84px' : '50px'}"></view>
		<view class="fixed-top bottom-btn bg-color-w flex padding-lr12 h-50" :style="{'padding-bottom': isIphonex ? '34px' : ''}">
			<view class="flex flex-1 f-j-s margin-r20">
				<view class="flex f-c f-a-c f-j-c">
					<text class="flex f-a-c van-icon van-icon-shop-o f18-size t-color-y"></text>
					<text class="f10-size t-color-9 margin-t2">店铺</text>
				</view>
				<view class="flex f-c f-a-c f-j-c">
					<text class="flex f-a-c van-icon van-icon-more-o f18-size "></text>
					<text class="f10-size t-color-9 margin-t2">客服</text>
				</view>
				<view class="flex f-c f-a-c f-j-c">
					<text class="flex f-a-c van-icon van-icon-star-o f18-size "></text>
					<text class="f10-size t-color-9 margin-t2">收藏</text>
				</view>
			</view>
			<view class="flex f-a-c">
				<view class="flex b-radius-30 h-34 over-h">
					<view class="flex f-a-c f-j-c bg-color-linear-y t-color-w f12-size w-100">加入购物车</view>
					<view class="flex f-a-c f-j-c bg-color-p t-color-w f12-size w-100">立即购买</view>
				</view>
			</view>
		</view>
		
	</view>
</template>
<style scoped>
@import url('../../static/css/shops/detail.css');
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
		},
		methods: {
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
