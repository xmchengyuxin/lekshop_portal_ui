<template>
	<view class="contain">
		<view  class="fixed-top h-46 flex bg-color-w box-c"  :style="{ 'padding-top': top + 'px' }">
			<view @click="back(1)" class="flex f-a-c f-s-0 padding-lr10 van-icon van-icon-arrow-left f20-size"></view>
			<view class="flex flex-1">
				<block v-if="tabStatus == 0">
					<view @click="active=0;" :class="active == 0 ? 'f-w-b f18-size' : 'f16-size'" class="flex f-a-c f-j-c w-50">{{i18nShop['推荐']}}</view>
					<view @click="active=1;" :class="active == 1 ? 'f-w-b f18-size' : 'f16-size'" class="flex f-a-c f-j-c w-50">{{i18nShop['新品']}}</view>
					<view @click="active=2;" :class="active == 2 ? 'f-w-b f18-size' : 'f16-size'" class="flex f-a-c f-j-c w-50">{{i18nShop['拼团']}}</view>
				</block>
				<view class="flex flex-1 f-a-c" v-else>
					<view @click="go('/pages/search/list?shopId='+id)" class="flex flex-1 h-36 b-radius-30 bg-color-f7 padding-lr10">
						<text class="flex f-s-0 f-a-c  van-icon van-icon-search f18-size t-color-9 margin-r10"></text>
						<text class="flex f-a-c f15-size t-color-9">{{i18nShop['搜索店铺内宝贝']}}</text>
					</view>
				</view>
			</view>
			<view class="flex f-s-0">
				<view v-if="tabStatus == 0" class="flex f-a-c">
					<view @click="getCouponList"  class="wrap-coupon-btn flex f-a-c f-j-c w-30 h-30 f16-size b-radius bg-color-linear-r van-icon van-icon-coupon t-color-w " ></view>
				</view>
				<text v-else @click="go('/pages/search/list?shopId='+id)" class="flex f-s-0 f-a-c padding-lr6 van-icon van-icon-search f20-size"></text>
				<text @click="$refs.menuBtn.open()" class="flex f-s-0 f-a-c padding-lr10 van-icon van-icon-weapp-nav f20-size"></text>
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
									<text v-if="shop.selfStatus == 1" class="f10-size bg-color-r t-color-w b-radius-2 h-16 padding-lr5 margin-r6">{{i18nShop['自营']}}</text>
									<text class="f-w-b">{{shop.name}}</text>
								</view>
								<view class="margin-t4 t-color-6 f11-size flex f-a-c">
									<text class="margin-r6">{{i18nShop['店铺粉丝']}}</text>
									<text>{{shop.likeNum}}</text>
								</view>
							</view>
							<view class="flex f-a-c f-j-c f-s-0">
								<view @click="like" :class="isLike ? 't-color-y' : ''" class="flex f-a-c f-j-c b-radius-5 bg-color-w padding-lr10 h-30">
									<text :class="isLike ? 'van-icon-success':'van-icon-cross'" class="flex f-a-c f-j-c van-icon  margin-r4 f13-size"></text>
									<text class="f12-size">{{!isLike ? i18nShop['关注'] : i18nShop['已关注']}}</text>
								</view>
							</view>
						</view>
					</view>
					<swiper v-if="banner.length > 0" class="wrap-banner h-120 margin-t12 margin-b10" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
						<swiper-item v-for="item in banner" >
							<view class="bg-img h100 " :style="item | bgimg(700)+''"></view>
						</swiper-item>
					</swiper>
					<!-- 广告图 -->
					<!-- <view class="padding-12">
						<image class="w100" src="https://stc.wanlshop.com/uploads/a5cbe1ac839ba51dafbac8fa004ee73b.png" mode="widthFix"></image>
					</view> -->
					<!-- 广告图 end-->
					<!-- 拼团 -->
					<view class="padding-6">
						<groupList :shopId="id"></groupList>
					</view>
					<!-- 拼团 end-->
					<view class="padding-6 bg-color-f7 ">
						<goodsShopList ref="indexGoods" v-if='active == 0' class="h100" pageSize="20" showType="2" :shopId="id"></goodsShopList>
					</view>
					<view :style="isIphonex ? 'padding-bottom:84px' : 'padding-bottom:50px'"></view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="bg-color-f7" style="position: relative;">
				<goodsShopList class="h100" v-if='active == 1' :shopId="id"></goodsShopList>
			</swiper-item>
			<swiper-item class="bg-color-f7" style="position: relative;">
				<goodsShopList class="h100" v-if='active == 2'   :shopId="id" :type="3"></goodsShopList>
			</swiper-item>
		</swiper>	
		<!-- 全部宝贝 -->
		<view  v-if="tabStatus == 1"  class="bg-color-f7" style="position: relative;height: 100vh;">
			<goodsShopList class="h100"   :shopId="id"></goodsShopList>
		</view>
		<!-- 全部宝贝 end-->
		<!-- 发布动态 -->
		<view  v-if="tabStatus == 2"  class="bg-color-f7" style="position: relative;height: 100vh;">
			<view class="wrap-list-nav bg-color-w "  :style="{ 'top': top +46+ 'px' }">
				<view class="flex h-10 bg-color-f7 wrap-list-nav-info"></view>
			</view>
			<find-list :findId="id"></find-list>
		</view>
		<!-- 店铺分类 -->
		<view class="flex bg-color-f7" v-if="tabStatus == 3" style="position: relative;height: 100vh;" :style="{ 'padding-top': top +46+ 'px' }">
			<block v-if="shop.cateStyle == 1">
			<scroll-view  scroll-y="true" class="flex f-c f-s-0 w100 bg-color-fb padding-12"  :style="{'height': height+'px'}">
				<view  @click="go('/pages/search/list?shopId='+id+'&catePid='+item.id)" v-for="(item,index) in cateList" :style="item.img | bgimg(700)+''" :class="item.img ? '':'bg-color'" class="f-a-e f-j-c flex b-radius-10 padding-12 h-160 bg-img  margin-b10">
					<view class="flex f-a-c f-j-c w-200 h-20 f-w-b f12-size b-radius-2" style="    background-color: hsla(0,0%,100%,.6);">{{item.name}}</view>
				</view>
				<view  :style="{ 'padding-top': !isIphonex ? '50px' : '84px'}"></view>
			</scroll-view>
			</block>
			<block v-if="shop.cateStyle == 2">
			<scroll-view  scroll-y="true" class="w100 bg-color-fb padding-12"  :style="{'height': height+'px'}">
				<view class="grid grid-c-3">
					<view @click="go('/pages/search/list?shopId='+id+'&catePid='+item.id)" v-for="(item,index) in cateList" class="flex f-c f-a-c f-j-c">
						<view :style="item.img | bgimg(300)+''" class="flex w-80 h-80 bg-img"></view>
						<text class="f12-size margin-t4">{{item.name}}</text>
					</view>
				</view>
				<view  :style="{ 'padding-top': !isIphonex ? '50px' : '84px'}"></view>
			</scroll-view>
			</block>
			<block v-if="shop.cateStyle == 4 || shop.cateStyle == 3">
			<scroll-view :scroll-into-view="'cate'+cateActive" scroll-y="true" class="flex f-c f-s-0 w-100 bg-color-fb "  :style="{'height': height+'px'}">
				<view @click="cateActive=index" v-for="(item,index) in cateList" :class="index === cateActive ? 'cate-on' : ''" :id="'cate'+index" class="flex f-s-0 h-50 f-a-c f-j-c f12-size t-color-5 ">{{item.name}}</view>
				<view  :style="{ 'padding-top': !isIphonex ? '50px' : '84px'}"></view>
			</scroll-view>
			<scroll-view  v-if="cateList.length > 0 && cateList[cateActive] && cateList[cateActive]['children']" scroll-y="true" class="flex f-c f-s-0 flex-1 padding-10  "  :style="{'height': height+'px'}">
				<view v-for="item in cateList[cateActive]['children']" class="bg-color-w b-radius-10  wrap-sub-cate padding-10">
					<view @click="go('/pages/search/list?shopId='+id+'&cateTid='+item.id)" class="flex f-a-c f-j-s">
						<text class="t-color-5 f12-size">{{item.name}}</text>
						<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f16-size"></text>
					</view>
					<view v-if="shop.cateStyle == 4" class="flex f-w">
						<view @click="go('/pages/search?list?shopId='+id+'&cateTid='+item.pid+'&cateId='+item.id)" v-for="(child,idx) in item.children" class="flex f-s-0 sub-item f-c f-a-c f-j-c margin-t20">
							<view class="flex w-60 h-60 bg-img  b-radius-5" :style="child.img | bgimg(300)+''"></view>
							<view class="f12-size t-color-6 margin-t4">{{child.name}}</view>
						</view>
					</view>
				</view>
				<view  :style="{ 'padding-top': !isIphonex ? '50px' : '84px'}"></view>
			</scroll-view>
			</block>
		</view>
		<!-- 店铺分类 end-->		
				
				
		<view class="flex bg-color-w warp-tabbar h-50" :style="isIphonex ? 'padding-bottom:34px' : 'padding-bottom:0px'">
			<view v-if="tabStatus == 0" class="flex flex-1 f-a-c f-j-c f-c f-s-0 ">
				<view class="flex w-36 h-36 b-radius bg-img" :style="shop.logo | bgimg(300)+''"></view>
			</view>
			<view v-if="tabStatus != 0" class="flex flex-1  f-j-c f-c f-s-0 " @click="changeTab(0)" :class="tabStatus == 0 ? 't-color-y' : 't-color-5'">
				<view class="flex f-a-c f-j-c h-24 van-icon van-icon-shop-o f22-size"></view>
				<view class="flex f-a-c f-j-c  f11-size margin-t2">{{i18nShop['首页']}}</view>
			</view>
			<view class="flex flex-1  f-j-c f-c f-s-0" @click="changeTab(1)" :class="tabStatus == 1 ? 't-color-y' : 't-color-5'">
				<view class="flex f-a-c f-j-c h-24 van-icon van-icon-goods-collect-o f22-size"></view>
				<view class="flex f-a-c f-j-c  f11-size margin-t2">{{i18nShop['全部宝贝']}}</view>
			</view>
			<view class="flex flex-1  f-j-c f-c f-s-0" @click="changeTab(2)" :class="tabStatus == 2 ? 't-color-y' : 't-color-5'">
				<view class="flex f-a-c f-j-c h-24 van-icon van-icon-fire-o f22-size"></view>
				<view class="flex f-a-c f-j-c  f11-size margin-t2">{{i18nShop['发现动态']}}</view>
			</view>
			<view class="flex flex-1  f-j-c f-c f-s-0" @click="changeTab(3)" :class="tabStatus == 3 ? 't-color-y' : 't-color-5'">
				<view class="flex f-a-c f-j-c h-24 van-icon van-icon-bars f22-size"></view>
				<view class="flex f-a-c f-j-c  f11-size margin-t2">{{i18nShop['店铺分类']}}</view>
			</view>
			<view class="flex flex-1  f-j-c f-c f-s-0" @click="changeTab(4)" :class="tabStatus == 4 ? 't-color-y' : 't-color-5'">
				<view class="flex f-a-c f-j-c h-24 van-icon van-icon-service f22-size"></view>
				<view class="flex f-a-c f-j-c  f11-size margin-t2">{{i18nShop['客服']}}</view>
			</view>
		</view>
		<menu-btn ref="menuBtn"></menu-btn>
		<uni-popup ref="couponList" type="bottom">
			<view class="safe-area wrap-popup-radius bg-color-f7">
				<view class="flex f-j-s f-a-c padding-12">
					<view class="flex f-s-0 w-30"></view>
					<view class="f16-size">{{i18n['优惠券']}}</view>
					<view @click="$refs.couponList.close()" class="flex f-s-0 f-a-c f-j-c van-icon van-icon-cross w-30"></view>
				</view>
				<coupon-list :list="couponList"></coupon-list>
				<view class="padding-10"></view>
			</view>
		</uni-popup>
	</view>
</template>
<style scoped>
@import url('../../static/css/page/white.css');
@import url('../../static/css/shops/shops.css');
</style>
<script>
	import couponList from '../common/couponlist.vue';
	import findList from './components/findlist.vue'
	import goodsShopList from './components/goodslist.vue'
	import groupList from './components/groupgoods.vue'
	const API = require('../../utils/api/shops.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				active: 0,
				sortType: 1,
				tabStatus: 0,
				cateList: [],
				cateActive: 0,
				height: 0,
				shop: '',
				id: '',
				isLike: false,
				list: [],
				page: 1,
				pageSize: 20,
				totalPage: 1,
				sort: '',
				couponList: [],
				banner: [],
			};
		},
		onLoad: function(options) {
			self = this;
			let height = getApp().globalData.height;
			height = height-46-this.top;
			this.height = height;
			this.id = options.id ? options.id : '';
			this.init();
			if(options.tabStatus && options.tabStatus != '') {
				this.changeTab(options.tabStatus)
			}
		},
		methods: {
			getCouponList() {
				if(self.couponList.length > 0){
					self.$refs.couponList.open();
					return;
				}
				$.ajax({
					url: API.shopCouponList,
					data: {
						shopId: self.id,
						page: 1,
						pageSize: 999,
					},
					method: 'GET',
					success(res) {
						let list = res.data.list ? res.data.list : [];
						self.couponList = list;
						self.$refs.couponList.open();
					}
				})
			},
			getCateList() {
				$.ajax({
					url: API.shopCateApi,
					data: {shopId: self.id},
					method: 'GET',
					success(res) {
						self.cateList = res.data ? res.data : [];
					}
				})
			},
			like() {
				$.ajax({
					url: API.likeShopApi,
					data: {
						shopId: self.id
					},
					method: 'POST',
					success(res) {
						self.isLike = !self.isLike;
						if(self.isLike) {
							self.shop.likeNum += 1;
						}else{
							self.shop.likeNum -= 1;
						}
					}
				})
			},
			changeTab(status) {
				if(status == 4) {
					self.go('/pages/chat/chat?id='+self.shop.memberId);
					return;
				}
				self.tabStatus = status;
				if(status == 3 && this.cateList.length <= 0) {
					this.getCateList();
				}
				
			},
			changeSwiper(e) {
				self.active = e.detail.current;
			},
			getDetail() {
				$.ajax({
					url: API.shopDetailApi,
					data: {shopId:self.id},
					method: 'GET',
					success(res) {
						self.shop = res.data ? res.data : '';
						self.isLike = self.shop != '' ? self.shop.isCollectShop : false;
						let img = self.shop.banner ? self.shop.banner : '';
						if(img != '' && img.indexOf('|') >= 0) {
							self.banner = img.split('|');
						}else{
							self.banner = [img];
						}
					}
				})
			},
			init() {
				this.getDetail();
			},
		},
		created() {
		},
		computed: {
			i18n() {
				return this.$t('search')
			},
			i18nShop() {
				return this.$t('shop')
			},
		},
		mounted() {},
		destroyed() {},
		components: {findList,couponList,goodsShopList,groupList},
		onPullDownRefresh() {
		},
		onReachBottom() {
		}
	}
</script>
