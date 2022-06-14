<template>
	<view class="contain">
		<view class="fixed-top bg-color-linear-y padding-lr12" :style="{ 'padding-top': top + 'px' }">
			<view class="flex f-a-c h-44">
				<view class="flex f-a-c f-j-c van-icon van-icon-scan t-color-w f22-size margin-r10"></view>
				<view  @click="go('/pages/search/index')" class="flex flex-1 f-a-c bg-color-w b-radius-30 h-34 padding-lr12 margin-r10" >
					<view class="flex f-a-c van-icon van-icon-search t-color-9 f20-size margin-r8"></view>
					<view class="flex f-a-c t-color-6">搜索商品</view>
				</view>
				<view @click="go('/pages/coupon/getlist')" class="flex f-a-c f-j-c van-icon van-icon-coupon-o t-color-w f22-size margin-r10"></view>
				<view @click="go('/pages/index/cate')" class="flex f-a-c f-j-c van-icon van-icon-cate t-color-w f22-size"></view>
				<xcx-header></xcx-header>
			</view>
			<view class="h-30">
				<scroll-view scroll-x="true" :scroll-into-view="'navs'+active" class="h100" >
					<view class="flex f-n h100">
						<view @click="active=index" v-for="(item,index) in navs" :id="'navs'+index" :class="active == index ? 'navs-on' : ''" class="flex f-s-0  f-a-c h100 margin-r20 t-color-w  f-w-500">{{item.name}}</view>
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
						<swiper v-if="parent == 0"  class="wrap-banner   b-radius-5" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
							<swiper-item v-for="img in banner">
								<view class="bg-img h100 b-radius-5 " :style="img.img | bgimg(700)+''"></view>
							</swiper-item>
						</swiper>
						<view v-if="item.children && item.children.length > 0" class="bg-color-w b-radius-10 flex f-w margin-t12 wrap-sub-cate">
							<view @click="go('/pages/search/list?cateTid='+child.id+'&cateName='+child.name)" v-for="(child,idx) in item.children" class="flex f-s-0 sub-item f-c f-a-c f-j-c margin-t8">
								<view v-if="child.img" class="flex w-50 h-50 bg-img  b-radius-5" :style="child.img | bgimg(300)+''"></view>
								<view v-else class="flex w-50 h-50 bg-img  b-radius-5 f-a-c f-j-c shops-icon shops-icon-cate f44-size"></view>
								<view class="f12-size t-color-6 margin-t4">{{child.name}}</view>
							</view>
						</view>
						<tuijian :cates="navs" v-if="parent == 0"></tuijian>
						<view class="padding-6"></view>	
						<groupList class="" v-if="active == parent" :catePid="item.id"  :isSpread="active == 0 ? true : false"></groupList>
						
						<view class="flex f-a-c f-j-c f-w-b t-color-8 padding-tb6 wrap-tuijian-title margin-t12">
							<image class="w-20 margin-r8" src="../../static/images/zan-on.png" mode="widthFix"></image>
							<text>好物推荐</text>
						</view>
						<goodsShopList class="margin-t12" v-if="active == parent" showType="2"  :catePid="item.id" :isSpread="active == 0 ? true : false"></goodsShopList>
						<!-- <goodslist v-if="item.list" class="margin-t12" :list="item.list" ></goodslist> -->
						<!-- <view  :style="{ 'padding-top': !isIphonex ? '50px' : '84px'}"></view> -->
						<view v-if="!isLogin" class="padding-20"></view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		<tab-bar ref="tabbar" :showLogin="true" :active="0" :isShow="false"></tab-bar>
	</view>
</template>
<style scoped>
@import url('../../static/css/iconcolor.css');
@import url('../../static/css/index/index.css');
</style>
<script>
	import groupList from '../shops/components/groupgoods.vue';
	import goodsShopList from '../shops/components/goodslist.vue';
	import tuijian from './components/tuijian.vue';
	const $ = require('../../utils/api.js');
	let self = this;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				isLogin: uni.getStorageSync('token') ? true : false,
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
		onShow() {
			this.$nextTick(() => {
				this.$refs.tabbar.getChatLen();
			})
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
							id: '',
							name: '推荐'
						})
						self.navs = res.data;
					}
				})
			},
			changeSwiper(e) {
				self.active = e.detail.current;
				// self.getGoodsList();
			},
			loadList(e) {
				// let cate = self.navs[self.active];
				// if(cate.page < cate.totalPage) {
				// 	cate.page +=1;
				// 	self.getGoodsList();
				// }
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
		components: {groupList,goodsShopList,tuijian},
		onPullDownRefresh() {
		},
		onReachBottom() {
			
		}
	}
</script>
