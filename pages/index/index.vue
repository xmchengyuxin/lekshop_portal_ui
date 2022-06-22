<template>
	<view class="contain">
		<view class="fixed-top bg-color-linear-y padding-lr12" :style="{ 'padding-top': top + 'px' }">
			<view class="flex f-a-c h-44">
				<view class="flex f-a-c f-j-c van-icon van-icon-scan t-color-w f22-size margin-r10"></view>
				<view  @click="go('/pages/search/index')" class="flex flex-1 f-a-c bg-color-w b-radius-30 h-34 padding-lr12 margin-r10" >
					<view class="flex f-a-c van-icon van-icon-search t-color-9 f20-size margin-r8"></view>
					<view class="flex f-a-c t-color-6">{{i18n['搜索商品']}}</view>
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
						<block v-if="parent == 0" v-for="style in styleList">
							
							<swiper v-if="style.moduleKey == 'carousel'"  class="wrap-banner margin-b12  b-radius-5" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
								<swiper-item v-for="img in style.moduleData.list">
									<view class="bg-img h100 b-radius-5 " :style="img.img | bgimg(700)+''"></view>
								</swiper-item>
							</swiper>
							<!-- 左一右二 -->
							<view v-if="style.moduleKey == 'leftOneRightTwo'" class="bg-color-w b-radius-5 padding-10 grid grid-c-2 grid-g10 margin-b12">
								<view class="bg-color bg-img" style="padding: 50%;" :style="style.moduleData.list[0].img | bgimg(400)+''"></view>
								<view class="flex f-c">
									<view class="bg-color flex flex-1 bg-img margin-b10" :style="style.moduleData.list[1].img | bgimg(400)+''"></view>
									<view class="bg-color flex flex-1 bg-img" :style="style.moduleData.list[2].img | bgimg(400)+''"></view>
								</view>
							</view>
							<!-- 左二右一 -->
							<view v-if="style.moduleKey == 'leftTwoRightOne'" class="bg-color-w b-radius-5 padding-10 grid grid-c-2 grid-g10 margin-b12">
								<view class="flex f-c">
									<view class="bg-color flex flex-1 bg-img margin-b10" :style="style.moduleData.list[0].img | bgimg(400)+''"></view>
									<view class="bg-color flex flex-1 bg-img" :style="style.moduleData.list[1].img | bgimg(400)+''"></view>
								</view>
								<view class="bg-color bg-img" style="padding: 50%;" :style="style.moduleData.list[2].img | bgimg(400)+''"></view>
							</view>
							<!-- 三列单行 -->
							<view v-if="style.moduleKey == 'flexThree'" class="bg-color-w b-radius-5 padding-10 grid grid-c-3 grid-g10 margin-b12">
								<view class="bg-color bg-img" style="padding: 50%;" v-for="item in style.moduleData.list" :style="item.img | bgimg(400)+''"></view>
							</view>
							<!-- 四列单行 -->
							<view v-if="style.moduleKey == 'flexFour'" class="bg-color-w b-radius-5 padding-10 grid grid-c-4 grid-g10 margin-b12">
								<view class="bg-color bg-img" style="padding: 50%;" v-for="item in style.moduleData.list" :style="item.img | bgimg(400)+''"></view>
							</view>
							<!-- 五列单行 -->
							<view v-if="style.moduleKey == 'flexFive'" class="bg-color-w b-radius-5 padding-10 grid grid-c-5 grid-g10 margin-b12">
								<view class="bg-color bg-img" style="padding: 50%;" v-for="item in style.moduleData.list" :style="item.img | bgimg(400)+''"></view>
							</view>
							<!-- 一张大图 -->
							<view v-if="style.moduleKey == 'flexOne'" class=" b-radius-5  margin-b12">
								<image class="w100" v-for="item in style.moduleData.list" :src="item.img | img(700)+''" mode="widthFix"></image>
							</view>
							<!-- 二张大图 -->
							<view v-if="style.moduleKey == 'flexTwo'" class=" b-radius-5 grid grid-c-2 grid-g10  margin-b12">
								<image class="w100" v-for="item in style.moduleData.list" :src="item.img | img(700)+''" mode="widthFix"></image>
							</view>
							<!-- 上一下二 -->
							<view v-if="style.moduleKey == 'topOneBottomTwo'" class=" b-radius-5  margin-b12">
								<image class="w100 margin-b10" v-if="idx <= 0" v-for="(item,idx) in style.moduleData.list" :src="item.img | img(700)+''" mode="widthFix"></image>
								<view class="grid grid-c-2 grid-g10">
									<image class="w100" v-if="idx > 0" v-for="(item,idx) in style.moduleData.list" :src="item.img | img(500)+''" mode="widthFix"></image>
								</view>
							</view>
							<!-- 上二下一 -->
							<view v-if="style.moduleKey == 'topTwoBottomOne'" class=" b-radius-5  margin-b12">
								<view class="grid grid-c-2 grid-g10 margin-b10">
									<image class="w100" v-if="idx <= 1" v-for="(item,idx) in style.moduleData.list" :src="item.img | img(500)+''" mode="widthFix"></image>
								</view>
								<image class="w100 " v-if="idx > 1" v-for="(item,idx) in style.moduleData.list" :src="item.img | img(700)+''" mode="widthFix"></image>
							</view>
							<!-- 文字图片 -->
							<view  v-if="style.moduleKey == 'textPicture'" class="grid grid-c-4 grid-g10 b-radius-10 bg-color-w wrap-tuijian padding-10 margin-b12">
								<view v-for="(item,idx) in style.moduleData.list" class="">
									<text class="t-color-y f15-size f-w-500">{{item.title}}</text>
									<view class="bg-img margin-t10 b-radius-5" style="padding: 50%;" :style="item.img | bgimg(400)+''"></view>
								</view>
							</view>
							<!-- 宫格导航 -->
							<view v-if="style.moduleKey == 'menu'" class="grid grid-c-5 bg-color-w b-radius-10 padding-tb10 margin-b12">
								<view v-for="(item,idx) in style.moduleData.list" class="">
									<view class="h-50 flex f-a-c f-j-c"  >
										<image class="w-36 " :src="item.img | img(400)+''" mode="widthFix"></image>
									</view>
									<text class="f12-size t-color-9  flex f-a-c f-j-c">{{item.title}}</text>
								</view>
							</view>
							<!-- 拼团 -->
							<view v-if="style.moduleKey == 'group'" v-for="(item,idx) in style.moduleData.list" class="b-radius-10 bg-color-w wrap-pintuan margin-b12 over-h">
								<view @click="go('/pages/search/list?type='+type+'&shopId='+shopId)" v-for="goods in item.titleWay" class="flex padding-lr12 h-40 f-a-c f-j-s">
									<view class="flex f-a-c">
										<text class="f-w-b margin-r8" style="color: rgb(173, 78, 0);">{{goods.title}}</text>
										<text class="f10-size" style="color: rgb(199, 90, 0);">{{goods.desc}}</text>
									</view>
									<view class="flex f-a-c">
										<text class="f12-size t-color-9 margin-r2">{{i18nHot['更多']}}</text>
										<text class="flex f-a-c van-icon van-icon-arrow t-color-9"></text>
									</view>
								</view>
								<view class="flex padding-lr12 ">
									<view @click="go('/pages/shops/detail?id='+item.id)" v-for="goods in item.listWay" class="flex  f-s-0 margin-r12 f-c pintuan-item">
										<view :style="goods.mainImg | bgimg(300)+''" class="h-100 bg-img b-radius-8"></view>
										<view class="f12-size line1 margin-t4">{{goods.title}}</view>
										<view class="flex f-a-c f-j-s margin-t4">
											<view class="text-price f16-size t-color-y">{{goods.price}}</view>
											<view class="bg-color-linear-y h-16 t-color-w f10-size padding-lr5 b-radius-30">{{i18nHot['拼']}}</view>
										</view>
									</view>
								</view>
							</view>
							<!-- 秒杀活动 -->
							<view v-if="style.moduleKey == 'seckill'" v-for="(item,idx) in style.moduleData.list" class="b-radius-10 bg-color-w wrap-tuijian margin-b12 over-h">
								<view @click="go('/pages/search/list?type='+type+'&shopId='+shopId)" v-for="goods in item.titleWay" class="flex padding-lr12 h-40 f-a-c f-j-s">
									<view class="flex f-a-c">
										<text class="f-w-b margin-r8" style="color: rgb(173, 78, 0);">{{goods.title}}</text>
										<text class="f10-size" style="color: rgb(199, 90, 0);">{{goods.desc}}</text>
									</view>
									<view class="flex f-a-c">
										<text class="f12-size t-color-9 margin-r2">{{i18nHot['更多']}}</text>
										<text class="flex f-a-c van-icon van-icon-arrow t-color-9"></text>
									</view>
								</view>
								<view class="flex padding-lr12 ">
									<view @click="go('/pages/shops/detail?id='+item.id)" v-for="goods in item.listWay" class="flex  f-s-0 margin-r12 f-c pintuan-item">
										<view :style="goods.mainImg | bgimg(300)+''" class="h-100 bg-img b-radius-8"></view>
										<view class="f12-size line1 margin-t4">{{goods.title}}</view>
										<view class="flex f-a-c f-j-s margin-t4">
											<view class="text-price f16-size t-color-y">{{goods.price}}</view>
											<view class="bg-color-linear-y h-16 t-color-w f10-size padding-lr5 b-radius-30">{{i18nHot['秒']}}</view>
										</view>
									</view>
								</view>
							</view>
							
							<view v-if="item.children && item.children.length > 0" class="bg-color-w b-radius-10 flex f-w margin-t12 wrap-sub-cate">
								<view @click="go('/pages/search/list?cateTid='+child.id+'&cateName='+child.name)" v-for="(child,idx) in item.children" class="flex f-s-0 sub-item f-c f-a-c f-j-c margin-t8">
									<view v-if="child.img" class="flex w-50 h-50 bg-img  b-radius-5" :style="child.img | bgimg(300)+''"></view>
									<view v-else class="flex w-50 h-50 bg-img  b-radius-5 f-a-c f-j-c shops-icon shops-icon-cate f44-size"></view>
									<view class="f12-size t-color-6 margin-t4">{{child.name}}</view>
								</view>
							</view>
							
							<!-- <tuijian :cates="navs" ></tuijian> -->
							<!-- <groupList class="" v-if="active == parent" :catePid="item.id"  :isSpread="active == 0 ? true : false"></groupList> -->
						</block>
						<block v-else>
							<view v-if="item.children && item.children.length > 0" class="bg-color-w b-radius-10 flex f-w margin-t12 wrap-sub-cate">
								<view @click="go('/pages/search/list?cateTid='+child.id+'&cateName='+child.name)" v-for="(child,idx) in item.children" class="flex f-s-0 sub-item f-c f-a-c f-j-c margin-t8">
									<view v-if="child.img" class="flex w-50 h-50 bg-img  b-radius-5" :style="child.img | bgimg(300)+''"></view>
									<view v-else class="flex w-50 h-50 bg-img  b-radius-5 f-a-c f-j-c shops-icon shops-icon-cate f44-size"></view>
									<view class="f12-size t-color-6 margin-t4">{{child.name}}</view>
								</view>
							</view>
							<view class="padding-6"></view>
							<groupList class="" v-if="active == parent" :catePid="item.id"  :isSpread="active == 0 ? true : false"></groupList>
						</block>
						
						<view class="flex f-a-c f-j-c f-w-b t-color-8 padding-tb6 wrap-tuijian-title margin-t12">
							<image class="w-20 margin-r8" src="../../static/images/zan-on.png" mode="widthFix"></image>
							<text>{{i18n['好物推荐']}}</text>
						</view>
						<goodsShopList class="margin-t12" v-if="active == parent" showType="2"  :catePid="item.id" :isSpread="active == 0 ? true : false"></goodsShopList>
						<!-- <goodslist v-if="item.list" class="margin-t12" :list="item.list" ></goodslist> -->
						<!-- <view  :style="{ 'padding-top': !isIphonex ? '50px' : '84px'}"></view> -->
						<view v-if="!isLogin" class="padding-20"></view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<notice></notice>
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
	const API = require('../../utils/api/common.js').default;
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
				styleList: [],
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
							name: self.i18n['推荐']
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
			getIndexStyle() {
				$.ajax({
					url: API.indexStyle,
					data: {},
					method: 'GET',
					success(res) {
						let arr = res.data ? res.data : [];
						if(arr.length > 0) {
							arr.forEach((ele,index) => {
								ele.moduleData = JSON.parse(ele.moduleData);
								self.styleList.push(ele);
							})
						}
					}
				})
			},
			init() {
				this.getIndexStyle();
				this.getCate();
				this.getBanner({
					success(res) {
						self.banner = res.data ? res.data : [];
					}
				})
			},
		},
		computed: {
			i18n() {
				return this.$t('index')
			},
			i18nHot() {
				return this.$t('hotGroup')
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
