<template>
	<view class="contain">
		<view class="flex f-a-c padding-12 bg-color-w">
			<view class="flex f-s-0 w-50 h-50 b-radius margin-r12 bg-img" :style="shop.logo | bgimg(300)+''"></view>
			<view class="flex flex-1 f-c f-j-c margin-r10">
				<view class="flex f-a-c">
					<text v-if="shop.selfStatus == 1" class="f10-size bg-color-r t-color-w b-radius-2 h-16 padding-lr5 margin-r6">{{i18n['自营']}}</text>
					<text class="f-w-b">{{shop.name}}</text>
				</view>
				<view class="margin-t4 t-color-6 f11-size flex f-a-c">
					<text class="margin-r6">{{i18n['店铺粉丝']}}</text>
					<text>{{shop.likeNum}}</text>
				</view>
				<view class="margin-t4 f10-size t-color-9">{{shop.province}}{{shop.city}}{{shop.area}}</view>
			</view>
			<view class="flex f-a-c f-j-c f-s-0">
				<view @click="like" :class="isLike ? 't-color-y b-color-y' : 'b-color-e'" class="flex f-a-c f-j-c b-radius-5  padding-lr10 h-30">
					<text :class="isLike ? 'van-icon-success':'van-icon-cross'" class="flex f-a-c f-j-c van-icon  margin-r4 f13-size"></text>
					<text class="f12-size">{{!isLike ? i18n['关注'] : i18n['已关注']}}</text>
				</view>
			</view>
		</view>
		<view class="padding-lr12 bg-color-w margin-t12">
			<view class="flex f-a-c padding-tb10">
				<text class="margin-r12 f12-size">{{i18n['描述相符']}}</text>
				<view class="flex w-100 b-radius-30 bg-color-f7 h-10 margin-r12">
					<view :style="{'width': shop.goodsStar*100/5+'px'}" class="b-radius-30  bg-color-linear-r h100"></view>
				</view>
				<text class="flex f-s-0 f-w-b t-color-r ">{{shop.goodsStar}}</text>
			</view>
			<view class="flex f-a-c padding-tb10">
				<text class="margin-r12 f12-size">{{i18n['服务态度']}}</text>
				<view class="flex w-100 b-radius-30 bg-color-f7 h-10 margin-r12">
					<view :style="{'width': shop.sellerStar*100/5+'px'}" class="b-radius-30  bg-color-linear-r h100"></view>
				</view>
				<text class="flex f-s-0 f-w-b t-color-r ">{{shop.sellerStar}}</text>
			</view>
			<view class="flex f-a-c padding-tb10">
				<text class="margin-r12 f12-size">{{i18n['物流服务']}}</text>
				<view class="flex w-100 b-radius-30 bg-color-f7 h-10 margin-r12">
					<view :style="{'width': shop.logisticStar*100/5+'px'}" class="b-radius-30  bg-color-linear-r h100"></view>
				</view>
				<text class="flex f-s-0 f-w-b t-color-r ">{{shop.logisticStar}}</text>
			</view>
		</view>
		<view class="padding-lr12 bg-color-w margin-t12">
			<view class="padding-tb10 b-bottom">{{i18n['店铺介绍']}}</view>
			<view class="padding-tb10">{{shop.produce}}</view>
		</view>
		<view v-if="shop.remark && shop.remark != ''" class="padding-lr12 bg-color-w margin-t12">
			<view class="padding-tb10 b-bottom">{{i18n['店铺描述']}}</view>
			<view class="padding-tb10">{{shop.remark}}</view>
		</view>	
	</view>
</template>
<style scoped>
@import url('../../static/css/shops/shops.css');
</style>
<script>
	const API = require('../../utils/api/shops.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				shop: '',
				id: '',
				isLike: false,
			};
		},
		onLoad: function(options) {
			self = this;
			this.id = options.id ? options.id : '';
			this.init();
		},
		methods: {
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
			getDetail() {
				$.ajax({
					url: API.shopDetailApi,
					data: {shopId:self.id},
					method: 'GET',
					success(res) {
						self.shop = res.data ? res.data : '';
						self.isLike = self.shop != '' ? self.shop.isCollectShop : false;
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
				return this.$t('shop')
			}
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
