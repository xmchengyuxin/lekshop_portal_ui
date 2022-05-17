<template>
	<view class="contain">
		<view class="h-30 ">
			<scroll-view scroll-x="true" :scroll-into-view="'navs'+active" class="h100" >
				<view class="flex f-n h100">
					<view v-for="(item,index) in navs" :id="'navs'+index" :class="active == index ? 'navs-on t-color-y' : ''" class="flex f-s-0 flex-1 f-j-c  f-a-c h100   f-w-500">{{item.name}}</view>
				</view>
			</scroll-view>
		</view>
		<swiper class="wrap-swiper" :current="active" @change="changeSwiper" :indicator-dots="false" :autoplay="false" :interval="1000" :duration="500">
			<swiper-item v-for="(item,parent) in navs">
				<scroll-view class="padding-12 safe-area" @scrolltolower="loadList" scroll-y="true" style="height: 100%;">
					<view v-if="item.list.length <= 0" class="flex f-a-c f-j-c f-c">
						<view class="padding-30"></view>
						<no-data></no-data>
					</view>
					<view v-else v-for="(child,index) in item.list" class="bg-color-w b-radius-5 padding-12 margin-b12">
						<view class="flex f-j-s margin-b16">
							<view class="flex f-a-c ">
								<text class="flex f-a-c van-icon van-icon-shop-o  margin-r6"></text>
								<text class="f-w-500 t-color-3 margin-r4 ">{{child.order['shopName']}}</text>
								<text class="flex f-a-c van-icon van-icon-arrow t-color-9 "></text>
							</view>
							<text class="t-color-y f-w-500 f12-size">{{i18n['等待支付']}}</text>
						</view>
						
						<view v-for="(goods,idx) in child.orderDetailList" class="flex margin-b10">
							<view class="flex f-s-0 w-70 h-70 b-radius-5 bg-img  margin-r10" :style="goods.goodsMainImg | bgimg(300)+''"></view>
							<view class="flex flex-1 f-c margin-r8">
								<view class="line2 f12-size">{{goods.goodsName}}</view>
								<view class="flex f-a-c margin-t6">
									<view class="flex f-a-c f-j-c padding-lr6 bg-color-f7 f11-size t-color-9 b-radius-2 h-20">{{goods.goodsParamName}}</view>
								</view>
							</view>
							<view class="flex f-s-0 f-c">
								<view class="text-price f12-size">{{goods.buyPrice}}</view>
								<view class="flex f-j-e margin-t6 t-color-9 f11-size">x{{goods.buyNum}}</view>
							</view>
						</view>
						<view class="flex f-j-e f12-size f-w-500 margin-t6">
							<text>{{i18n['实付款']}}：</text>
							<text class="text-price">{{child.order.totalPrice}}</text>
						</view>
						<view class="flex f-j-e f-w">
							<view @click="changeAddress(index)" class="flex f-a-c f-j-c f-s-0 w-80 h-30 margin-t12 margin-l12 b-radius-30 f11-size b-color-3 ">{{i18n['修改地址']}}</view>
							<view class="flex f-a-c f-j-c f-s-0 w-80 h-30 margin-t12 margin-l12 b-radius-30 f11-size b-color-3 ">{{i18n['取消订单']}}</view>
							<view class="flex f-a-c f-j-c f-s-0 w-80 h-30 margin-t12 margin-l12 b-radius-30 f11-size bg-color-linear-y t-color-w">{{i18n['立即支付']}}</view>
						</view>
					</view>
						
				</scroll-view>	
			</swiper-item>
		</swiper>		
	</view>
</template>
<style scoped>
@import url('../../static/css/order/order.css');
</style>
<script>
	const API = require('../../utils/api/order.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				active: 0,
				navs: [],
				pageSize: 20,
			};
		},
		onLoad: function(options) {
			self = this;
			this.active = options.type ? options.type : 0;
			this.init();
			$.setTitle(self.i18n['我的订单']);
		},
		methods: {
			changeAddress(index) {
				let info = self.navs[self.active]['list'][index];
				self.go('/pages/user/address?id='+info.order.id+'&type=change');
			},
			getList() {
				let info = self.navs[self.active];
				$.ajax({
					url: API.getOrderListApi,
					data: {
						page: self.navs[self.active]['page'],
						pageSize: self.pageSize
					},
					method: 'GET',
					success(res) {
						let list = res.data.list ? res.data.list : [];
						if (list.length > 0) {
							info.list = info.list.concat(list);
						} 
						info.totalPage = res.data.totalPage;
						self.$set(self.navs,self.active,info);
					}
				})
			},
			initNavs() {
				self.navs = [
					{name: self.i18n['全部'],page:1,list:[],totalPage: 1},
					{name: self.i18n['待支付'],page:1,list:[],totalPage: 1},
					{name: self.i18n['待发货'],page:1,list:[],totalPage: 1},
					{name: self.i18n['待收货'],page:1,list:[],totalPage: 1},
					{name: self.i18n['待评论'],page:1,list:[],totalPage: 1},
					];
				self.getList();
			},
			changeSwiper(e) {
				self.active = e.detail.current;
			},
			init() {
				this.initNavs();
			},
			loadList() {
				if(self.navs[self.active]['page'] < self.navs[self.active]['totalPage']) {
					self.navs[self.active]['page'] += 1;
					self.getList();
				}
			},
		},
		created() {
		},
		computed: {
			i18n() {
				return this.$t('orderlist')
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
