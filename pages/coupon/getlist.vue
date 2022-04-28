<template>
	<view class="contain">
		<view class="flex h-30">
			<view v-for="(item,index) in navs" :id="'navs'+index" :class="active == index ? 'navs-on' : ''" class="flex f-s-0  f-a-c flex-1  f-j-c  f-w-500">{{item.name}}</view>
		</view>
		<swiper class="wrap-swiper" :style="{'height': height+'px'}" :current="active" @change="changeSwiper" :indicator-dots="false" :autoplay="false" :interval="1000" :duration="500">
			<swiper-item v-for="(item,parent) in navs">
				<scroll-view @scrolltolower="loadList" scroll-y="true"  :style="{'height': height+'px'}">
					<view class="padding-12">
						<view class="flex bg-color-w b-radius-5 h-100 wrap-coupon">
							<view class="w-110 flex f-s-0 f-c f-a-c f-j-c coupon-left"> 
								<text class="text-price f20-size t-color-y f-w-b">1000</text>
								<view class="flex f-a-c f-j-c b-radius-2 bg-color-f3 h-20 padding-lr6 f11-size margin-t4">满1001减1000</view>
							</view>
							<view class="padding-10 flex flex-1 f-c f-j-s">
								<view class="flex f-c">
									<view class="flex f-a-c f-j-s">
										<view class="flex f-a-c">
											<text class="flex f-a-c f-j-c van-icon van-icon-shop-o t-color-9 margin-r4"></text>
											<text>巴拉巴拉</text>
										</view>
										<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f15-size"></text>
									</view>
								</view>
								<view class="flex">
									<view class="flex flex-1 f-c f-j-e">
										<view class="coupon-dot flex f-a-c margin-t4 f12-size t-color-9">未使用前 永久 有效</view>
									</view>
									<view @click="go1" class="flex f-s-0 f-a-c f-j-c h-30 b-radius-30 f12-size t-color-w bg-color-linear-y w-70">立即领取</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>			
		
	</view>
</template>
<style scoped>
@import url('../../static/css/coupon/common.css');

</style>
<script>
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
		components: {},
		onPullDownRefresh() {
		},
		onReachBottom() {
		}
	}
</script>
