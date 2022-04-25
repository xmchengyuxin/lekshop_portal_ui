<template>
	<view class="contain">
		<view class="fixed-top flex h-44 bg-color-f3" :style="{'padding-top': top + 'px'}">
			<view @click="back(1)" class="flex f-a-c f-j-c padding-lr12 van-icon van-icon-arrow-left f20-size"></view>
			<view class="flex flex-1 f-a-c margin-r4">
				<view class="flex flex-1 f-a-c h-32 bg-color-w b-radius-30 padding-lr10">
					<text class="flex f-a-c van-icon van-icon-search f16-size margin-r4"></text>
					<text class="t-color-9">{{i18n['搜索商品']}}</text>
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
						<text class="margin-r4">{{i18n['价格']}}</text>
						<text class="text-price del-line">155</text>
					</view>
				</view>
				<view class="flex f-a-c f-j-s margin-t6">
					<view class="flex f-a-c f-j-c h-16 b-radius-30 t-color-w bg-color-r f10-size padding-lr6">{{i18n['自营']}}</view>
					<view class="f10-size t-color-9">{{i18n['月销']}} 5</view>
				</view>
				<view class="f12-size f-w-b margin-t6">针织衫春秋季新款女装毛衣2020春温柔风黑色长袖短款上衣开衫外套</view>
			</view>
			<view class="bg-color-w b-radius-10 padding-12 margin-t12">
				<view @click="$refs.sku.open()" class="flex padding-tb8">
					<view class="flex f-s-0 f12-size t-color-9 margin-r10">{{i18n['选择']}}</view>
					<view class="flex f12-size flex-1 padding-lr10">颜色分类</view>
					<view class="flex f-a-c f-s-0 van-icon f12-size van-icon-arrow t-color-9"></view>
				</view>
				<view class="flex padding-tb8">
					<view class="flex f-s-0 f12-size t-color-9 margin-r10">{{i18n['发货']}}</view>
					<view class="flex f12-size flex-1 padding-lr10">
						<text class="margin-r12">山东济宁</text>
						<text class="margin-r12 t-color-9">|</text>
						<text class="margin-r12">快递：免运费</text>
					</view>
					<view class="flex f-a-c f-s-0 van-icon f12-size van-icon-arrow t-color-9"></view>
				</view>
				<view class="flex padding-tb8">
					<view class="flex f-s-0 f12-size t-color-9 margin-r10">{{i18n['参数']}}</view>
					<view class="flex f12-size flex-1 padding-lr10">颜色分类</view>
					<view class="flex f-a-c f-s-0 van-icon f12-size van-icon-arrow t-color-9"></view>
				</view>
			</view>
			
			<view class="bg-color-w b-radius-10 padding-12 margin-t12">
				<view class="flex f-a-c f-j-s">
					<view class="f-w-b">{{i18n['宝贝评价']}}(100+)</view>
					<view class="flex f-a-c">
						<text class="f10-size t-color-y margin-r4">{{i18n['查看全部']}}</text>
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
					<view class="flex f-c f-j-c flex-1">
						<text class="f15-size f-w-b">前海万联旗舰店</text>
						<text class="f12-size t-color-9 margin-t4">{{i18n['1人关注店铺'] | i18n(2)}}</text>
					</view>
					<view class="flex f-s-0 f-c wrap-shops-pj f-j-c">
						<view class="flex f-a-c f10-size t-color-9">{{i18n['宝贝描述']}} 4.7 低</view>
						<view class="flex f-a-c f10-size t-color-9 margin-t2">{{i18n['卖家服务']}} 4.7 低</view>
						<view class="flex f-a-c f10-size t-color-9 margin-t2">{{i18n['物流服务']}} 4.7 低</view>
					</view>
				</view>
				<view class="flex f-a-c f-j-c padding-10 b-bottom">
					<view class="flex f-a-c f-j-c h-24 b-color-y b-radius-30 t-color-y f12-size padding-lr10 margin-r12">{{i18n['进店逛逛']}}</view>
					<view class="flex f-a-c f-j-c h-24 bg-color-p t-color-w b-radius-30 f12-size padding-lr10">{{i18n['全部宝贝']}}</view>
				</view>
				<view class="padding-tb6"></view>
				<view class="flex f-a-c f-j-s">
					<text class="f12-size f-w-b">{{i18n['店铺推荐']}}</text>
					<view class="flex f-a-c">
						<text class="f10-size t-color-y">{{i18n['查看全部']}}</text>
						<text class="flex f-a-c van-icon van-icon-arrow t-color-y f12-size"></text>
					</view>
				</view>
				<view class="flex f-w ">
					<view v-for="item in 5" class="flex  f-s-0  f-c pintuan-item">
						<view class="h-100 bg-img bg-color b-radius-8"></view>
						<view class="f10-size line1 margin-t4">反季羽绒棉服2020新款棉衣韩版宽松面包服女冬装外套短款棉袄清仓</view>
						<view class="flex f-a-c f-j-s margin-t4">
							<view class="text-price f16-size t-color-y">189.00</view>
						</view>
					</view>
				</view>
				
			</view>
			
		</view>
		<view class="flex f-a-c f-j-c no-more t-color-9 f12-size margin-t2">{{i18n['宝贝详情']}}</view>
		<view class="padding-tb6"></view>
		<view  :style="{'padding-bottom': isIphonex ? '84px' : '50px'}"></view>
		<view class="fixed-top bottom-btn bg-color-w flex padding-lr12 h-50" :style="{'padding-bottom': isIphonex ? '34px' : ''}">
			<view class="flex flex-1 f-j-s margin-r20">
				<view class="flex f-c f-a-c f-j-c">
					<text class="flex f-a-c van-icon van-icon-shop-o f18-size t-color-y"></text>
					<text class="f10-size t-color-9 margin-t2">{{i18n['店铺']}}</text>
				</view>
				<view class="flex f-c f-a-c f-j-c">
					<text class="flex f-a-c van-icon van-icon-more-o f18-size "></text>
					<text class="f10-size t-color-9 margin-t2">{{i18n['客服']}}</text>
				</view>
				<view class="flex f-c f-a-c f-j-c">
					<text class="flex f-a-c van-icon van-icon-star-o f18-size "></text>
					<text class="f10-size t-color-9 margin-t2">{{i18n['收藏']}}</text>
				</view>
			</view>
			<view class="flex f-a-c">
				<view class="flex b-radius-30 h-34 over-h">
					<view class="flex f-a-c f-j-c bg-color-linear-y t-color-w f12-size w-100">{{i18n['加入购物车']}}</view>
					<view class="flex f-a-c f-j-c bg-color-p t-color-w f12-size w-100">{{i18n['立即购买']}}</view>
				</view>
			</view>
		</view>
		
		<uni-popup ref="sku" type="bottom" backgroundColor="#fff">
			<view class="padding-10">
				<view class="flex">
					<view class="flex f-s-0 w-60 h-60 b-radius-2 bg-color margin-r12"></view>
					<view class="flex flex-1 f-c">
						<view class="t-color-y f18-size f-w-b text-price">29.9</view>
						<view class="flex f11-size t-color-9">{{i18n['库存']}} 99</view>
					</view>
					<view class="flex f-a-s">
						<text class="flex f-a-c van-icon van-icon-close t-color-3"></text>
					</view>
				</view>
				<view class="padding-tb6 b-bottom"></view>
				<scroll-view scroll-y="true" style="height: 60vh;">
					<view class="padding-tb10 b-bottom">
						<view>尺码</view>
						<view class="flex f-w">
							<view v-for="(item,index) in 6" class="flex f-a-c f-j-c f-s-0 b-radius-2 bg-color-f7 margin-r12 margin-t12 h-30 f12-size padding-lr10">155/80A/S</view>
						</view>
					</view> 
					<view class="padding-tb10 flex f-j-s">
						<view class="flex f-a-c">{{i18n['购买数量']}}</view>
						<view class="flex">
							<view class="flex f-a-c f-j-c add-reduce dis"></view>
							<view class="flex f-a-c f-j-c add-num">1</view>
							<view class="flex f-a-c f-j-c add-btn"></view>
						</view>
					</view> 
				</scroll-view>
				<view class="flex b-radius-30 h-34 over-h margin-t12">
					<view class="flex f-a-c flex-1 f-j-c bg-color-linear-y t-color-w f12-size w-100">{{i18n['加入购物车']}}</view>
					<view class="flex f-a-c flex-1 f-j-c bg-color-p t-color-w f12-size w-100">{{i18n['立即购买']}}</view>
				</view>
				<view  :style="{'padding-bottom': isIphonex ? '24px' : ''}"></view>
			</view>
		</uni-popup>
		
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
		computed: {
			i18n() {
				return this.$t('goodsdetail')
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
