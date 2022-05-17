<template>
	<view class="contain">
		<view class="flex h-30">
			<view v-for="(item,index) in navs" :id="'navs'+index" :class="active == index ? 'navs-on' : ''" class="flex f-s-0  f-a-c flex-1  f-j-c  f-w-500">{{item.name}}</view>
		</view>
		<swiper class="wrap-swiper" :style="{'height': height+'px'}" :current="active" @change="changeSwiper" :indicator-dots="false" :autoplay="false" :interval="1000" :duration="500">
			<swiper-item v-for="(item,parent) in navs">
				<scroll-view @scrolltolower="loadList" scroll-y="true"  :style="{'height': height+'px'}">
					<coupon-list :list="item.list"></coupon-list>
				</scroll-view>
			</swiper-item>
		</swiper>			
		
	</view>
</template>
<style scoped>
@import url('../../static/css/coupon/common.css');

</style>
<script>
	import couponList from '../common/couponlist.vue';
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				active: 0,
				navs: [
					{
						name: '满减券',
						list: [],
						page: 1,
						totalPage: 1,
						pageSize: 20,
					},
					{
						name: '折扣券',
						list: [],
						page: 1,
						totalPage: 1,
						pageSize: 20,
					},
					{
						name: '包邮券',
						list: [],
						page: 1,
						totalPage: 1,
						pageSize: 20,
					}
				],
				height: 0,
			};
		},
		onLoad: function() {
			self = this;
			let height = getApp().globalData.height;
			height = height-30;
			// #ifdef H5
			height = height - 44;
			// #endif
			this.height = height;
			this.init();
		},
		methods: {
			go1() {
				let xiaomi = 'mimarket://details?id=com.cydaxiang.amo';
				let yingyongbao = 'tmast://appdetails?pname=com.cydaxiang.amo';
				console.log(url1)
				try {
					window.location.href = url;
				}catch(e) {
					console.log(e);
				}
				// window.location.replace(url);
			},
			changeSwiper(e) {
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
		components: {couponList},
		onPullDownRefresh() {
		},
		onReachBottom() {
		}
	}
</script>
