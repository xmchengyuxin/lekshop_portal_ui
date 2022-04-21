<template>
	<view class="contain">
		<view class="fixed-top bg-color padding-lr12" :style="{ 'padding-top': top + 'px' }">
			<view class="flex f-a-c h-44">
				<view class="flex f-a-c f-j-c van-icon van-icon-scan t-color-w f22-size margin-r10"></view>
				<view class="flex flex-1 f-a-c bg-color-w b-radius-30 h-34 padding-lr12 margin-r10" >
					<view class="flex f-a-c van-icon van-icon-search t-color-9 f20-size margin-r8"></view>
					<view class="flex f-a-c t-color-6">搜索 商品、类目</view>
				</view>
				<view class="flex f-a-c f-j-c van-icon van-icon-coupon-o t-color-w f22-size margin-r10"></view>
				<view class="flex f-a-c f-j-c van-icon van-icon-chat-o t-color-w f22-size"></view>
			</view>
			<view class="h-30">
				<scroll-view scroll-x="true" :scroll-into-view="'navs'+active" class="h100" >
					<view class="flex f-n h100">
						<view v-for="(item,index) in navs" :id="'navs'+index" :class="active == index ? 'navs-on' : ''" class="flex f-s-0  f-a-c h100 margin-r20 t-color-w  f-w-500">{{item.name}}</view>
					</view>
				</scroll-view>
			</view>
			<view style="padding: 2px;"></view>
		</view>
		<swiper class="wrap-swiper" :current="active" @change="changeSwiper" :indicator-dots="false" :autoplay="false" :interval="1000" :duration="500">
			<swiper-item v-for="item in navs">
				<scroll-view @scrolltolower="loadList" scroll-y="true" style="height: 100%;">
					<view class="swiper-item padding-12" :style="'https://stc.wanlshop.com/assets/addons/wanlshop/img/show/main_bg3x.png' | bgimg(700)">
						<view  :style="{ 'padding-top': top +74+ 'px' }"></view>
						<swiper  class="wrap-banner h-120 b-radius-5" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
							<swiper-item >
								<view class="bg-color h100 b-radius-5"></view>
							</swiper-item>
							<swiper-item>
								<view class="bg-color-linear-y h100 b-radius-5"></view>
							</swiper-item>
						</swiper>
						<view class="flex f-w b-radius-10 bg-color-w wrap-tuijian margin-t12">
							<view v-for="(item,index) in 6" class="flex f-s-0 tuijain-item f-c padding-12">
								<view class="flex f-a-c">
									<text class="f15-size f-w-500 t-color-y margin-r4">连衣裙</text>
									<view class="flex f-a-c h-16 padding-lr5 bg-color-linear-y b-radius-30 t-color-w f10-size">
										<text style="padding: 3px;" class="b-radius bg-color-y1 margin-r4"></text>
										新品尝鲜
									</view>
								</view>
								<view class="t-color-8 f12-size">30天包退 365天包换</view>
								<view class="flex f-j-s margin-t10">
									<view class="tuijian-img b-radius-5 bg-img bg-color"></view>
									<view class="tuijian-img b-radius-5 bg-img bg-color"></view>
								</view>
							</view>
						</view>
						
						<view class="b-radius-10 bg-color-w wrap-pintuan margin-t12">
							<view class="flex padding-lr12 h-40 f-a-c f-j-s">
								<view class="flex f-a-c">
									<text class="f-w-b margin-r8" style="color: rgb(173, 78, 0);">热门拼团</text>
									<text class="f10-size" style="color: rgb(199, 90, 0);">拼着买，更便宜~</text>
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
						
						<goodslist class="margin-t12" :list="list" ></goodslist>
						<view  :style="{ 'padding-top': !isIphonex ? '50px' : '84px'}"></view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		<tab-bar :active="0" :isShow="false"></tab-bar>
	</view>
</template>
<style scoped>
@import url('../../static/css/index/index.css');
</style>
<script>
	import waterfallsFlow from "@/components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
	const $ = require('../../utils/api.js');
	let self = this;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				active: 0,
				 list: [
					 {
					   id: 6,
					   image_url:
					     "https://stc.wanlshop.com/1a42d31bbb0f1d8d9aa66f804b47c7a3.jpg?x-oss-process=image/auto-orient,1/interlace,1/format,jpg/quality,q_90/sharpen,50/resize,m_mfit,w_516",
					   title: "恐龙",
					   text: "恐龙来啦",
					 },
				        {
				          id: 1,
				          image_url:
				            "https://stc.wanlshop.com/9b777f933945c6d515ce8313ee3c38cd.jpg?x-oss-process=image/auto-orient,1/interlace,1/format,jpg/quality,q_90/sharpen,50/resize,m_mfit,w_516",
				          title: "可爱的小猫咪呀",
				          text:
				            "小小的猫咪，甚是呆萌，呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌",
				        },
				        {
				          id: 2,
				          image_url:
				            "https://stc.wanlshop.com/1a42d31bbb0f1d8d9aa66f804b47c7a3.jpg?x-oss-process=image/auto-orient,1/interlace,1/format,jpg/quality,q_90/sharpen,50/resize,m_mfit,w_516",
				          title: "迪士尼动画",
				          text: "迪士尼动画之……",
				        },
				        {
				          id: 3,
				          image_url:
				            "https://stc.wanlshop.com/9b777f933945c6d515ce8313ee3c38cd.jpg?x-oss-process=image/auto-orient,1/interlace,1/format,jpg/quality,q_90/sharpen,50/resize,m_mfit,w_516",
				          title: "火箭",
				          text: "火箭升空瞬间，宏伟壮观啊",
				        },
				        {
				          id: 5,
				          image_url:
				            "https://stc.wanlshop.com/9b777f933945c6d515ce8313ee3c38cd.jpg?x-oss-process=image/auto-orient,1/interlace,1/format,jpg/quality,q_90/sharpen,50/resize,m_mfit,w_516",
				          title: "华佗",
				          text: "华佗人物画像 中国画 线条画 毛笔画 彩色画",
				        },
				       
				        
				      ],
					  navs: [{name:'推荐'},{name:'女装'},{name:'母婴'},{name:'手机数码'},{name:'男装'},{name:'母婴'},{name:'手机数码'},{name:'男装'}]
			};
		},
		onLoad: function() {
			self = this;
			this.init();
		},
		methods: {
			changeSwiper(e) {
				console.log(e);
				self.active = e.detail.current;
			},
			loadList(e) {
				console.log(self.active);
				let list1 = [
						 {
						   id: 6,
						   image_url:
						     "https://stc.wanlshop.com/1a42d31bbb0f1d8d9aa66f804b47c7a3.jpg?x-oss-process=image/auto-orient,1/interlace,1/format,jpg/quality,q_90/sharpen,50/resize,m_mfit,w_516",
						   title: "恐龙",
						   text: "恐龙来啦",
						 },];
				self.list = self.list.concat(list1)
			},
			init() {},
		},
		created() {
		},
		mounted() {},
		destroyed() {},
		components: {waterfallsFlow},
		onPullDownRefresh() {
		},
		onReachBottom() {
			
		}
	}
</script>
