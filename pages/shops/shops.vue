<template>
	<view class="contain">
		<view  class="fixed-top h-46 flex bg-color-w box-c"  :style="{ 'padding-top': top + 'px' }">
			<view @click="back(1)" class="flex f-a-c f-s-0 padding-lr10 van-icon van-icon-arrow-left f20-size"></view>
			<view class="flex flex-1">
				<block v-if="tabStatus == 0">
					<view :class="active == 0 ? 'f-w-b f18-size' : 'f16-size'" class="flex f-a-c f-j-c w-50">推荐</view>
					<view :class="active == 1 ? 'f-w-b f18-size' : 'f16-size'" class="flex f-a-c f-j-c w-50">新品</view>
					<view :class="active == 2 ? 'f-w-b f18-size' : 'f16-size'" class="flex f-a-c f-j-c w-50">拼团</view>
				</block>
				<view class="flex flex-1 f-a-c" v-else>
					<view class="flex flex-1 h-36 b-radius-30 bg-color-f7 padding-lr10">
						<text class="flex f-s-0 f-a-c  van-icon van-icon-search f18-size t-color-9 margin-r10"></text>
						<text class="flex f-a-c f15-size t-color-9">搜索店铺内宝贝</text>
					</view>
				</view>
			</view>
			<view class="flex f-s-0">
				<text v-if="tabStatus == 0" class="flex f-s-0 f-a-c padding-lr6 van-icon van-icon-search f20-size"></text>
				<text class="flex f-s-0 f-a-c padding-lr10 van-icon van-icon-weapp-nav f20-size"></text>
			</view>
			<xcx-header></xcx-header>
		</view>
		
		<swiper  v-if="tabStatus == 0" class="wrap-swiper" :current="active" @change="changeSwiper" :indicator-dots="false" :autoplay="false" :interval="1000" :duration="500">
			<swiper-item >
				<scroll-view  scroll-y="true" style="height: 100%;">
					<view :style="{ 'padding-top': top +46+ 'px' }"></view>
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
					<swiper class="wrap-banner h-120 margin-t12" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
						<swiper-item >
							<view class="bg-color h100 "></view>
						</swiper-item>
						<swiper-item>
							<view class="bg-color-linear-y h100 "></view>
						</swiper-item>
					</swiper>
					<!-- 广告图 -->
					<view class="padding-12">
						<image class="w100" src="https://stc.wanlshop.com/uploads/a5cbe1ac839ba51dafbac8fa004ee73b.png" mode="widthFix"></image>
					</view>
					<!-- 广告图 end-->
					<!-- 拼团 -->
					<view class="b-radius-10 bg-color-w wrap-pintuan margin-t12">
						<view class="flex padding-lr12 h-40 f-a-c f-j-s">
							<view class="flex f-a-c">
								<text class="f-w-b margin-r8">热门拼团</text>
								<text class="f10-size" >拼着买，更便宜~</text>
							</view>
							<view class="flex f-a-c">
								<text class="f12-size t-color-9 margin-r2">更多</text>
								<text class="flex f-a-c van-icon van-icon-arrow t-color-9"></text>
							</view>
						</view>
						<view class="flex padding-lr12 ">
							<view v-for="item in 3" class="flex  f-s-0 margin-r12 f-c pintuan-item">
								<view class="h-100 bg-img bg-color b-radius-8"></view>
								<view class="f12-size line1 margin-t4">反季羽绒棉服2020新款棉衣韩版宽松面包服女冬装外套短款棉袄清仓</view>
								<view class="flex f-a-c f-j-s margin-t4">
									<view class="text-price f16-size t-color-y">189.00</view>
									<view class="bg-color-linear-y h-16 t-color-w f10-size padding-lr5 b-radius-30">拼</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 拼团 end-->
					<view class="padding-12 bg-color-f7 ">
						<goodslist class="" :offset="6" :sortType="sortType" :list="list"></goodslist>
					</view>
					<view :style="isIphonex ? 'padding-bottom:84px' : 'padding-bottom:50px'"></view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="bg-color-f7" style="position: relative;">
				<view class="wrap-list-nav bg-color-w"  :style="{ 'top': top +46+ 'px' }">
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
					<view :style="{ 'padding-top': top +46+40+ 'px' }"></view>
					<goodslist class="margin-t12" :offset="6" :sortType="sortType" :list="list"></goodslist>
					<view :style="isIphonex ? 'padding-bottom:84px' : 'padding-bottom:50px'"></view>
				</scroll-view>
				
			</swiper-item>
		</swiper>	
		<!-- 全部宝贝 -->
		<view  v-if="tabStatus == 1"  class="bg-color-f7" style="position: relative;height: 100vh;">
			<view class="wrap-list-nav bg-color-w"  :style="{ 'top': top +46+ 'px' }">
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
				<view :style="{ 'padding-top': top +46+40+ 'px' }"></view>
				<goodslist class="margin-t12" :offset="6" :sortType="sortType" :list="list"></goodslist>
				<view :style="isIphonex ? 'padding-bottom:84px' : 'padding-bottom:50px'"></view>
			</scroll-view>
		</view>
		<!-- 全部宝贝 end-->
		<!-- 发布动态 -->
		<view  v-if="tabStatus == 2"  class="bg-color-f7" style="position: relative;height: 100vh;">
			<view class="wrap-list-nav bg-color-w "  :style="{ 'top': top +46+ 'px' }">
				<view class="flex h-10 bg-color-f7 wrap-list-nav-info"></view>
			</view>
			<scroll-view class="padding-lr12" scroll-y="true" style="height: 100%;">
				<view :style="{ 'padding-top': top +46+10+ 'px' }"></view>
				<view class="flex">
					<view class="flex f-s-0 f-w-b f22-size margin-r4">28</view>
					<view class="flex f-s-0  margin-t2 f10-size t-color-9 margin-r10">8月</view>
					<view class="flex flex-1 f-c over-h">
						<view class="line2">
							<text class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-r margin-r4">短视频</text>
							<text class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-g margin-r4">种草</text>
							<text class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-y margin-r4">上新</text>
							❀最近入手一件超可爱的毛衣外套！质感柔软，亲肤，但又不会软踏踏，也太舒服了吧！衣服上的卡通图案就是本公主最喜欢的了！oversize版型轻松解锁下半身失踪，可爱不失性感~&nbsp;在千篇一律的毛衣中，这种图案
						</view>
						<view class="margin-t12 flex">
							<view class="video-img b-radius-5 bg-color"></view>
						</view>
							<scroll-view class="margin-t12  h-50" scroll-x="true" >
								<view class="flex f-n ">
									<view v-for="(item,index) in 3" class="flex f-s-0 margin-r6 b-radius-10 over-h bg-color-w">
										<view class="flex f-s-0 w-50 h-50 bg-img bg-color margin-r10"></view>
										<view class="flex f-c f-j-c ">
											<view class="line1 w-80">百褶裙短裙女夏2020新款高腰学生百搭半身裙女a字裙格裙学院秋冬</view>
											<view class="text-price t-color-y">29</view>
										</view>
										<view class="flex f-s-0 f-a-c f-j-c padding-lr6 van-icon van-icon-arrow t-color-9"></view>
									</view>
								</view>
								
							</scroll-view>
							<view class="margin-t12 grid grid-c-3 grid-g2">
								<view v-for="(item,index) in 8" class="flex w100 bg-img h-110 bg-color"></view>
							</view>
							<view class="flex f-j-e">
								<view class="padding-tb10 flex f-a-c margin-r20">
									<view class="flex f-a-c f-j-c van-icon van-icon-good-job-o margin-r4"></view>
									<text class=" ">11</text>
								</view>
								<view class="padding-tb10 flex f-a-c">
									<view class="flex f-a-c f-j-c van-icon van-icon-comment-o margin-r4"></view>
									<text class=" ">11</text>
								</view>
								
							</view>
					</view>
				</view>
				<view :style="isIphonex ? 'padding-bottom:84px' : 'padding-bottom:50px'"></view>
			</scroll-view>	
		</view>
		<!-- 店铺分类 -->
		<view class="flex bg-color-f7" v-if="tabStatus == 3" style="position: relative;height: 100vh;" :style="{ 'padding-top': top +46+ 'px' }">
			<scroll-view :scroll-into-view="'cate'+cateActive" scroll-y="true" class="flex f-c f-s-0 w-100 bg-color-fb "  :style="{'height': height+'px'}">
				<view @click="cateActive=index" v-for="(item,index) in cateList" :class="index === cateActive ? 'cate-on' : ''" :id="'cate'+index" class="flex f-s-0 h-50 f-a-c f-j-c f12-size t-color-5 ">{{item}}</view>
				<view  :style="{ 'padding-top': !isIphonex ? '50px' : '84px'}"></view>
			</scroll-view>
			<scroll-view scroll-y="true" class="flex f-c f-s-0 flex-1 padding-10  "  :style="{'height': height+'px'}">
				<view  class="bg-color-w b-radius-10  wrap-sub-cate padding-10">
					<view class="flex f-a-c f-j-s">
						<text class="t-color-5 f12-size">女裤</text>
						<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f16-size"></text>
					</view>
					<view class="flex f-w">
						<view v-for="(item,index) in 10" class="flex f-s-0 sub-item f-c f-a-c f-j-c margin-t20">
							<view class="flex w-60 h-60 bg-img bg-color b-radius-5"></view>
							<view class="f12-size t-color-6 margin-t4">新品尝鲜</view>
						</view>
					</view>
				</view>
				<view  :style="{ 'padding-top': !isIphonex ? '50px' : '84px'}"></view>
			</scroll-view>
		</view>
		<!-- 店铺分类 end-->		
				
				
		<view class="flex bg-color-w warp-tabbar h-50" :style="isIphonex ? 'padding-bottom:34px' : 'padding-bottom:0px'">
			<view class="flex flex-1  f-j-c f-c f-s-0 " @click="changeTab(0)" :class="tabStatus == 0 ? 't-color-y' : 't-color-5'">
				<view class="flex f-a-c f-j-c h-24 van-icon van-icon-shop-o f22-size"></view>
				<view class="flex f-a-c f-j-c  f11-size margin-t2">首页</view>
			</view>
			<view class="flex flex-1  f-j-c f-c f-s-0" @click="changeTab(1)" :class="tabStatus == 1 ? 't-color-y' : 't-color-5'">
				<view class="flex f-a-c f-j-c h-24 van-icon van-icon-goods-collect-o f22-size"></view>
				<view class="flex f-a-c f-j-c  f11-size margin-t2">全部宝贝</view>
			</view>
			<view class="flex flex-1  f-j-c f-c f-s-0" @click="changeTab(2)" :class="tabStatus == 2 ? 't-color-y' : 't-color-5'">
				<view class="flex f-a-c f-j-c h-24 van-icon van-icon-fire-o f22-size"></view>
				<view class="flex f-a-c f-j-c  f11-size margin-t2">发现动态</view>
			</view>
			<view class="flex flex-1  f-j-c f-c f-s-0" @click="changeTab(3)" :class="tabStatus == 3 ? 't-color-y' : 't-color-5'">
				<view class="flex f-a-c f-j-c h-24 van-icon van-icon-bars f22-size"></view>
				<view class="flex f-a-c f-j-c  f11-size margin-t2">店铺分类</view>
			</view>
			<view class="flex flex-1  f-j-c f-c f-s-0" @click="changeTab(4)" :class="tabStatus == 4 ? 't-color-y' : 't-color-5'">
				<view class="flex f-a-c f-j-c h-24 van-icon van-icon-service f22-size"></view>
				<view class="flex f-a-c f-j-c  f11-size margin-t2">客服</view>
			</view>
		</view>		
		
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
				tabStatus: 2,
				cateList: ['推荐','男装','推荐','男装','推荐','男装','推荐','男装','推荐','男装','推荐','男装','推荐','男装','推荐','男装'],
				cateActive: 0,
				height: 0,
			};
		},
		onLoad: function() {
			self = this;
			let height = getApp().globalData.height;
			height = height-46-this.top;
			this.height = height;
			this.init();
		},
		methods: {
			changeTab(status) {
				self.tabStatus = status;
			},
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
