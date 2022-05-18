<template>
	<view class="contain">
		<view class="fixed-top bg-color padding-lr12" :style="{ 'padding-top': top + 'px' }">
			<view @click="go('/pages/search/index')" class="flex f-a-c h-44">
				<view class="flex f-a-c f-j-c van-icon van-icon-scan t-color-w f22-size margin-r10"></view>
				<view class="flex flex-1 f-a-c bg-color-w b-radius-30 h-34 padding-lr12 margin-r10" >
					<view class="flex f-a-c van-icon van-icon-search t-color-9 f20-size margin-r8"></view>
					<view class="flex f-a-c t-color-6">搜索 商品、类目</view>
				</view>
				<view @click="go('/pages/coupon/getlist')" class="flex f-a-c f-j-c van-icon van-icon-coupon-o t-color-w f22-size margin-r10"></view>
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
			<swiper-item v-for="(item,parent) in navs">
				<scroll-view @scrolltolower="loadList" scroll-y="true" style="height: 100%;">
					<view class="swiper-item padding-12" :style="'https://stc.wanlshop.com/assets/addons/wanlshop/img/show/main_bg3x.png' | bgimg(700)+''">
						<view  :style="{ 'padding-top': top +74+ 'px' }"></view>
						<swiper v-if="parent == 0"  class="wrap-banner h-120 b-radius-5" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
							<swiper-item v-for="img in banner">
								<view class="bg-img h100 b-radius-5 " :style="img.img | bgimg(700)+''"></view>
							</swiper-item>
						</swiper>
						<view v-if="item.children && item.children.length > 0" class="bg-color-w b-radius-10 flex f-w margin-t12 wrap-sub-cate">
							<view v-for="(child,idx) in item.children" class="flex f-s-0 sub-item f-c f-a-c f-j-c margin-t8">
								<view class="flex w-50 h-50 bg-img  b-radius-5" :style="child.img | bgimg(300)+''"></view>
								<view class="f12-size t-color-6 margin-t4">{{child.name}}{{child.img}}</view>
							</view>
						</view>
						<view  v-if="parent == 0"  class="flex f-w b-radius-10 bg-color-w wrap-tuijian margin-t12">
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
						<view class="flex f-a-c f-j-c f-w-b t-color-8 padding-tb6 wrap-tuijian-title margin-t12">
							<image class="w-20 margin-r8" src="../../static/images/zan-on.png" mode="widthFix"></image>
							<text>好物推荐</text>
						</view>
						<goodslist v-if="item.list" class="margin-t12" :list="item.list" ></goodslist>
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
				navs: [],
				pageSize: 20,
				banner: [],
			};
		},
		onLoad: function() {
			self = this;
			this.init();
		},
		methods: {
			getGoodsList() {
				let cate = self.navs[self.active];
				if(cate.list && cate.list.length > 0) {
					return
				}
				cate.page = cate.page ? cate.page : 1;
				cate.totalPage = cate.totalPage ? cate.totalPage : 1;
				$.ajax({
					url: 'common/goods/search',
					data: {
						catePid: cate.id,
						page: cate.page,
						pageSize: self.pageSize,
					},
					method: 'GET',
					success(res) {
						let list = cate.list  ? cate.list : [];
						if (cate.page != 1) {
							cate.list  = list.concat(res.data.list);
						} else {
							cate.list  = res.data.list ? res.data.list : [];
						}
						self.$set(self.navs,self.active,cate);
					}
				})
			},
			getCate() {
				$.ajax({
					url: 'common/goodsCate/getList',
					data: {},
					method: 'GET',
					success(res) {
						res.data.unshift({
							id: '0',
							name: '推荐'
						})
						self.navs = res.data;
					}
				})
			},
			changeSwiper(e) {
				self.active = e.detail.current;
				self.getGoodsList();
			},
			loadList(e) {
				let cate = self.navs[self.active];
				if(cate.page < cate.totalPage) {
					cate.page +=1;
					self.getGoodsList();
				}
			},
			init() {
				this.getCate();
				this.getBanner({
					success(res) {
						self.banner = res.data ? res.data : [];
					}
				})
			},
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
